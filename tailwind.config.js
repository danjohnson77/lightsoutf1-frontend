const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    rotate: {
      "-180": "-180deg",
      "-90": "-90deg",
      "-45": "-45deg",
      0: "0",
      45: "45deg",
      90: "90deg",
      135: "135deg",
      180: "180deg",
      225: "225deg",
      270: "270deg",
    },
    extend: {
      fontFamily: {
        heading: ["Orbitron", ...defaultTheme.fontFamily.sans],
        secondary: ["Montserrat", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        offBlack: {
          DEFAULT: "#151515",
        },
        racingGreen: {
          DEFAULT: "#004225",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(#004225, #000000)",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRow: {
        "span-12": "span 12 / span 12",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
