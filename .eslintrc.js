// eslint-disable-next-line no-undef
module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  extends: [
    "eslint:recommended", // recommended ESLint rules
    "plugin:@typescript-eslint/recommended", // recommended rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with Prettier.
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display Prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-extra-semi": 0
  }
}
