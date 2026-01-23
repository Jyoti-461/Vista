const Tesseract = require("tesseract.js");

exports.extractTextFromImage = async (imagePath) => {
  try {
    // Windows-safe path
    const safePath = imagePath.replace(/\\/g, "/");

    const result = await Tesseract.recognize(
      safePath,
      "eng",
      { logger: () => {} }
    );

    return result?.data?.text || "";
  } catch (error) {
    console.error("OCR failed:", error.message);
    return ""; // ❗ NEVER throw
  }
};
