<template>
	<!-- 选项卡 -->
	<my-tabs ref="myTabs" :currentIndex="selectedIndex" @tabIndexChange="tabIndexChange" :tabList="tabList"></my-tabs>
		<!-- 滚动组件 -->
		<swiper class="hor-swiper" :indicator-dots="false" :autoplay="false" :current="selectedIndex" @change="tabChange" >
			<swiper-item class="home-swiper-item" v-for="(item,index) in tabList" :key="index">
				<scroll-view scroll-y="true" class="list-scroll" :refresher-triggered="triggered" @scrolltolower="scrolltolower" :lower-threshold="100" refresher-enabled="true" :refresher-threshold="100" @refresherrefresh="onRefresh" @refresherpulling="onPulling" >
					<view class="only-home-one" v-if="index === 0">
						<!-- 首页banner -->
						<view class="home-banner">
							<swiper style="height: 100%;" :indicator-dots="banner.length>1" :autoplay="true" :interval="3000" :duration="1000" circular="true">
								<swiper-item  v-for="(item,index) in banner" :key="index">
									<image class="banner-img" :src="item.imgUrl" @click="bannerClick(item.url)"></image>
								</swiper-item>
							</swiper>
						</view>
						<!-- MiniAppSetInfor 小程序 -->
						<view class="miniAppSetInfor" v-if="mini_app_show_visible && mini_app_list.length > 0">
							<view class="mini-app-item" v-for="(item,index) in mini_app_list" :key="index">
								<image :src="item.icon_url"></image>
								<view class="title">{{item.title}}</view>
							</view>
						</view>
					</view>
					<!-- 列表数据 -->
					<!-- 推荐列表 -->
					<view class="home-recommend-list">
						<view class="home-recommend-item" v-for="(item,index) in recommendList[index]" :key="index">
							<listCardItem :item="item" @itemClick="itemClick" @previewImage="previewImage"></listCardItem>
						</view>
						<!-- <view class="" v-for="(item2,index2) in 100" :key="index2" style="height: 60px;line-height: 60px;border: 1px solid forestgreen;" @click="testClick(index2)">
							{{index2}}
						</view> -->
					</view>
				</scroll-view> 
			</swiper-item>
		</swiper>
		<myTabbar currentPath="/pages/home/home"></myTabbar>
</template>

<script>
	// import {mapState,mapMutations} from 'vuex';
	// homepage.vue 页面
	// import store from '@/store/store.js'
	import {mapState,mapMutations} from 'vuex'
	import myTabbar from '@/components/myTabbar/myTabbar';
