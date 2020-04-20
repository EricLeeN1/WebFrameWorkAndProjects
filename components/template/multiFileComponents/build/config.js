const path = require('path');

module.exports = {
    source: path.join(__dirname, '../src/xy-dialog'),
    output: {
        path: path.join(__dirname, '../dist/xy-dialog.js'),
        name: 'xy-dialog'
    }
}