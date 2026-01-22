const Tesseract = require("tesseract.js");

exports.extractTextFromImage = async (imagePath) => {
  const result = await Tesseract.recognize(
    imagePath,
    "eng",
    { logger: () => {} }
  );

  return result.data.text;
};
