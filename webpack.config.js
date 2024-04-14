const path = require('path')

module.exports = {
    mode:'development',
    entry: './public/dashboard.js',
    output: {
        path: path.resolve(__dirname,'public'),
        filename:'bundle.js'
    },
    watch:true
}
