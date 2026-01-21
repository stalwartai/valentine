/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF4294",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFB3BA",
          foreground: "#4A4244",
        },
        accent: {
          DEFAULT: "#FF6F61",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F2EFEA",
          foreground: "#8C8486",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#4A4244",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(255, 66, 148, 0.1)',
        'card': '0 10px 40px -10px rgba(74, 66, 68, 0.05)',
        'glow': '0 0 20px rgba(255, 66, 148, 0.3)',
      },
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      keyframes: {
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
