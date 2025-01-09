/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "920px",
        md: "1210px",
        lg: "1410px",
        xl: "1610px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(126, 1, 255)",
          light: "",
        },
        secondary: {
          DEFAULT: "rgb(254, 239, 73)",
        },
        background: {
          DEFAULT: "rgb(224, 224, 225)",
        },
        black: {
          DEFAULT: "rgb(21, 21, 20)",
          500: "#262626",
        },
        white: {
          DEFAULT: "rgb(249, 249, 248)",
        },
      },
    },
  },
  plugins: [],
};
