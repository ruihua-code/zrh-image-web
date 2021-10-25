const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const AntdScssThemePlugin = require('@mlamp/antd-scss-theme-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackBar = require('webpackbar');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const antdTheme = require('./src/css/common/theme/antd');

const version = '1.0.0-' + Date.now()
// const ip = require('ip').address().toString()
const ip = '0.0.0.0';

const port = 4455;
// 是否使用https协议
const https = false;
const ROOT_PATH = path.resolve(__dirname, './');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const projectEnName = 'example';
// 当前产品主题[antd, compact, dark, aliyun]
// 默认主题
const defaultTheme = 'antd';
// 当前运行主题
const curTheme = 'antd';
// 公共路径
const publicPath = '/';

const development = {
	env: { NODE_ENV: JSON.stringify('development') },
	domain: ''
};
const production = {
	env: { NODE_ENV: JSON.stringify('production') },
	domain: ''
};

// 开发环境|生产环境
const isProd = process.env.NODE_ENV === 'production';
process.traceDeprecation = false;

const entry = (function () {
	let main = [`webpack-dev-server/client?http://${ip}:${port}`, 'webpack/hot/only-dev-server', './src/index.ts'];

	if (isProd) {
		main = './src/index.ts';
	}

	return {
		main
	};
})();

const output = (function () {
	let obj = {
		publicPath,
		path: path.join(ROOT_PATH, 'dev'),
		filename: `${curTheme}/scripts/${projectEnName}-[name].js`
		// chunkFilename: `${curTheme}/scripts/[name].js`,
		// sourceMapFilename: '[file].map',
		// hotUpdateChunkFilename: 'hot/hot-update.js',
		// hotUpdateMainFilename: 'hot/hot-update.json'
	};

	if (isProd) {
		// publicPath使用./时，组件中图片路径会有问题
		obj = {
			publicPath,
			path: path.join(ROOT_PATH, 'dist'),
			filename: `${curTheme}/scripts/${projectEnName}-[name]-[contenthash]-${version}}.js`,
			chunkFilename: `${curTheme}/scripts/${projectEnName}-[name]-[contenthash]-${version}}.js`
		};
	}

	return obj;
})();

// thread-loader 小型项目来说打包速度几乎没有影响，甚至可能会增加开销
// 所以可开可关闭，具体看情况，之后可以加入配置项
const jsxLoader = [
	{
		test: /\.(js|mjs|jsx|ts|tsx)$/,
		include: APP_PATH,
		exclude: /node_modules/,
		use: [
			// 'thread-loader',
			{
				loader: 'ts-loader',
				options: {
					// 不做类型检查，只做语言转换 - 使用fork-ts-checker-webpack-plugin一个独立的插件进行类型检查
					transpileOnly: true
				}
			}
		]
	}
];

const cssLoaderUse = function (loaders, useCssModules = false) {
	const defaultOpt = { sourceMap: !isProd };
	return loaders.map(loader => {
		let options = defaultOpt;

		if (loader === 'css-loader') {
			// mini-css-extract-plugin能够处理
			if (useCssModules) {
				options = {
					importLoaders: 1,
					sourceMap: !isProd,
					modules: {
						compileType: 'module',
						mode: 'local',
						localIdentName: '[local]__[path][name]_[hash:base64:5]',
						exportLocalsConvention: 'camelCase'
					}
				};
			} else {
				options = {
					importLoaders: 1,
					sourceMap: !isProd
				};
			}
		}

		if (loader === 'less-loader') {
			options = {
				sourceMap: !isProd,
				lessOptions: {
					javascriptEnabled: true,
					modifyVars: antdTheme
				}
			};

			// return AntdScssThemePlugin.themify('less-loader')
		}

		if (loader === 'postcss-loader') {
			options = {
				...defaultOpt,
				postcssOptions: {
					config: 'postcss.config.js'
				}
			};
		}

		if (loader === 'sass-loader') {
			options = {
				sassOptions: {
					outputStyle: isProd ? 'compressed' : 'expanded'
				}
			};
			// return AntdScssThemePlugin.themify({
			//     loader: 'sass-loader',
			//     options: {
			//         sassOptions: {
			//             outputStyle: isProd ? 'compressed' : 'expanded'
			//         }
			//     },
			// })
		}

		if (loader === 'sass-resources-loader') {
			options = {
				resources: [
					path.join(ROOT_PATH, 'node_modules/bourbon/core/_bourbon.scss'),
					path.join(APP_PATH, `css/common/variables.scss`),
					path.join(APP_PATH, `css/common/theme/${curTheme}/index.scss`),
					path.join(APP_PATH, 'css/common/mixins/mixins.scss')
				]
			};
		}

		if (loader === 'style-resources-loader') {
			options = {
				patterns: [
					// bourbon 一个轻量的sass工具库
					// path.join(ROOT_PATH, 'node_modules/bourbon/core/_bourbon.scss'),
					// src/css/common/plugins/font-awesome.less
					// path.join(APP_PATH, `css/common/variables.less`),
					// path.join(APP_PATH, `css/common/theme/${curTheme}/index.less`),
					// path.join(APP_PATH, 'css/common/mixins/mixins.less')
				],
				injector: 'append'
			};
		}

		if (loader === 'style-loader') {
			options = {
				injectType: 'styleTag'
			};
		}

		if (loader === 'auto-px2rem-loader') {
			options = {
				remUnit: 14
			};
		}

		// MiniCssExtractPlugin.loader
		if (loader.endsWith('loader.js')) {
			return {
				loader,
				options: {
					// 资源路径
					publicPath: '/'
				}
			};
		}

		return {
			loader,
			options
		};
	});
};
const firstloader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';
const cssLoaders = [firstloader, 'css-loader', 'postcss-loader', 'sass-loader', 'sass-resources-loader'];
const styleLoader = [
	{
		test: /\.css$/,
		use: [firstloader, 'css-loader'],
		exclude: /node_modules/
	},
	{
		test: /\.scss$/,
		include: APP_PATH,
		use: cssLoaderUse(cssLoaders, true),
		exclude: /node_modules|src[\\\/]{1}css/
	},
	{
		test: /\.scss$/,
		use: cssLoaderUse(cssLoaders, false),
		include: /node_modules|src[\\\/]{1}css/
	},
	// {
	//     test: /\.(less|css)$/,
	//     include: /node_modules|src[\\\/]{1}css/,
	//     // less 支持css module
	//     use: cssLoaderUse([firstloader, 'css-loader', 'postcss-loader', 'less-loader', 'style-resources-loader'], false)
	// },
	{
		test: /\.(less|css)$/,
		// exclude: /node_modules|src[\\\/]{1}css/,
		// less 支持css module

		oneOf: [
			{
				resourceQuery: /rem/,
				use: cssLoaderUse(
					[
						firstloader,
						'css-loader',
						// 'css-modules-typescript-loader',
						'postcss-loader',
						'auto-px2rem-loader',
						// 'resolve-url-loader',
						'less-loader',
						'style-resources-loader'
					],
					true
				)
			},
			{
				resourceQuery: /modules/,
				use: cssLoaderUse(
					[
						firstloader,
						'css-loader',
						// 'css-modules-typescript-loader',
						'postcss-loader',
						// 'resolve-url-loader',
						'less-loader',
						'style-resources-loader'
					],
					true
				)
			},
			{
				use: cssLoaderUse(
					[
						firstloader,
						'css-loader',
						// 'css-modules-typescript-loader',
						'postcss-loader',
						// 'resolve-url-loader',
						'less-loader',
						'style-resources-loader'
					],
					false
				)
			}
		]
	}
];

const imgLoader = (function () {
	return [
		{ type: 'png', mimetype: 'image/png' },
		{ type: 'jpg', mimetype: 'image/jpg' },
		{ type: 'jpeg', mimetype: 'image/jpeg' },
		{ type: 'gif', mimetype: 'image/gif' },
		{ type: 'svg', mimetype: 'image/svg' }
	].map(item => ({
		test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
		loader: 'url-loader',
		options: {
			publicPath,
			limit: 10000,
			name: `${curTheme}/images/[name]-${isProd ? '[hash]-' + version : '[path]'}.[ext]`,
			mimetype: item.mimetype
		}
	}));
})();

// 字体配置参考：https://github.com/shakacode/bootstrap-sass-loader
const fontLoader = (function () {
	return [
		{ type: 'woff', mimetype: 'application/font-woff' },
		{ type: 'woff2', mimetype: 'application/font-woff2' },
		{ type: 'otf', mimetype: 'font/opentype' },
		{ type: 'ttf', mimetype: 'application/octet-stream' },
		{ type: 'eot', mimetype: 'application/vnd.ms-fontobject' },
		{ type: 'svg', mimetype: 'image/svg+xml' }
	].map(item => ({
		test: new RegExp(`\\.(${item.type})(\\?.*)?$`),
		loader: 'url-loader',
		options: {
			publicPath,
			limit: 10000,
			name: `${curTheme}/fonts/[name]-${version}.[ext]`,
			mimetype: item.mimetype
		}
	}));
})();

const mediaLoader = {
	test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		publicPath,
		limit: 10000,
		name: `${curTheme}/media/[name]-${version}.[ext]`
	}
};

