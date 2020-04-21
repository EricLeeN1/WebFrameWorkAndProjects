const fs = require('fs');
const config = require('./config');
const jsdom = require('jsdom');

const sourceFileName = config.source;
const distFileName = config.output.path;
const componentName = config.output.name;

new Promise((resolve,reject)=>{
  fs.readFile(sourceFileName,'utf-8',(err,data)=>{
    if(err){
      reject(err);
    }
    resolve(data);
  });
}).then(data=>{
  const { document } = (new jsdom.JSDOM(data)).window;
  const script = document.querySelector('script');
  const template = document.querySelector('template');
  const style = document.querySelector('style');

  return {
    template: template.innerHTML,
    script: script.innerHTML,
    style: style.innerHTML
  };
}).then(data=>{
  return `initComponent("${componentName}",${JSON.stringify(data)})`;
}).then(content => {
  fs.writeFile(distFileName,content,err=>{
    if(err){
      throw err;
    }
    console.log('编译完成\n');
  });
}).catch(err=>{
  throw err;
});