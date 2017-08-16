var config = {
    entry: './src/main.js',

    output: {
        path: __dirname + '/',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'] }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader'
            },
        ]
    }
}

module.exports = config;