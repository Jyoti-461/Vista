exports.parsePaymentData = (text) => {
  if (!text) {
    return {
      extractedTxnIds: [],
      extractedAmount: null,
      successTextFound: false,
    };
  }

  const clean = text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  /* ---------------- TRANSACTION IDS ---------------- */

  // Labeled IDs (UTR, Transaction ID, Ref, etc.)
  const labeledRegex =
    /(utr|transaction id|txn id|upi ref|reference no|ref no)[\s:.-]*([a-z0-9]{8,30})/gi;

  const extractedTxnIds = [];
  let match;

  while ((match = labeledRegex.exec(clean)) !== null) {
    extractedTxnIds.push(match[2]);
  }

  // Fallback: long alphanumeric sequences
  const genericMatches = clean.match(/\b[a-z0-9]{10,30}\b/g);
  if (genericMatches) {
    extractedTxnIds.push(...genericMatches);
  }

  /* ---------------- AMOUNT ---------------- */

  const amountRegex =
    /(₹|rs\.?|inr)\s?(\d{1,6}(\.\d{1,2})?)/i;

  const amountMatch = clean.match(amountRegex);

  /* ---------------- SUCCESS TEXT ---------------- */

  const successKeywords = [
    "successful",
    "success",
    "completed",
    "payment done",
    "paid",
    "paid successfully",
    "transaction successful",
    "transaction completed",
    "payment complete",
    "debited",
  ];

  const successTextFound = successKeywords.some((k) =>
    clean.includes(k)
  );

  return {
    extractedTxnIds: [...new Set(extractedTxnIds)], // remove duplicates
    extractedAmount: amountMatch ? amountMatch[2] : null,
    successTextFound,
  };
};
