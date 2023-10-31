/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  daisyui: {
    themes: [
      {
        halloween: {
          ...require("daisyui/src/theming/themes")["[data-theme=halloween]"],
          primary: "#12D10E",
          secondary: "#06AFC6",
          "base-content": "#ffffff",
        },
      },
    ],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
