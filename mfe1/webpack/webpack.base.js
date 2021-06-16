const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[contenthash].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ModuleFederationPlugin({
      name: "mfe1",
      remotes: {
        "mfe2": "mfe2@http://localhost:4000/remoteEntry.js"
      }
    })
  ]
};
