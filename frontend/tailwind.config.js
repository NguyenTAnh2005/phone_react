module.exports = {
  safelist: [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "mainCL": "#ff4d00"
      },
      backgroundImage: {
        "saleGradient": "linear-gradient(to right,#ff1b6b,#45caff)",
      }
    },
  },
  plugins: [],
}
// 0d6efd xanh duong 
// ff4d00 cam 