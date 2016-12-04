import { RouterDefine } from './global-define/RouterDefine'
import HttpReqDefine from './global-define/HttpReqDefine'
import FilterDefine from './global-define/FilterDefine'
//import draploadcss from 'vue-drapload/example/css/css.css'

import Vue from 'vue'
import App from './App'
import Hello from './components/Hello.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import vueDrapload from 'vue-drapload'


//图片懒加载,EmptyYouFan为加载前默认图片，可替换
import EmptyYouFan from './assets/empty_m.jpg'
import  VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    error: EmptyYouFan,
    loading: EmptyYouFan,
    attempt: 1
});


Vue.use(vueDrapload)

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(FilterDefine); //使用全局的数据过滤管道符
Vue.http.interceptors.push(HttpReqDefine);
Vue.http.options.emulateJSON = true;


var router = new VueRouter({ linkActiveClass: 'active', hashbang: false});
RouterDefine(router);

router.start(App, '#app');
