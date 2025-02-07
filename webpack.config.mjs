import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { cpus } from 'os';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      index: path.resolve(__dirname, 'src/index.tsx'),
    },
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: !isProduction,
                modules: {
                  auto: true,
                  localIdentName: isProduction ? '[hash:base64]' : '[path][name]__[local]',
                },
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'icons/[hash][ext][query]',
          },
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: Math.max(cpus().length - 1, 1),
              },
            },
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
        chunkFilename: isProduction ? 'css/[id].[contenthash].css' : 'css/[id].css',
        ignoreOrder: false,
        experimentalUseImportModule: true,
      }),
      new webpack.ProgressPlugin(),
    ].filter(Boolean),
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packagePath = module.context;
              if (!packagePath) return 'vendor';

              const match = packagePath.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (!match) return 'vendor';

              const packageName = match[1];
              return `vendor.${packageName.replace('@', '')}`;
            },
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                normalizeWhitespace: false,
              },
            ],
          },
        }),
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
            },
          },
        }),
      ],
      concatenateModules: true,
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 512000,
      maxEntrypointSize: 512000,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
  };
};
