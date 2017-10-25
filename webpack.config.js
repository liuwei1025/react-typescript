const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/assets/style/themes.less'), 'utf8'));

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "cheap-moudle-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        port: 8003,
        hot: true,
        // historyApiFallback: true,
        historyApiFallback: {
            index: '/react.min.js'
        },
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by
            // 'awesome-typescript-loader'.
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    }, {
                        loader: 'babel-loader'
                    }, {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by
            // 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            modifyVars: themeVariables
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader', publicPath: '/'})
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[ext]&publicPath='
            }
        ]
    },
    // When importing a module whose path matches one of the following, just assume
    // a corresponding global variable exists and use that instead. This is
    // important because it allows us to avoid bundling all of our dependencies,
    // which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Hello react+ts',
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        new webpack.HotModuleReplacementPlugin()
    ]
};

const os = require('os');
console.log(`############################################################################`);
console.log(`##         os: ${os.type()} ${os.arch()} ${os.release()}`);
console.log(`##        ram: ${ (os.freemem() / 1024 / 1024 / 1024) < 1
    ? (os.freemem() / 1024 / 1024).toFixed(0) + 'MB'
    : (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + 'GB'}`);
console.log(`##       time: ${new Date()}`);
console.log(`############################################################################`);
