/**
 * Parses OCR text and performs fraud-flag heuristics.
 * DOES NOT auto-verify.
 */
exports.parsePaymentData = ({
  ocrText,
  ocrWords,
  expectedAmount, // backend-calculated total
}) => {
  const flags = [];

  if (!ocrText) {
    return {
      status: "INVALID",
      flags: ["NO_TEXT_DETECTED"],
    };
  }

  /* ---------------- NORMALIZATION ---------------- */

  const clean = ocrText
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  /* ---------------- TRANSACTION ID (STRICT) ---------------- */

  /**
   * ONLY labeled UTR / Txn IDs
   * No generic fallback (critical security fix)
   */
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
    flags.push("MULTIPLE_TXN_IDS_DETECTED"); // ← flags your 1234+1235 case
  }

  /* ---------------- AMOUNT EXTRACTION ---------------- */

  const amountRegex = /(₹|rs\.?|inr)\s?(\d{1,6}(\.\d{1,2})?)/gi;
  const amounts = [];

  let amtMatch;
  while ((amtMatch = amountRegex.exec(clean)) !== null) {
    amounts.push(Number(amtMatch[2]));
  }

  if (amounts.length === 0) {
    flags.push("NO_AMOUNT_DETECTED");
  }

  if (amounts.length > 1) {
    flags.push("MULTIPLE_AMOUNTS_DETECTED");
  }

  const ocrAmount = amounts.length === 1 ? amounts[0] : null;

  if (ocrAmount !== null && ocrAmount !== expectedAmount) {
    flags.push("AMOUNT_MISMATCH");
  }

  /* ---------------- SUCCESS TEXT (WEAK SIGNAL) ---------------- */

  const successKeywords = [
    "successful",
    "completed",
    "paid",
    "payment done",
    "transaction successful",
  ];

  const successTextFound = successKeywords.some((k) =>
    clean.includes(k)
  );

  if (!successTextFound) {
    flags.push("NO_SUCCESS_TEXT");
  }

  /* ---------------- OCR CONFIDENCE ANOMALY ---------------- */

  /**
   * Edited overlays often cause:
   * - mixed confidence inside same ID
   */
  const txnWords = ocrWords.filter((w) =>
    extractedTxnIds.some((id) => w.text?.includes(id))
  );

  if (txnWords.length > 0) {
    const confidences = txnWords.map((w) => w.confidence || 0);
    const max = Math.max(...confidences);
    const min = Math.min(...confidences);

    if (max - min > 25) {
      flags.push("OCR_CONFIDENCE_VARIANCE");
    }
  }
  /* ---------------- MULTIPLE 12-DIGIT NUMBER DETECTION ---------------- */

const all12DigitNumbers = clean.match(/\b\d{12}\b/g) || [];

if (all12DigitNumbers.length > 1) {
  flags.push("MULTIPLE_12_DIGIT_NUMBERS_DETECTED");
}

  /* ---------------- FINAL STATUS ---------------- */

  let status = "PENDING_REVIEW";

  if (flags.length === 0) {
    status = "OCR_CLEAN_MATCH"; // still NOT gateway-verified
  }

  return {
    status,
    extractedTxnIds: [...new Set(extractedTxnIds)],
    ocrAmount,
    flags,
  };
};
