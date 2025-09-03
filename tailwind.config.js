/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222.2, 47.4%, 11.2%)',

        border: 'hsl(214, 32%, 91%)',
        input: 'hsl(214, 32%, 91%)',

        primary: 'hsl(222.2, 47.4%, 11.2%)',
        'primary-foreground': 'hsl(210, 40%, 98%)',

        secondary: 'hsl(210, 40%, 96.1%)',
        'secondary-foreground': 'hsl(222.2, 47.4%, 11.2%)',

        muted: 'hsl(210, 40%, 96.1%)',
        'muted-foreground': 'hsl(215.4, 16.3%, 46.9%)',

        accent: 'hsl(210, 40%, 96.1%)',
        'accent-foreground': 'hsl(222.2, 47.4%, 11.2%)',

        destructive: 'hsl(0, 84.2%, 60.2%)',
        'destructive-foreground': 'hsl(210, 40%, 98%)',

        card: 'hsl(0, 0%, 100%)',
        'card-foreground': 'hsl(222.2, 47.4%, 11.2%)',
      },
    },
  },
  plugins: [],
}
