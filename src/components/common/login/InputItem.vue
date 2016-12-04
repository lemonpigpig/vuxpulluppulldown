<template>
    <div class="input_item">
        <div class="item-info" data-attr="{{itemInfo.name}}">
            <input class="item-input" :class="itemInfo.value ? 'active' : ''" :maxlength="itemInfo.max_len" :type="itemInfo.type" :placeholder="itemInfo.default_name" :value="itemInfo.value" v-model="itemInfo.value">
            <span class="text_del"><i></i></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        itemInfo: ''
    },
    ready: function() {
        var self = this;
        $('.input_item').each(function(i){
            $(this).find('input').keyup(function() {
                if($(this).val()) {
                    $(this).addClass('active');
                    $(this).next().show();
                    //self.$parent.inputInfo.codeInfo.cls_name = 'code-able';
                }else{
                    $(this).removeClass('active');
                    $(this).next().hide();
                    //self.$parent.$data.inputInfo.codeInfo.cls_name = 'code-disabled';
                }
            });
            //删除输入
            $(this).find('.text_del').click(function() {
                $(this).hide();
                $(this).prev().removeClass('active');
                self.itemInfo.value = '';
                if(i === 0) {
                    self.$parent.inputInfo.codeInfo.cls_name = 'code-disabled';
                }
            })
        });
    }
}
</script>

<style scoped lang="less">
.input_item {
    width: 100%;
    margin-bottom: 15px;
    line-height: 42px;
    .item-info {
        position: relative;
        width: 270px;
        height: 42px;
        margin: auto;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: white;
        input {
            padding-left: 64px;
            padding-right: 29px;
            outline: 0;
            border: 0;
            background: transparent;
            box-sizing: border-box;
            z-index: 3;
            width: 99%;
            height: 90%;
            position: relative;
            font-size: 13px;
            color: #00f;
            text-shadow: 0 0 0 #C3C3C3;
            -webkit-text-fill-color: transparent;
            -webkit-appearance: none;
            appearance: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        };
        .text_del {
            display: none;
            position: absolute;
            z-index: 4;
            top: 5px;
            right: 2px;
            width: 30px;
            height: 30px;
            line-height: normal;
            i {
                display: inline-block;
                margin-top: 8px;
                width: 14px;
                height: 14px;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAAWNJREFUWAntltsNwjAMRfuYgRH61yVgCbZgGLZgCViCn6rdgBnakguNVEWlcWwLKuF+ACLO8clVSMgyeywBS8ASsAQsAUvAJdB1Xd00zbVt251WIGCBCTaVWVAL+74/u9r9OI4q0pAFC8yJTVIhCxdFcczz/O6a1FJpLwsWmGCTbF1RTi1EXdjINTtUVfX4JiNJWCqtseBkYa60hix6s4RTpbVkRcJUaU1ZsXBMWltWRfiTNL7H8eePLs6JAkb4sPdwCArTxLi2LJhqwoDNpV9wdyloJQseHvJN9y7//atawvN0cd1iaZvdEqEstsEkvL0f3ZKs/3+xNsbdXKItQRGi1KTIs4VTRFJqY/IsYY4AZ86SfLKwpLFkrpdPEtZoKGWQhaWNfEJ4l7DIN90wDBetiwDHHs5qXDBggj1f0NpnsnBZlicHuqGRP2fXwLExLw3mxI5NsXFLwBKwBCwBS+APEngCKpHfinuMYuAAAAAASUVORK5CYII=');
                background-repeat: no-repeat;
                background-size: contain;
            }
        };
        .active {
            text-shadow: 0 0 0 #333333;
        }
    };
    .item-info:before {
        position: absolute;
        z-index: 4;
        top: 0;
        left: 10px;
        content: attr(data-attr);
        color: #666;
        font-size: 13px
    };
    .item-info:after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        border: 1px solid #E5E5E5;
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        transform-origin: 0 0;
        box-sizing: border-box;
        border-radius: 8px;
    }
}
</style>