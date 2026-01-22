exports.parsePaymentData = (text) => {
  const lower = text.toLowerCase();

  const txnMatch =
    text.match(/[A-Z0-9]{10,}/i) || [];

  const amountMatch =
    text.match(/₹\s?\d+(\.\d{1,2})?/);

  const success =
    lower.includes("successful") ||
    lower.includes("completed");

  return {
    transactionId: txnMatch[0] || null,
    amount: amountMatch ? amountMatch[0] : null,
    success,
  };
};