const injectionLoader = [
    {
        test: path.join(APP_PATH, 'framework/project-init.tsx'),
        loader: 'imports-loader',
		options: {
			additionalCode: `window.basename = '${publicPath}'`
		}
    }
]

const optimization = {
	splitChunks: {
		name: false,
		chunks: 'all',
		minSize: 30000,
		minChunks: 1,
		maxInitialRequests: 3,
		maxAsyncRequests: 3,
		automaticNameDelimiter: '-',
		cacheGroups: {
			commons: {
				minChunks: 2,
				priority: 0,
				reuseExistingChunk: true
			},
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				priority: 1,
				enforce: true
			},
			antd: {
				test: /[\/]node_modules[\/]antd|@ant-design[\/]/,
				priority: 2
			},
			dayjs: {
				test: /[\/]node_modules[\/]dayjs[\/]/,
				priority: 2
			},
			echarts: {
				test: /[\/]node_modules[\/]echarts[\/]/,
				priority: 2
			},
			immutable: {
				test: /[\/]node_modules[\/]immutable[\/]/,
				priority: 2
			}
		}
	},
	minimize: isProd,
	minimizer: []
};

const copyArgs = {
	patterns: [
		{
			from: 'src/project-conf.ts',
			to: `${curTheme}/scripts/project-conf.js`
		},
		{
			from: 'src/images',
			to: `${curTheme}/images`
		},
		{
			from: 'src/components/iconfont/iconfont.js',
			to: `${curTheme}/scripts`
		},
		{
			from: 'docs',
			to: 'docs'
		}
	]
};

