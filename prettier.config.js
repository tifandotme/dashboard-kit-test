/** @type {import("prettier-plugin-tailwindcss").PluginOptions} */
const tailwindConfig = {
  tailwindFunctions: ["cn", "cva"],
  tailwindAttributes: ["className", "class"],
}

/** @type {import("prettier").Options} */
export default {
  semi: false,
  experimentalTernaries: true,

  ...tailwindConfig,

  plugins: ["prettier-plugin-tailwindcss"],
}
