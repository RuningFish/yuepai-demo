// 导入网络请求包
import { $http } from '@escook/request-miniprogram'


//将http挂载到uni下 方便全局调用
uni.$http = $http

//请求的baseUrl
$http.baseUrl = 'https://api.mdyuepai.com'

$http.beforeRequest = function(options){
	uni.showLoading({
		title:'加载中...'
	})
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

// #ifndef VUE3
console.log('不是VUE3执行代码块---');
import Vue from 'vue'
import App from './App'
import store from './store/store'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = 'store'
// app.use(store);
// app.config.globalProperties.$store = store;
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
import store from './store/store'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store);
  app.config.globalProperties.$store = store;
  return {
    app,
	store
  }
}
// #endif