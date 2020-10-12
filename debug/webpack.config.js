const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const sassRegex = /\.(scss|sass)$/
const port = 8200
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.tsx",
        framework: ["react", "react-dom"],
    },
    output: {
        pathinfo: true, // 生产环境不能开启这个路径定位
        filename: "static/js/bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [
            PnpWebpackPlugin, // 提高requie 性能
        ],
        alias: {
            "@": path.resolve(__dirname, "../src"),
            react: path.resolve(__dirname, "../node_modules/react"),
        },
    },
    resolveLoader: {
        plugins: [
            // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders from the current package
            PnpWebpackPlugin.moduleLoader(module),
        ],
    },
    optimization: {
        splitChunks: {
            // Automatically split vendor and commons
            chunks: "all",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true,
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                },
            },
        },
        runtimeChunk: true, // Keep the runtime chunk seperated to enable long term caching
    },
    module: {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            {
                oneOf: [
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                    {
                        test: /\.tsx?$/,
                        use: "ts-loader",
                        exclude: /node_modules/,
                    },
                    {
                        test: sassRegex,
                        exclude: /node_modules/,
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: { importLoaders: 2 },
                            },
                            require.resolve("sass-loader"),
                        ],
                    },
                    {
                        test: /\.less$/,
                        use: [
                            {
                                loader: "style-loader",
                            },
                            {
                                loader: "css-loader",
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    lessOptions: {
                                        javascriptEnabled: true
                                    },
                                },
                            },
                        ],
                    },
                    {
                        exclude: [
                            /\.(js|mjs|jsx|ts|tsx)$/,
                            /\.html$/,
                            /\.json$/,
                        ],
                        loader: require.resolve("file-loader"),
                        options: {
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        disableHostCheck: true,
        clientLogLevel: "none",
        contentBase: path.resolve(__dirname, "."),
        watchContentBase: true,
        publicPath: "/",
        quiet: true,
        open: true,
        port,
        compress: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 1000, // 1秒内合并更新
            ignored: /node_modules/,
        },
        overlay: false,
        historyApiFallback: {
            disableDotRule: true,
        },
        public: "localhost:" + port,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: "index.html",
            template: "./index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
}
