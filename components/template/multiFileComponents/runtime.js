/**
 * @function initComponent 初始化组件
 * @param {string} name 组件名称
 * @param {object} data 
 * @param {string} data.template 组件模版结构 
 * @param {string} data.style 组件CSS代码
 * @param {string} data.script 组件JavaScript代码
 */

function initComponent(name, data) {
    const { template, style, script } = data;

    // 创建并填充template;
    const $template = document.createElement('template');
    $template.setAttribute('id', `${name}-template`);
    $template.innerHTML = `<style>${style}</style>${template}`;

    // 注入HTML文档
    document.body.appendChild($template);

    // 执行JavaScript逻辑
    eval(script);
}