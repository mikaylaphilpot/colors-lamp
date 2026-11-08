
export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        alert: "readonly",
        prompt: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        XMLHttpRequest: "readonly",
        module: "readonly"
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
