/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/next.js",
  ],
  rules: {
    // no undef
    "no-undef": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
