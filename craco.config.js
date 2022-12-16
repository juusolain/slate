module.exports = {
  style: {
    postcss: {
      plugins: [
        require("@tailwindcss/postcss7-compat"),
        require("autoprefixer"),
      ],
    },
  },
  eslint: {
    enable: false,
    mode: "extends",
    configure: {
      parserOptions: {
        parser: "@babel/eslint-parser",
      },
    },
  },
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: true,
          regenerator: true,
        },
      ],
    ],
  },
};
