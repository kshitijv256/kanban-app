/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        back: "#1b222c",
        back2: "#2d3748",
        col1: "#ffb300",
        col2: "#3a9efd",
        col3: "#3f4492",
        col4: "#2a2b74",
        col5: "#1a1b4c",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
