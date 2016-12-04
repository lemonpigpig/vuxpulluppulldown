//内容类型
var GlobalModel = {};
//h5跳转原生 类型
//单品
GlobalModel.JUMP_TYPE_ITEM = 1;
//搭配
GlobalModel.JUMP_TYPE_COLLOCATION = 2;
//品牌
GlobalModel.JUMP_TYPE_BRAND = 3;
//话题
GlobalModel.JUMP_TYPE_TOPIC = 4;
//设计师
GlobalModel.JUMP_TYPE_DESIGNER = 5;
//资讯
GlobalModel.JUMP_TYPE_SPECIAL = 6;
//活动
GlobalModel.JUMP_TYPE_ACTIVITY = 7;
//品牌列表
GlobalModel.JUMP_TYPE_BRAND_LIST = 8;
//话题列表
GlobalModel.JUMP_TYPE_TOPIC_LIST = 9;
//资讯列表
GlobalModel.JUMP_TYPE_SPECIAL_LIST = 10;
//单品列表
GlobalModel.JUMP_TYPE_ITEM_LIST = 12;
//活动列表
GlobalModel.JUMP_TYPE_ACTIVITY_LIST = 13;
//最佳搭配
GlobalModel.JUMP_TYPE_BEST_COLLOCATION = 14;
//明星店铺
GlobalModel.JUMP_TYPE_STAR_SHOP = 15;
//推荐品牌
GlobalModel.JUMP_TYPE_RECOMMEND_BRAND = 16;
//消息列表
GlobalModel.JUMP_TYPE_MESSAGE_LIST = 17;
//通知列表
GlobalModel.JUMP_TYPE_NOTIFICATION_LIST = 18;
//领取饭票页
GlobalModel.JUMP_TYPE_FANPIAO_GET = 19;
//话题新tab列表
GlobalModel.JUMP_TYPE_TOPIC_TAB_LIST = 20;
//购物袋
GlobalModel.JUMP_TYPE_CART = 21;
//我的钱包
GlobalModel.JUMP_TYPE_MY_WALLET = 22;
//我的饭票
GlobalModel.JUMP_TYPE_MY_FANPIAO = 23;
//我的收藏
GlobalModel.JUMP_TYPE_MY_COLLECTION = 24;
//扫一扫
GlobalModel.JUMP_TYPE_SCAN = 25;
//系统设置
GlobalModel.JUMP_TYPE_SYSTEM_SETTING = 26;
//订单列表
GlobalModel.JUMP_TYPE_ORDER_LIST = 27;
//搜索
GlobalModel.JUMP_TYPE_SEARCH = 28;
//联系我们
GlobalModel.JUMP_TYPE_CONTACT_US = 29;
//发现
GlobalModel.JUMP_TYPE_DISCOVERY = 30;
//我参与的话题
GlobalModel.JUMP_TYPE_JOIN_TOPIC = 31;
//每日新品
GlobalModel.JUMP_TYPE_EVERYDAY_NEW_ITEM = 32;
//单品参数选择
GlobalModel.JUMP_TYPE_SELECT_ITEM = 37;
//登陆界面
GlobalModel.JUMP_TYPE_GO_LOGIN = 39;
//搭配购
GlobalModel.JUMP_TYPE_CO_BUY = 42;
//编辑个人信息
GlobalModel.JUMP_TYPE_EDIT_PERSONAL_INFO = 43;
//搜索单品
GlobalModel.JUMP_TYPE_SEARCH_ITEM = 44;
//咨询中抽奖
GlobalModel.LOTTERY_TYPE_1 = 11;
//咨询中抽奖新
GlobalModel.LOTTERY_TYPE_2 = 12;

//用于领取饭票，投票，抽奖等活动热区
//领取饭票
GlobalModel.JUMP_TYPE_GET_FP = 2000;
//抽奖
GlobalModel.JUMP_TYPE_LOTTERY = 2001;
//单品列表
GlobalModel.JUMP_TYPE_ITEM_LIST_INDEX = 2002;
//导航栏
GlobalModel.JUMP_TYPE_NAVIGATOR = 2003;
//导航栏收缩
GlobalModel.JUMP_TYPE_NAVIGATOR_SHRINK = 2004;
//资讯url
GlobalModel.JUMP_TYPE_SPECIAL_URL = 2005;
//弹出规则说明图片
GlobalModel.JUMP_TYPE_RULE_PIC_URL = 2006;


//资讯列表
GlobalModel.SP_LIST_BASE_URL = 'special-list.html?labelId=';
GlobalModel.SERVER_DOMAIN = '';
GlobalModel.SERVER_PATH = '/mbfun_server_new';
if (process.env.NODE_ENV === 'production') {
    GlobalModel.SERVER_DOMAIN = '//api.funwear.com';
    GlobalModel.SERVER_PATH = '/mbfun_server';
} else if (process.env.NODE_ENV === 'test') {
    GlobalModel.SERVER_DOMAIN = '//stylistpay.51mb.com';
} else {
    GlobalModel.SERVER_DOMAIN = '';
}
GlobalModel.CDN_BASE_URL = 'https://odu358hnp.qnssl.com/';
GlobalModel.SERVER_URL = GlobalModel.SERVER_DOMAIN + GlobalModel.SERVER_PATH + '/index.php?';
//微博等外部分享需要一个完整的url链接
GlobalModel.WECHAT_SERVER_URL = window.location.protocol+GlobalModel.SERVER_DOMAIN;
GlobalModel.WX_JS_SDK_CONFIG = GlobalModel.SERVER_DOMAIN + '/appsdk_wx_js/wx_config.php?callback=?';
//cookie
GlobalModel.Local_User_Info = 'local_user_info';
GlobalModel.LOGINMANAGE = 'login_manage';

GlobalModel.AJAX_STATUS_SUCCESS = 1;
//下拉刷新
GlobalModel.PULL_DOWN = 1;
//上拉加载更多
GlobalModel.PULL_UP = 2;

module.exports = GlobalModel;
