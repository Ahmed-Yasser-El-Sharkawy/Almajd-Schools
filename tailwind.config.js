/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the Al-Majd logo artwork (Image-2.jpg).
        navy: {
          50: "#F2F5FA",
          100: "#E2E9F4",
          200: "#C4D0E7",
          300: "#93A9CE",
          400: "#5C7AAE",
          500: "#3A5892",
          600: "#2A467C",
          700: "#203F78", // brand navy
          800: "#1A2F58",
          900: "#132140",
          950: "#0C1529",
        },
        gold: {
          50: "#FCF9EC",
          100: "#FCF5C9", // brand cream
          200: "#F5E79A",
          300: "#EBD263",
          400: "#DFBC3C",
          500: "#D7AF2B", // brand gold
          600: "#B58C1F",
          700: "#8F681B",
          800: "#77531D",
          900: "#66461E",
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', "system-ui", "Segoe UI", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(19 33 64 / 0.04), 0 1px 3px 0 rgb(19 33 64 / 0.06)",
        "card-hover": "0 4px 12px -2px rgb(19 33 64 / 0.10), 0 2px 6px -2px rgb(19 33 64 / 0.06)",
        panel: "0 8px 30px -8px rgb(19 33 64 / 0.18)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-in": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .28s ease-out both",
        "sheet-in": "sheet-in .26s cubic-bezier(.32,.72,0,1) both",
      },
    },
  },
  plugins: [],
}
