module.exports = {
	parser: 'postcss-scss',
    plugins: [
		require('cssnano')({
            preset: 'default',
        }),
		require('autoprefixer'),
		require('postcss-preset-env')
	]
}
