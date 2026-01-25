const Tesseract = require("tesseract.js");

/**
 * Performs OCR on an image and returns:
 * - raw text
 * - word-level confidence data (used for tamper detection)
 */
exports.extractTextFromImage = async (imagePath) => {
  try {
    const safePath = imagePath.replace(/\\/g, "/");

    const result = await Tesseract.recognize(safePath, "eng", {
      logger: () => {},
    });

    return {
      text: result?.data?.text || "",
      words: result?.data?.words || [], // IMPORTANT for confidence variance
    };
  } catch (error) {
    console.error("OCR failed:", error.message);
    return {
      text: "",
      words: [],
    };
  }
};
