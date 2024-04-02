/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono, Monospace",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
