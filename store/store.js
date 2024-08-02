//1.引入vue
// import Vue from 'vue' vue3API改变 不需要引入
import Vuex from 'vuex'
//2.创建vue
// Vue.use(Vuex)        ---不要了

//3.
const store = new Vuex.Store({ //Store一定要是大写 否则会报错 common_vendor.index.store is not a constructor
	state:{
		tabbar_height:50,
		//当前定位城市
		current_city_name:uni.getStorageSync('current_city_name') || '阳泉',
		//当前城市code
		current_city_code:uni.getStorageSync('current_city_code') || '140300',
		
		s_id:uni.getStorageSync('s_id') || '',
		user_id:uni.getStorageSync('user_id') || '',
		user_info:JSON.parse(uni.getStorageSync('user_info') || '{}')
	},

	mutations:{ 
		updateCurrentCityInfo(state,info){
			state.current_city_name = info.name
			state.current_city_code = info.code

			uni.setStorageSync('current_city_name',state.current_city_name)
			uni.setStorageSync('current_city_code',state.current_city_code)
			console.log('updateCurrentCityInfo---','save-success');
		},
		
		//保存手机登录后的id
		saveLoginId(state,data){
			state.s_id = data.s_id
			state.user_id = data.user_id
			uni.setStorageSync('s_id',state.s_id)
			uni.setStorageSync('user_id',state.user_id)
			console.log('saveLoginId---','save-success');
		},
		
		//保存手机登录后的id
		saveUserInfo(state,data){
			state.user_info = data
			uni.setStorageSync('user_info',JSON.stringify(state.user_info))
			console.log('saveUserInfo---','save-success');
		},
	}
})

export default store
// export const $s

