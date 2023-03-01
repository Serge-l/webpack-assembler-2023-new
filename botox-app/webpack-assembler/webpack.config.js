const path = require('path') // встроенный модуль путей
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const isDev = process.env.NODE_ENV === 'development' //в каком режиме сборке находимся?
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        analytics: './src/analytics.js'

    }, //входная точка
    output: { // складываем результат работы webpack'a
        filename: filename('js'),
        path: path.resolve(__dirname,'dist'),
    },
    resolve: {
        extensions: ['.js','.json','.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname,'src')
        }
    },
    optimization : optimization(),
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, 'src/favicon.ico'),
        //         to: path.resolve(__dirname, 'dist')
        //     }
        // ])
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                 {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                    }, 'css-loader']
            },
                        {
                test: /\.less$/,
                use: [
                 {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                    }, 'css-loader','less-loader']
            },
                                    {
                test: /\.s[ac]ss$/,
                use: [
                 {
                    loader: MiniCssExtractPlugin.loader,
                    options: {},
                    }, 'css-loader','sass-loader']
            },
     {
                test: /\.(jpeg|png|jpg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images',
                        publicPath: 'images',
                        emitFile: true,
                        esModule: false
                    }
                }, ]
            }
        ]
    }
}


            // {
            //     test:/\.(png|jpg|svg|gif)$/,
            //     use: ['file-loader']
            // }