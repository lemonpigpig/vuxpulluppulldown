<template>
    <div class="profile">
        <template v-for="item in list">
            <template v-if="item.special">
                <div class="select-style info" v-if="isShow">
                    <span class="descp">{{item.title}}</span>
                    <div v-if="item.type=='input'">
                        <input type="text" v-model="item.val" :placeholder="item.placeholder" class="state">
                    </div>
                    <template v-else>
                        <span class="state" v-text="{false:item.showVal,true:item.placeholder}[item.val=='' || item.val==0]" :class="{true:'placeholder-color',false:''}[item.val==0]"></span>
                        <select v-model="item.val" @change="getVal($index)">
                            <option value="0">请选择</option>
                            <option v-for="itemSon in item.data" :value="itemSon.id+','+itemSon.val">{{itemSon.val}}</option>
                        </select>
                    </template>
                </div>
            </template>
            <div class="select-style info" v-else>
                <span class="descp">{{item.title}}</span>
                <div v-if="item.type=='input'">
                    <input :type="{false:'text',true:'number'}[item.isNum==1]" v-model="item.val" :placeholder="item.placeholder" class="state">
                </div>
                <template v-else>
                    <span class="state" v-text="{false:item.showVal,true:item.placeholder}[item.val=='' || item.val==0]" :class="{true:'placeholder-color',false:''}[item.val==0]"></span>
                    <select v-model="item.val" @change="getVal($index)">
                        <option value="0">请选择</option>
                        <option v-for="itemSon in item.data" :value="itemSon.id+','+itemSon.val">{{itemSon.val}}</option>
                    </select>
                </template>
            </div>
        </template>
        <div class="wrap-footer">
            <div class="profile-footer" @click="submit()">提交</div>
        </div>
    </div>
