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
}
