exports.parsePaymentData = ({ ocrText, ocrWords }) => {
  const flags = [];

  if (!ocrText) {
    return {
      status: "INVALID",
      flags: ["NO_TEXT_DETECTED"],
    };
  }

  const clean = ocrText
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  /* ---------------- TRANSACTION ID ---------------- */

  const txnRegex =
    /(utr|transaction id|txn id|upi ref|reference no|ref no)[\s:.-]*([0-9]{12})/gi;

  const extractedTxnIds = [];
  let match;

  while ((match = txnRegex.exec(clean)) !== null) {
    extractedTxnIds.push(match[2]);
  }

  if (extractedTxnIds.length === 0) {
    flags.push("NO_LABELED_TXN_ID");
  }

  if (extractedTxnIds.length > 1) {
    flags.push("MULTIPLE_TXN_IDS_DETECTED");
  }

  /* ---------------- AMOUNT PRESENCE (SANITY ONLY) ---------------- */

  const currencyRegex = /(₹|rs\.?|inr)/i;
  const amountNumberRegex = /\b\d{2,4}\b/g;

  if (!currencyRegex.test(clean)) {
    flags.push("NO_CURRENCY_SYMBOL");
  }

  if (!(clean.match(amountNumberRegex) || []).length) {
    flags.push("NO_AMOUNT_NUMBER");
  }

  /* ---------------- SUCCESS TEXT ---------------- */

  const successKeywords = [
    "successful",
    "completed",
    "paid",
    "payment done",
    "transaction successful",
    "done",
    "split",
  ];

  if (!successKeywords.some((k) => clean.includes(k))) {
    flags.push("NO_SUCCESS_TEXT");
  }

  /* ---------------- OCR CONFIDENCE ---------------- */

  const txnWords = ocrWords.filter((w) =>
    extractedTxnIds.some((id) => w.text?.includes(id))
  );

  if (txnWords.length > 0) {
    const confidences = txnWords.map((w) => w.confidence || 0);
    if (Math.max(...confidences) - Math.min(...confidences) > 25) {
      flags.push("OCR_CONFIDENCE_VARIANCE");
    }
  }

  /* ---------------- MULTIPLE 12-DIGIT NUMBERS ---------------- */

  if ((clean.match(/\b\d{12}\b/g) || []).length > 1) {
    flags.push("MULTIPLE_12_DIGIT_NUMBERS_DETECTED");
  }

  return {
    status: flags.length === 0 ? "OCR_CLEAN_MATCH" : "PENDING_REVIEW",
    extractedTxnIds: [...new Set(extractedTxnIds)],
    flags,
  };
};
