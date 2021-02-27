var colors = require("tailwindcss/colors");
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./components/**/*.{vue,js}",

      "./layouts/**/*.vue",

      "./pages/**/*.vue",

      "./plugins/**/*.{js}",

      "./nuxt.config.{js}",
    ],
  },
  // darkMode: "class", // or 'media' or 'class'
  theme: {
    darkSelector: ".dark-mode",
    extend: {
      colors: {
        "app-orange": "#F1A638",
        gray: colors.coolGray,
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme("colors.gray.400"),
              '[class~="lead"]': {
                color: theme("colors.gray.300"),
              },
              a: {
                color: theme("colors.white"),
              },
              strong: {
                color: theme("colors.white"),
              },
              "ol > li::before": {
                color: theme("colors.gray.400"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600"),
              },
              hr: {
                borderColor: theme("colors.gray.200"),
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.600"),
              },
              h1: {
                color: theme("colors.white"),
              },
              h2: {
                color: theme("colors.white"),
              },
              h3: {
                color: theme("colors.white"),
              },
              h4: {
                color: theme("colors.white"),
              },
              "figure figcaption": {
                color: theme("colors.gray.400"),
              },
              code: {
                color: theme("colors.white"),
              },
              "a code": {
                color: theme("colors.white"),
              },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.white"),
                borderBottomColor: theme("colors.gray.400"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.600"),
              },
            },
          ],
        },
      }),
    },
  },

  variants: {
    backgroundColor: [
      "dark",
      "dark-hover",
      "dark-group-hover",
      "dark-even",
      "dark-odd",
      "hover",
      "responsive",
    ],
    borderColor: [
      "dark",
      "dark-focus",
      "dark-focus-within",
      "hover",
      "responsive",
      "focus",
    ],
    textColor: [
      "dark",
      "dark-hover",
      "dark-active",
      "hover",
      "responsive",
    ],
    extend: {
      typography: ["dark"],
      opacity: ["disabled"],
      cursor: ["hover", "disabled"],
      backgroundColor: ["active"],
      borderColor: ["focus", "active"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-dark-mode")(),
    require("@tailwindcss/forms"),
  ],
};
