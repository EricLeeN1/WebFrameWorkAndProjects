<div class="xy-dialog__wrapper">
    <div class="xy-dialog__head">
        <button class="xy-button xy-dialog__close">&times;</button>
        <slot name="title"></slot>
    </div>
    <div class="xy-dialog__body">
        <div class="xy-dialog__content">
            <slot name="content"></slot>
        </div>
    </div>
    <div class="xy-dialog__footer">
        <button class="xy-button xy-button-infos">取消</button>
        <button class="xy-button xy-button-success">确定</button>
    </div>
</div>