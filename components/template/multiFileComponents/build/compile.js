const fs = require('fs');
const config = require('./config');
// const jsdom = require('jsdom');
// const path = require('path');

const componentName = config.output.name;
const distFileName = config.output.path;
const sourceJSFileName = `${config.source}.js`;
const sourceCSSFileName = `${config.source}.css`;
const sourceTplFileName = `${config.source}.tpl`;

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

const readFiles = [
    readFile(sourceJSFileName),
    readFile(sourceCSSFileName),
    readFile(sourceTplFileName)
];

Promise.all(readFiles).then((list) => {
    const [script, style, template] = list;
    return { script, style, template };
}).then(data => {
    console.log(componentName);
    return `initComponent("${componentName}",${JSON.stringify(data)})`;
}).then(content => {
    fs.writeFile(distFileName, content, err => {
        if (err) {
            throw err;
        }
        console.log('编译完成\n');
    })
}).catch((err) => {
    throw err;
});
