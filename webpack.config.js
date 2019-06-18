const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                //include: [path.resolve('src')]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "public/js"),
        filename: "bundle.js",
        publicPath: '/public/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};