</template>
<script>
var ages = [{
    id: 1,
    val: '20岁以下'
}, {
    id: 2,
    val: '20-25岁'
}, {
    id: 3,
    val: '25岁-30岁'
}, {
    id: 4,
    val: '30岁-35岁'
}, {
    id: 5,
    val: '35岁-40岁'
}, {
    id: 6,
    val: '40岁以上'
}];
var styles = [{
    id: 1,
    val: '甜美'
}, {
    id: 2,
    val: '简约'
}, {
    id: 3,
    val: '文艺'
}, {
    id: 4,
    val: '摇滚'
}, {
    id: 5,
    val: '另类'
}, {
    id: 6,
    val: '运动'
}, {
    id: 7,
    val: '以上皆无'
}];
var sizes = [{
    id: 1,
    val: 'XS'
}, {
    id: 2,
    val: 'S'
}, {
    id: 3,
    val: 'M'
}, {
    id: 4,
    val: 'L'
}, {
    id: 5,
    val: 'XL'
}, {
    id: 6,
    val: 'XXL'
}];
var addresses = [{
    id: 1,
    val: '北京'
}, {
    id: 2,
    val: '天津'
}, {
    id: 3,
    val: '河北'
}, {
    id: 4,
    val: '山西'
}, {
    id: 5,
    val: '内蒙古自治区'
}, {
    id: 6,
    val: '辽宁'
}, {
    id: 7,
    val: '吉林'
}, {
    id: 8,
    val: '黑龙江'
}, {
    id: 9,
    val: '上海'
}, {
    id: 10,
    val: '江苏'
}, {
    id: 11,
    val: '浙江'
}, {
    id: 12,
    val: '安徽'
}, {
    id: 13,
    val: '福建'
}, {
    id: 14,
    val: '江西'
}, {
    id: 15,
    val: '山东'
}, {
    id: 16,
    val: '河南'
}, {
    id: 17,
    val: '湖北省'
}, {
    id: 18,
    val: '湖南'
}, {
    id: 19,
    val: '广东'
}, {
    id: 20,
    val: '广西壮族自治区'
}, {
    id: 21,
    val: '海南'
}, {
    id: 22,
    val: '重庆'
}, {
    id: 23,
    val: '四川'
}, {
    id: 24,
    val: '贵州'
}, {
    id: 25,
    val: '云南'
}, {
    id: 26,
    val: '西藏自治区'
}, {
    id: 27,
    val: '陕西'
}, {
    id: 28,
    val: '甘肃'
}, {
    id: 29,
    val: '青海'
}, {
    id: 30,
    val: '宁夏回族自治区'
}, {
    id: 31,
    val: '新疆维吾尔自治区'
}, {
    id: 32,
    val: '台湾'
}, {
    id: 33,
    val: '香港特别行政区'
}, {
    id: 34,
    val: '澳门特别行政区'
}];
var placeholder = '未填写';
export default {
    components: {

    },
    ready: function() {
        common.setTitle('个人基本信息');
        webAppSdk.controlShare(false);
        webAppSdk.replaceBackFun('');
        WxSdkHelper.shieldWeiXinShare();
    },
    data: function() {
        return {
            isShow: false,
            list: [{
                key: 'age',
                type: 'select',
                title: '年龄',
                data: ages,
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'height',
                type: 'input',
                title: '身高(cm)',
                data: [],
                showVal: '',
                val: '',
                placeholder: placeholder,
                isNum: true
            }, {
                key: 'weight',
                type: 'input',
                title: '体重(kg)',
                data: [],
                showVal: '',
                val: '',
                placeholder: placeholder,
                isNum: true
            }, {
                key: 'job',
                type: 'input',
                title: '职业',
                data: [],
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'style',
                type: 'select',
                title: '日常风格',
                data: styles,
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'myStyle',
                type: 'input',
                title: '',
                data: styles,
                showVal: '',
                val: '',
                placeholder: '注明自己的日常风格',
                isShow: false,
                special: true,
                replaceKey: 'style'
            }, {
                key: 'upsize',
                type: 'select',
                title: '上装尺码',
                data: sizes,
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'size',
                type: 'select',
                title: '下装尺码',
                data: sizes,
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'color',
                type: 'input',
                title: '喜欢颜色',
                data: [],
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'brand',
                type: 'input',
                title: '喜欢品牌',
                data: [],
                showVal: '',
                val: '',
                placeholder: placeholder
            }, {
                key: 'address',
                type: 'select',
                title: '所在地',
                data: addresses,
                showVal: '',
                val: '',
                placeholder: placeholder
            }],
            isShow: false,
            myStyle: ''
        }
    },
    methods: {
        getVal: function(p_index) {
            var list = this.list[p_index];
            if (list.val && list.val != 0) {
                list.showVal = list.val.split(",")[1];
                if (list.key == 'style') {
                    if (list.showVal == '以上皆无') {
                        this.isShow = true;
                    } else {
                        this.isShow = false;
                    }

                }
            }
        },
        submit: function() {
            var infos = {};
            for (var i = 0; i < this.list.length; i++) {
                var key = this.list[i].key;
                if (key) {
                    infos[key] = this.list[i].val;
                }
                if (this.list[i].special) {
                    var val = this.list[i].val;
                    if (this.isShow && val) {
                        var replaceKey = this.list[i].replaceKey;
                        infos[replaceKey] = val;
                        // console.log("replaceKey:", infos[replaceKey]);
                    }
                }
            }
            var infoStr = JSON.stringify(infos);
            // console.log(infoStr);
            localStorage.setItem("BaseInfo", infoStr);
            this.$router.go({
                name: 'question-apply'
            })

        }
    }
}
</script>
<style scoped>
.profile {
    margin-bottom: 90px
}

.placeholder-color {
    color: #BBBBBB;
}

input {
    border: none;
    outline: none
}

.info {
    width: 100%;
    height: 50px;
    background: #fff;
    font-size: 15px;
    color: #333333;
    line-height: 50px;
    position: relative;
    padding-left: 15px;
    box-sizing: border-box;
}

.info select {
    width: 100%;
    height: 50px;
    background-color: #fff;
    opacity: 0;
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
}

.info .state {
    /*color: #BBBBBB;*/
    font-size: 14px;
    position: absolute;
    left: 115px;
}

.info input.state {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: absolute;
    top: 0px;
    left: 0px;
    outline: none;
    border: none;
    padding-left: 115px;
    box-sizing: border-box;
}

.descp {
    position: relative;
    z-index: 998
}

.wrap-footer {
    padding-left: 15px;
    padding-right: 15px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 999;
    margin-top: 40px;
    padding-bottom: 19px;
    box-sizing: border-box;
    background-color: #fff;
}

.profile-footer {
    width: 100%;
    height: 44px;
    background-color: #FFC407;
    text-align: center;
    border-radius: 3px;
    color: #fff;
    font-size: 17px;
    line-height: 44px;
}
</style>