let plugins = [
	new webpack.DefinePlugin({
		domain: JSON.stringify(''),
		THEME: JSON.stringify(curTheme)
	}),
	new CleanWebpackPlugin({
		cleanOnceBeforeBuildPatterns: [`${curTheme}`, `index-${curTheme}.html`]
	}),
	new CopyWebpackPlugin(
		isProd
			? copyArgs
			: {
				patterns: [
					...copyArgs.patterns,
					{
						from: 'dll/vendor.dll.js',
						to: `${curTheme}/scripts/vendor.dll.js`
					}
				]
			}
	),
	new StyleLintPlugin({
		files: ['src/**/*.scss'],
		failOnError: false,
		emitErrors: true,
		syntax: 'scss',
		fix: true
	}),
	new HtmlWebpackPlugin({
		template: path.join(APP_PATH, 'index.html'),
		title: isProd ? '前端团队初始化工程' : `${projectEnName}-%lastDeployTime%`,
		theme: curTheme,
		dll: isProd ? '' : `<script src="${publicPath}${curTheme}/scripts/vendor.dll.js"></script>`,
		projectConf: `<script src="${publicPath}${curTheme}/scripts/project-conf.js?version=${version}"></script>`,
		description: '前端团队初始化工程',
		filename: `index${curTheme === defaultTheme ? '' : `-${curTheme}`}.html`,
		favicon: 'src/images/favicon.ico',
		inject: true,
		minify: {
			removeComments: true
		},
		cache: false
	}),
	// new AntdScssThemePlugin(path.join(APP_PATH, `css/common/theme/${curTheme}/index.scss`)),
	new AntdDayjsWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: isProd ? `${curTheme}/css/[name]-[contenthash]-${version}}.css` : '/[name].css',
		chunkFilename: isProd ? `${curTheme}/css/[id]-[contenthash]-${version}}.css` : '/[id].css'
	}),
	new WebpackBar(),
	// PWA - 自动生成server-worke/src/css/index.scssr.js
	new WorkboxPlugin.GenerateSW({
		maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
	}),
	new ForkTsCheckerWebpackPlugin({
		eslint: {
			files: './src/**/*.{ts,tsx,js,jsx}'
		}
	}),
	new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
	new ESLintPlugin({
		extensions: ['ts', 'tsx']
	})
];

