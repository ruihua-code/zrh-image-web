const config = require('../project.config')

const {
    isProd, entry, output, resolve, plugins, optimization,
    jsxLoader, imgLoader, fontLoader, styleLoader, mediaLoader,
    defaultPath: { ROOT_PATH },
    devServer,
    injectionLoader
} = config

const baseconfig = {
    mode: isProd ? 'production' : 'development',
    entry,
    output,
    resolve,
    plugins,
    context: ROOT_PATH,
    // watch: !isProd,
    cache: !isProd,
    devtool: !isProd ? 'eval-cheap-module-source-map' : false,
    module: {
        rules: [
            ...jsxLoader,
            ...imgLoader,
            ...fontLoader,
            ...styleLoader,
            ...injectionLoader,
            mediaLoader
        ]
    },
    optimization,
    devServer
}

if (isProd) delete baseconfig.devServer

module.exports = baseconfig
