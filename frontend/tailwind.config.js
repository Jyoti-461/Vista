export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  extend: {
    colors: {
      /* Dark mode */
      darkbg: "#020617",
      darkcard: "#0F172A",

      /* Light mode */
      lightbg: "#F8FAFC",      // soft slate
      lightcard: "#FFFFFF",

      /* Neon brand */
      primary: "#6366F1",      // neon indigo
      secondary: "#22D3EE",    // neon cyan
      accent: "#A855F7",       // neon purple
      },
    },
  },
  plugins: [],
};

