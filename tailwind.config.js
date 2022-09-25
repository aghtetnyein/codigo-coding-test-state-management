/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1a202c",
        primary: "#ef7f4d",
        primaryHover: "#E96629",
        blue: "#00b4d8",
        blueHover: "#0398B6",
        red: "#ef476f",
        redHover: "#d73a62",
        yellow: "#ffd166",
        green: "#06d6a0",
      },
    },
  },
  plugins: [],
};
