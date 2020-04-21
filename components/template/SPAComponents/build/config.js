const path = require('path');

module.exports = {
    source: path.join(__dirname, '../src/xy-dialog.component'),
    output: {
        path: path.join(__dirname, '../dist/xy-dialog.js'),
        name: 'xy-dialog'
    }
}