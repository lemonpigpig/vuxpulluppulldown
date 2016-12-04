<template>
    <div>
        <tip-html :tip-html.sync="tipHtml"></tip-html>

        <detail></detail>

        <footer-btn></footer-btn>
    </div>
</template>
<script>
import Detail from './Detail.vue'
import FooterBtn from './FooterBtn.vue'
import TipHtml from '../../components/common/tips/TipHtml.vue'
//import ShareImg from '../../assets/pic_share.png'

window.closeSelf = function() {
    webAppSdk.goBack();
};

export default {
    components: {
        Detail,
        FooterBtn,
        TipHtml
    },
    data: function() {
        return {
            tipHtml: {
                info: '',
                type: '',
                time: 1500
            }
        }
    },
    ready: function() {
        common.setTitle("搭配问答");

        webAppSdk.replaceBackFun('closeSelf()');

        this.getLoginManage();

        WxSdkHelper.openWeiXinShare();
        var img = GlobalModel.CDN_BASE_URL + "pic_share.png";
        var content = {
            title: "有范造型问答平台 - 十项全能的私人造型师",
            imgUrl: img,
            link: GlobalModel.WECHAT_SERVER_URL + '/wap-act/#/page/suit-qa-list',
            desc: '有范造型问答平台 - 分享时尚讯息,解答服饰穿搭、运动健身、美妆护肤的疑问',
            callback: ''
        };
        common.sharePage(content);
    },
    methods: {
        getLoginManage: function() {
            var temp = common.getCookie(GlobalModel.LOGINMANAGE);
            common.delCookie(GlobalModel.LOGINMANAGE);

            if(temp) {
                var loginManage = JSON.parse(temp);
                this.tipHtml.type = 'tip';
                if(loginManage.type == 'login') {
                    this.tipHtml.info = '登录成功';
                } else if(loginManage.type == 'reg') {
                    this.tipHtml.info = '注册成功';
                } else if(loginManage.type == 'find') {
                    this.tipHtml.info = "新密码已经发送至此号码，请登录!";
                }
            }
        }
    }
}
</script>
<style scoped>
</style>
