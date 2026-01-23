/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qizil1: "#ef4444",
        qizil2: "#dc2626",
      },
    },
  },
  plugins: [require("daisyui")],
};