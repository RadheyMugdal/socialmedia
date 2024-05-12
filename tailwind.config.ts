
// tailwind.config.js
import {colors, nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {

    extend: {
      colors:{
        darkPrimary: '#17131e',
        darkPrimary2:"#1a1625",
        customprimary: {
          '100': '#20148f',
          '200': '#422d9c',
          '300': '#5d45a9',
          '400': '#765db5',
          '500': '#8d77c2', // Corrected, removed extra #
          '600': '#a491ce'
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}


export default config;
