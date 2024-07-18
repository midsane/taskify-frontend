/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        background2: "var(--color-secondary-background)",
        border: "var(--color-border)",
        dark: {
          primary: "var(--color-dark-primary)",
          secondary: "var(--color-dark-secondary)",
          background: "var(--color-dark-background)",
          text: "var(--color-dark-text)",
          background2: "var(--color-dark-secondary-background)",
          border: "var(--color-dark-border)",
        },
      },
    },
  },
  plugins: [],
};
