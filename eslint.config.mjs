
export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        alert: "readonly",
        prompt: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly"
      }
    },

    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-unreachable": "error",
      "no-constant-condition": "error",
      "eqeqeq": "error"
    }
  }
];
