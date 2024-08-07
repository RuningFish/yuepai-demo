// 导入网络请求包
// import { $http } from '@escook/request-miniprogram'
import { $http } from '@/request/http.js'
import { $appConfig } from './config/appConfig'
import { $api } from './request/api' 
import { $router } from './utils/nav-router'
import myLoading  from './components/loading/loading.vue'
import store from './store/store'
import myNavigationBar from './components/my-navigationBar/my-navigationBar.vue'

//挂载到uni下 方便全局调用
uni.$http = $http
uni.$appConfig = $appConfig
uni.$api  = $api
uni.$router = $router

//请求的baseUrl
$http.baseUrl = 'https://api.mdyuepai.com/appapi'

$http.beforeRequest = function(options){
	uni.showLoading({
		title:'加载中...'
	})
}

$http.requestSuccess = function(res){
	if(res.data.result.status !== undefined && res.data.result.status === -999){
		//登录状态已丢失
		uni.setStorageSync('s_id','')
		uni.setStorageSync('user_id','')
		uni.$showMsg(res.data.result.message)
	}
}

$http.afterRequest = function(options){
	uni.hideLoading()
}

//封装弹框方法
uni.$showMsg = function(title = '数据请求失败！',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

uni.$showMyLoading = function(loading){
	uni.$on('showloading',function(loading){
		store.commit('switchLoadingState',loading)
	})
}

// #ifndef VUE3
console.log('不是VUE3执行代码块---');
import Vue from 'vue'
import App from './App'
import store from './store/store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = 'store'
const app = new Vue({
	store,
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
console.log('是VUE3执行代码块---');
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store);
  app.use(myLoading);
  app.component('myLoading',myLoading)
  app.component('my-navigationBar',myNavigationBar)
  app.config.globalProperties.$store = store;
  return {
    app,
	store,
  }
}
// #endif