/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        lightBlue: "#D8E2F0",
        veryDarkGray: "#404040",
        mediumGray: "#767676",
        blue: "#039DE8",
        lightGray: "#CCCCCC",
        veryLightGray: "#F1F4F9",
        lighterGray: "#E9E9E9",
        red: "#E32B25",
        blackTransparent: "#0000001A",
        veryLightBlue: "#E6F5FD",
        green: "#008A05",
        spanishGray: "#949494",
        oceanBlue: "#046B9F",
        moderateGreen: "#80C582"
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      boxShadow: {
        custom: "0px 3px 8px 0px #0000001A",
      },
    },
  },
  plugins: [],
};
