/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--neutral-300))",
        input: "rgb(var(--neutral-200))",
        ring: "rgb(var(--primary-500))",
        background: "rgb(var(--neutral-50))",
        foreground: "rgb(var(--neutral-900))",
        
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          DEFAULT: "var(--primary-500)",
          foreground: "#FFFFFF",
        },
        
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          DEFAULT: "var(--secondary-500)",
          foreground: "#FFFFFF",
        },
        
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          DEFAULT: "var(--accent-500)",
          foreground: "#FFFFFF",
        },
        
        neutral: {
          0: "var(--neutral-0)",
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          950: "var(--neutral-950)",
        },
        
        success: {
          50: "var(--success-50)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          DEFAULT: "var(--success-500)",
          foreground: "#FFFFFF",
        },
        
        error: {
          50: "var(--error-50)",
          500: "var(--error-500)",
          600: "var(--error-600)",
          DEFAULT: "var(--error-500)",
          foreground: "#FFFFFF",
        },
        
        muted: {
          DEFAULT: "var(--neutral-200)",
          foreground: "var(--neutral-600)",
        },
        
        card: {
          DEFAULT: "var(--neutral-0)",
          foreground: "var(--neutral-900)",
        },
        
        popover: {
          DEFAULT: "var(--neutral-0)",
          foreground: "var(--neutral-900)",
        },
        
        destructive: {
          DEFAULT: "var(--error-500)",
          foreground: "#FFFFFF",
        },
      },
      
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        '2xl': "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      
      boxShadow: {
        'xs': "var(--shadow-xs)",
        'sm': "var(--shadow-sm)",
        'md': "var(--shadow-md)",
        'lg': "var(--shadow-lg)",
        'xl': "var(--shadow-xl)",
        '2xl': "var(--shadow-2xl)",
        'glow-primary': "var(--glow-primary)",
        'glow-secondary': "var(--glow-secondary)",
        'glow-accent': "var(--glow-accent)",
        'glass': "var(--glass-shadow)",
      },
      
      backgroundImage: {
        'gradient-romance': "var(--gradient-romance)",
        'gradient-sunset': "var(--gradient-sunset)",
        'gradient-dreamy': "var(--gradient-dreamy)",
        'gradient-soft-glow': "var(--gradient-soft-glow)",
        'gradient-warm-overlay': "var(--gradient-warm-overlay)",
        'gradient-glass': "var(--gradient-glass)",
      },
      
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'mesh-shift': 'meshShift 20s ease-in-out infinite',
      },
      
      keyframes: {
        'heartbeat': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: 'var(--glow-primary)' },
          '50%': { boxShadow: '0 0 40px rgba(230, 83, 127, 0.6), 0 0 80px rgba(230, 83, 127, 0.3)' },
        },
        'meshShift': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1) rotate(0deg)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05) rotate(2deg)'
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