if (process.env.ANALYZER) {
	plugins.push(
		new BundleAnalyzerPlugin({
			analyzerPort: 13000
		})
	);
}

if (isProd) {
	const pluginsExt = [
		// 传环境变量打开
		new BundleAnalyzerPlugin({
			analyzerPort: 13000
		})
	];

	// 供测试集成测试使用
	// 环境变量配置打开，所以就没有npm_lifecycle_event不启动
	if (process.env.npm_lifecycle_event === 'build') {
		pluginsExt.pop();
	}

	plugins = plugins.concat(pluginsExt);

	optimization.minimizer = optimization.minimizer.concat([
		new OptimizeCSSPlugin({ discardComments: { removeAll: true } }),
		new TerserPlugin({
			parallel: true,
			terserOptions: {
				compress: {
					pure_funcs: ['console.log']
				}
			}
		})
	]);
} else {
	plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()]);
}

const proxies = [
	{
		target: 'http://localhost',
		proxyPort: 3003,
		headers: {},
		paths: ['/api']
	},
	{
		target: 'http://yapi.po.mlamp.cn',
		proxyPort: 80,
		headers: {},
		paths: ['/mock/20']
	}
];

const devServer = {
	contentBase: path.join(ROOT_PATH, 'dev'),
	publicPath,
	historyApiFallback: true,
	// clientLogLevel: 'none',
	host: ip,
	port,
	disableHostCheck: true,
	open: true,
	openPage: https ? `https://localhost:${port}` : `http://localhost:${port}`,
	https,
	hot: true,
	inline: true,
	compress: true,
	stats: {
		colors: true,
		errors: true,
		warnings: true,
		modules: false,
		chunks: false
	},
	proxy: (function () {
		const obj = {};
		proxies.forEach(proxyConf => {
			const { target, proxyPort, headers, paths } = proxyConf;
			const origin = `${target}:${proxyPort}`;
			paths.forEach(apiPath => {
				obj[apiPath] = {
					target: origin,
					changeOrigin: true,
					headers
				};
			});
		});

		return obj;
	})()
};

module.exports = {
	ip,
	port,
	isProd,
	entry,
	output,
	jsxLoader,
	styleLoader,
	imgLoader,
	fontLoader,
	mediaLoader,
	injectionLoader,
	development,
	production,
	optimization,
	plugins,
	defaultPath: {
		ROOT_PATH,
		APP_PATH
	},
	resolve: {
		modules: [APP_PATH, 'node_modules'],
		alias: {
			'@': APP_PATH,
			framework: path.join(APP_PATH, 'framework'),
			// 'react-dom': '@hot-loader/react-dom',
			conf: path.join(APP_PATH, 'conf'),
			dialog: path.join(APP_PATH, 'framework/dialog'),
			loading: path.join(APP_PATH, 'framework/loading'),
			plugins: path.join(APP_PATH, 'plugins'),
			particles: path.join(APP_PATH, 'plugins/particles.js')
		},
		// 移调jsx, 在ts项目中禁止使用jsx
		extensions: ['.ts', '.tsx', '.js']
	},
	devServer,
	proxies
};
