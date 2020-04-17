let $dialog = null;

const $btn_open = document.querySelector('#btn-open');
const $btn_change_name = document.querySelector('#btn-change-name');
const $btn_remove = document.querySelector('#btn-remove');
const $btn_adopt = document.querySelector('#btn-adopt');
const $ifr = document.querySelector('#ifr');

function createDialog() {
    $dialog = document.createElement('xy-dialog');
    $dialog.setAttribute('title', '崤云弹窗标题');
    $dialog.setAttribute('content', '崤云弹窗内容');
    $dialog.setAttribute('name', Math.random());
    document.body.appendChild($dialog);
}

$btn_open.addEventListener('click', ev => {
    if (!$dialog) {
        createDialog();
    }
    $dialog.open = true;
}, false);

$btn_remove.addEventListener('click', ev => {
    if ($dialog) {
        $dialog.parentNode.removeChild($dialog);
        $dialog = null;
    }
}, false);

$btn_adopt.addEventListener('click', ev => {
    const $el = document.adoptNode($dialog);
    $ifr.contentWindow.document.body.appendChild($el);
}, false);

$btn_change_name.addEventListener('click', ev => {
    if ($dialog) {
        $dialog.setAttribute('name', Math.random());
    }

}, false);