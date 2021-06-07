module.exports = {
    css: {
        extract: false,
    },
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        plugins: [],
    },
}