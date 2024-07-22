//1.引入vue
// import Vue from 'vue' vue3API改变 不需要引入
import Vuex from 'vuex'
//2.创建vue
// Vue.use(Vuex)        ---不要了

//3.
const store = new Vuex.Store({ //Store一定要是大写 否则会报错 common_vendor.index.store is not a constructor
	state:{
		//当前定位城市
		current_city_name:uni.getStorageSync('current_city_name') || '阳泉',
		//当前城市code
		current_city_code:uni.getStorageSync('current_city_code') || '140300'
	},

	mutations:{ 
		updateCurrentCityInfo(state,info){
			state.current_city_name = info.name
			state.current_city_code = info.code

			uni.setStorageSync('current_city_name',state.current_city_name)
			uni.setStorageSync('current_city_code',state.current_city_code)
			console.log('updateCurrentCityInfo---','save-success');
		},
		
		storeLog(){
			console.log('storeLog---','data');
		}
	}
})

export default store