import { $api } from '../../request/api';
	export default {
		comments:{
			myTabbar
		},
		computed:{
			...mapState(['current_city_name','current_city_code'])
		},
		
		data() {
			return {
				tabList:['推荐约拍','最新约拍','同城约拍'],
				selectedIndex:0,
				//banner列表
				banner:[],
				//小程序列表配置
				miniAppData:{},
				//小程序列表是否显示
				mini_app_show_visible:true,
				//小程序列表
				mini_app_list:[],
				// 存放数据的数组
				recommendList:[[],[],[]],
				isloading:false,
				//加载更多使用，为上一条数据的time
				lastTime:[],
				//
				triggered:true,
				pull:false
			};
		},
		onLoad() {
			//获取banner图
			this.getBanner()
			//
			this.getMiniAppSetInfor()
			//获取推荐列表
			this.getRecommendList(this.selectedIndex)
			
			const info = uni.getSystemInfoSync()
			// this.windowHeight = info.screenHeight-info.statusBarHeight-info.safeAreaInsets.top-40-(info.safeAreaInsets.bottom > 0? 65:50)
			// console.log('--------909090',info.windowHeight)
			// this.windowHeight = info.windowHeight-35
		},
				
		methods:{
			...mapMutations(['updateCurrentCityInfo']),
			
			testClick(index){
				uni.showToast({
					title:String(index)
				})
			},
			
			//获取banner
			async getBanner(){
				let param = {
						appid:uni.$appConfig.appid,
						platform:uni.$appConfig.platform,
						version:uni.$appConfig.version,
						place:'1',
						s_id:''
				}
				const {data:res} = await uni.$http.get(uni.$api.apiGetBannerList,param)
				if (res.code !== '200') return uni.$showMsg()
				this.banner = res.result.data.banner
			},
			//获取小程序
			async getMiniAppSetInfor(){
				this.isloading = true
				const {data:res} = await uni.$http.get(uni.$api.apiGetMiniAppSetInfor)
				if (res.code !== '200') return uni.$showMsg()
				this.miniAppData = res.result.data
				this.mini_app_show_visible = this.miniAppData.app_nav.show_visible
				this.mini_app_list = this.miniAppData.app_nav.list
				this.isloading = false
				//存储当前的城市信息
				this.updateCurrentCityInfo(this.miniAppData.current_city)
			},
			//获取推荐列表
			async getRecommendList(index){
				let param = this.getRequestParam(index)
				this.isloading = true
				const {data:res} = await uni.$http.post(uni.$api.apiGetRecommendList,param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading()
				this.recommendList[index] = [...this.recommendList[index],...res.result.data.data]
				this.lastTime[index] = res.result.data.nexttime
			},
			
			//跳转到详情页面
			itemClick(item){
				uni.$router.gotoDetail(item.item_id)
			},
			//查看图片
			previewImage(index,images){
				uni.previewImage({
					current:index,
					urls:images.map(img => img.bigurl)
				})
			},
			//banner 跳转
			bannerClick(item){
				let url = 'https://m.mdyuepai.com/m/about/zhubozhaomu.html'+'&title='+item.title
				uni.$router.gotoWebView(url)
			},
			
			tabChange(e){
				let index = e.target.current || e.detail.current
				if(this.selectedIndex === index) return
				this.$refs.myTabs.itemIndexChange(index)
			},
			
			//选项卡点击
			tabIndexChange(index){
				console.log('选项卡点击---',index);
				this.selectedIndex = index
				let dataList = this.recommendList[index]
				if(dataList !== undefined && dataList !== null && dataList.length === 0){
					//数据为空时请求数据
					this.apiGetList(index)
				}
			},
			
			async apiGetList(index){
				let param = this.getRequestParam(index)
				this.isloading = true
				const {data:res} = await uni.$http.post(uni.$api.apiGetYuepaiList,param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading()
				this.recommendList[index] = [...this.recommendList[index],...res.result.data.data]
				this.lastTime[index] = res.result.data.nexttime
				console.log(this.tabList[index],"-----",this.recommendList[index]);
			},
			
			getRequestParam(index){
				let title = this.tabList[index]
				let param = {
					has_video:1,
					time:this.lastTime[index] || ''
				}
				if (title === '同城约拍'){
					param = {
						has_video:'1',
						s_city:this.$store.state.current_city_code,
						time:this.lastTime[index] || ''
					}
				}
				return param
			},
						
			onRefresh() {
				this.pull = true
				this.triggered = true
				this.lastTime[this.selectedIndex] = ''
			    if (this.isloading) return
				this.scrolltolower()
			},
			
			onPulling (){
				// console.log('onPulling---','data');
				// this.recommendList[this.selectedIndex] = []
				// this.lastTime[this.selectedIndex] = ''
				// uni.hideLoading()
			 //    if (this.isloading) return
				// this.scrolltolower()
			},
			
			//上拉加载
			 scrolltolower() {
				console.log('loadMore-----','data');
			    if (this.isloading) return
			 	if(this.selectedIndex === 0){
					this.getRecommendList(this.selectedIndex)
				}
				else{
					this.apiGetList(this.selectedIndex)
				}
			 },
			 
			 stopLoading(){
				if (this.pull) {
					this.recommendList[this.selectedIndex] = []
				}
				this.triggered = false
				this.isloading = false 
				this.pull = false
			 }
		},
	}
</script>

<style lang="scss">
.home-banner{
	margin: 10px 10px;
	height: 180rpx;
	.banner-img{
		width: 100%;
		height: 180rpx;
	}
}

.hor-swiper{
	width: 100%;
	height: calc(100vh - 80rpx - 110rpx - constant(safe-area-inset-bottom)*0.4);// 兼容 IOS<11.2
	height: calc(100vh - 80rpx - 110rpx - env(safe-area-inset-bottom)*0.4);// 兼容 IOS>11.2
}

.list-scroll{
	height: 100%;
}

.home-recommend-list{
	padding-bottom: 5px;
}

.home-swiper-item{
	height: 100%;
}

//小程序list
.miniAppSetInfor{
	display: flex;
	margin: 10px 10px;
	justify-content: space-around;
	background-color: white;
	padding: 15px 0px;
	border-radius: 5px;
	.mini-app-item{
		image{
			width: 80rpx;
			height: 80rpx;
		}
		.title{
			margin-top: 5px;
			font-size: 24rpx;
		}
	}
}
</style>