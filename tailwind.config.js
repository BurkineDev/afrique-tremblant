/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0B6F68",
          green: "#5D8A1A",
          red: "#D9301C",
          orange: "#F59A00",
          gold: "#D99A21",
          brown: "#3A1F0F",
          cream: "#FFF8ED",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
