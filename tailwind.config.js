/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				'regal-grey': 'background-color: rgb(24, 24, 27, 0.5);'
			}
		},
  },
  plugins: [],
}
