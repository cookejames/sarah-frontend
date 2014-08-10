module.exports = {
    options: {
        compress: true,  //minifying the result
        sourceMap: (global.isDev) ? true : false,
        outputSourceFiles: true
    },
    development: {
        files: {
            "public/css/app.css":"app/app.less"
        }
    }
}