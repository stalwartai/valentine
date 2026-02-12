/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--neutral-300)",
        input: "var(--neutral-200)",
        ring: "var(--accent-500)",
        background: "var(--cream)",
        foreground: "var(--warm-gray)",
        
        // Deep Red Valentine's Colors
        blush: "var(--blush-pink)",
        coral: "var(--coral-pink)",
        cream: "var(--cream)",
        love: "var(--love-red)",
        blood: "var(--blood-red)",
        wine: "var(--wine-red)",
        passion: "var(--passion-red)",
        rose: "var(--rose-red)",
        
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
          DEFAULT: "var(--primary-600)",
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
          foreground: "var(--warm-gray)",
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
        heading: ['Poppins', 'DM Sans', 'sans-serif'],
        body: ['Inter', 'DM Sans', 'sans-serif'],
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
        'card': "var(--shadow-card)",
        'card-hover': "var(--shadow-card-hover)",
        'glow-primary': "var(--glow-primary)",
        'glow-cta': "var(--glow-cta)",
        'glow-accent': "var(--glow-accent)",
        'glass': "var(--glass-shadow)",
      },
      
      backgroundImage: {
        'gradient-romance': "var(--gradient-romance)",
        'gradient-sunset': "var(--gradient-sunset)",
        'gradient-hero': "var(--gradient-hero)",
        'gradient-dreamy': "var(--gradient-dreamy)",
        'gradient-cta': "var(--gradient-cta)",
        'gradient-soft-glow': "var(--gradient-soft-glow)",
        'gradient-warm-overlay': "var(--gradient-warm-overlay)",
        'gradient-glass': "var(--gradient-glass)",
      },
      
      animation: {
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'float-heart': 'float-heart 4s ease-in-out infinite',
        'float-heart-delayed': 'float-heart 5s ease-in-out infinite 1s',
        'float-heart-slow': 'float-heart 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
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
        'float-heart': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: '0.6'
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(10deg)',
            opacity: '1'
          },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 111, 97, 0.4)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 111, 97, 0.6), 0 0 60px rgba(255, 111, 97, 0.3)' 
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
