module.exports = {
  plugins: [require("flowbite/plugin")],
  content: [
    "*.vue",
    "./node_modules/flowbite.{js,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
};
