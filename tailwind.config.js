/** @type {import('tailwindcss').Config} */
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
    extend: {},
  },
  plugins: [require("daisyui")],
};
