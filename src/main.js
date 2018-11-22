import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router'
import webApp from "./webApp.vue";
import { routers } from "./router/index.js";
import store from './vuex/index.js';
import { Field } from 'vant'; import { Button } from 'vant';

Vue.use(Button);
Vue.use(Field);
Vue.use(Vuex);
Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    // debugger
    let isLogin = sessionStorage.getItem("userToken")
    if (isLogin && to.path != '/login-page') {
        next()
    } else if (isLogin && to.path === '/login-page') {
        next(false)
    } else {
        if (to.path === '/login-page') { //这就是跳出循环的关键
            next()
        } else {
            next('/login-page')
        }
    }


})
router.afterEach(route => {

})
new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App)
});
