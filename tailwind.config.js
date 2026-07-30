/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Pulled from the Figma design
        brand: {
          DEFAULT: "#D49A34", // the mustard LOGO / button colour
          dark: "#B8822A", // hover state
        },
        panel: "#D9D9D9", // the grey card background
        ink: "#1F1F1F", // the dark input fields
      },
    },
  },
  plugins: [],
};
