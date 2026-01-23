/**
 * paymentParser.js
 * -----------------
 * Purpose:
 *  - Parse OCR text from payment screenshots
 *  - Detect success indicators
 *  - Extract possible transaction / UTR IDs
 *  - Extract paid amount (if present)
 *
 * SAFE:
 *  - Never throws
 *  - Always returns a predictable object
 */

exports.parsePaymentData = (text) => {
  // DEFAULT SAFE RESPONSE
  const result = {
    successTextFound: false,
    extractedTxnIds: [],
    extractedAmount: null,
  };

  if (!text || typeof text !== "string") {
    return result;
  }

  const normalized = text.toLowerCase();

  /* -----------------------------
     1. SUCCESS KEYWORDS CHECK
  ------------------------------ */
  const successKeywords = [
    "payment successful",
    "paid successfully",
    "transaction successful",
    "success",
    "completed",
    "payment done",
    "debited",
  ];

  result.successTextFound = successKeywords.some((word) =>
    normalized.includes(word)
  );

  /* -----------------------------
     2. TRANSACTION / UTR ID EXTRACTION
     - UTRs are usually 10–22 alphanumeric chars
  ------------------------------ */
  const txnIdRegex = /\b[a-zA-Z0-9]{10,22}\b/g;
  const matches = text.match(txnIdRegex);

  if (matches) {
    // Remove duplicates
    result.extractedTxnIds = [...new Set(matches)];
  }

  /* -----------------------------
     3. AMOUNT EXTRACTION (OPTIONAL)
     - Matches ₹500, Rs. 500, INR 500, 500.00 etc.
  ------------------------------ */
  const amountRegex =
    /(₹|rs\.?|inr)\s?([0-9]+(?:\.[0-9]{1,2})?)/i;

  const amountMatch = text.match(amountRegex);

  if (amountMatch && amountMatch[2]) {
    result.extractedAmount = amountMatch[2];
  }

  return result;
};
