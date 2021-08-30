module.exports = {
  style: {
    postcss: {
      plugins: [
        require("@tailwindcss/postcss7-compat"),
        require("autoprefixer"),
      ],
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
