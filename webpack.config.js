const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ["url-loader?limit=100000"],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: [
      "assets",
      "components",
      "consts",
      "hooks",
      "pages",
      "store",
      "typings",
      "utils",
    ].reduce(
      (acc, item) => ({
        ...acc,
        [item]: path.resolve(__dirname, `src/${item}/`),
      }),
      {},
    ),
  },
};
