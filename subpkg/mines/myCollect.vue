<template>
	<view class="page-container">
		<view class="center-tab">
			<view class="center-tab-item" v-for="(item,index) in tabList" :key="index" @click="itemIndexChange(index)">
				<view :class="selectedIndex === index ? 'active' : ''"> {{item}}</view>
			</view>
		</view>
		<!-- 列表数据 -->
		<swiper class="hor-swiper" :current="selectedIndex" :indicator-dots="false" :autoplay="false">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<scroll-view class="list-scroll" scroll-y="true" >
					<view style="height: 60px;" :class="index2 === 100 ? 'last':''" v-for="index2 in 100" :key="index2">{{index2}}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view class="bottom">
			这是底部固定的view
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedIndex:0,
				//用户id
				user_id: '',
				//是否是自己的主页
				mine: false,
				windowHeight: 0,
				//个人信息
				userInfo: {},
				tabList: ['约拍', '作品'],
				//数据列表：约拍-作品
				dataList: [],
				//选中的下标 //默认约拍列表
				selectedIndex: 0,
				//可滚动的区域
				windowHeight: 0,
				isloading: false,
				//加载更多使用，为上一条数据的time
				// lastTime:[],
				// //
				triggered: true,
				pull: false,
				bg_scroll_enable: true,
				bg_scroll_top: 0,
				list_scroll_enable: false,
				list_scroll_top: 0,
				offset_top: 0,
				last_scroll_top: 0

			};
		},

		onReady() {
			console.log('onReady-----')
		},

		onLoad(options) {
			// console.log('onLoad-----')
			// this.user_id = options.user_id
			// this.mine = options.mine
			// console.log('user_id', this.user_id)

			// // const info = uni.getSystemInfoSync()
			// // this.scroll_height = info.windowHeight-40
			// // console.log('info === ',info)

			// this.initData()

			const info = uni.getSystemInfoSync()
			this.windowHeight = info.windowHeight - (this.mine ? 0 : 40)
			console.log('text---', this.windowHeight, info);
		},

		methods: {
			itemIndexChange(index){
				if (this.selectedIndex !== index) {
					this.selectedIndex = index
				}
			},
			
			//初始化数据
			initData() {
				for (let i = 0; i < this.tabList.length; i++) {
					let obj = this.tabItemData()
					this.dataList.push(obj)
				}
			},

			tabItemData() {
				let item = {
					list: [], //列表数据
					time: '', //加载更多使用，为上一条数据的time
					hasNomore: true //是否还有更多数据
				}
				return item
			},

			//获取用户信息
			async getUserInfo() {
				const {
					data: res
				} = await uni.$http.post('/appapi/user/apiUsershow', this.requestParam())
				if (res.code !== '200') return uni.$showMsg()
				this.userInfo = res.result.data
				uni.setNavigationBarTitle({
					title: this.userInfo.nickname
				})
			},
			//约拍数据
			async getUserYuepai() {
				const {
					data: res
				} = await uni.$http.post('/appapi/yuepai/apiUserYuepai', this.requestParam())
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
				// console.log('个人主页约拍数据---', this.dataList[this.selectedIndex])

				let that = this
				let query = uni.createSelectorQuery().in(this);
				query.select('#yuepaiAndZuopin').boundingClientRect(data => {
					that.offset_top = data.top
					console.log('元素距离顶部的距离:' + that.offset_top)
				}).exec();
			},
			//作品数据
			async getUserZuopin() {
				const {
					data: res
				} = await uni.$http.post('/appapi/zuopin/apiUserZuopin', this.requestParam())
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
				// console.log('个人主页作品数据---', this.dataList[this.selectedIndex])
			},

			requestParam() {
				let param = {
					user_id: this.user_id,
					time: this.dataList[this.selectedIndex].time || ''
				}
				return param
			},
			//选项卡点击
			tabItemClick(index) {
				if (index === this.selectedIndex) return
				this.selectedIndex = index
				let dataList = this.dataList[index].list
				if (dataList !== undefined || dataList !== null || dataList.length === 0) {
					//数据为空时请求数据
					this.scrolltolower()
				}
			},

			tabChange(e) {
				let index = e.target.current || e.detail.current
				this.tabItemClick(index)
			},

			onRefresh() {
				this.pull = true
				this.triggered = true
				this.dataList[this.selectedIndex].hasNomore = true
				this.dataList[this.selectedIndex] = this.tabItemData()
				if (this.isloading) return
				console.log('onRefresh 2====', this.dataList)
				this.scrolltolower()
			},

			//上拉加载
			scrolltolower() {
				if (this.isloading || !this.dataList[this.selectedIndex].hasNomore) return
				if (this.selectedIndex === 0) {
					this.getUserYuepai()
				} else {
					this.getUserZuopin()
				}
			},

			scroll(e) {
				let id = e.currentTarget.id
				let scrollTop = e.detail.scrollTop

				let direction = '向下滚动'
				if (this.last_scroll_top > scrollTop) {
					direction = '向上滚动' //2
				} else {
					// console.log('向上滚动')
				}

				// if (direction === 1) {
				// 	if (scrollTop >= this.offset_top) {
				// 		// this.bg_scroll_top = this.offset_top
				// 		// this.list_scroll_top = 0
				// 		this.bg_scroll_enable = false
				// 		this.list_scroll_enable = true
				// 	} 
				// 	else { //if(scrollTop <= 0)
				// 		this.bg_scroll_enable = true
				// 		this.list_scroll_enable = false
				// 	}
				// } else {

				// }

				console.log('scroll 滚动====', id, scrollTop, direction)
				if (direction === '向下滚动') {
					if (id === '100') {
						if (scrollTop >= this.offset_top) {
							this.bg_scroll_top = this.offset_top
							this.bg_scroll_enable = false
							this.list_scroll_enable = true
							console.log('滚动到位置了==============')
						}
					} else {
						this.bg_scroll_enable = false
						this.list_scroll_enable = true
					}
				} else if (direction === '向上滚动') {
					if (id === '200') {
						if (scrollTop <= 5) {
							this.bg_scroll_enable = true
							this.list_scroll_enable = false
						} else {
							this.bg_scroll_enable = false
							this.list_scroll_enable = true
						}
					} else if (id === '100') {
						// if(scrollTop >= this.offset_top){
						// 	this.bg_scroll_enable = true
						// 	this.list_scroll_enable = false
						// 	// console.log('滚动到位置了==============')
						// }
						// else{
						// 	this.bg_scroll_enable = true
						// 	this.list_scroll_enable = false
						// }
						this.bg_scroll_enable = true
						this.list_scroll_enable = false
						this.list_scroll_top = 0
					}
				}

				// if(id == '100'){
				// 	//bg_scroll
				// 	if(scrollTop >= this.offset_top && direction === '向上滚动'){
				// 		this.bg_scroll_top = this.offset_top 
				// 		this.list_scroll_top = 0
				// 		this.bg_scroll_enable = false
				// 		this.list_scroll_enable = true
				// 	}
				// 	else {//if(scrollTop <= 0)
				// 		this.bg_scroll_enable = true
				// 		this.list_scroll_enable = false
				// 	}
				// }
				// else if(id == '200'){
				// 	if(scrollTop <= 0){
				// 		this.list_scroll_top = 0
				// 		this.bg_scroll_enable = true
				// 		this.list_scroll_enable = false
				// 	}
				// 	else {//if(scrollTop >= this.offset_top)
				// 		this.bg_scroll_enable = false
				// 		this.list_scroll_enable = true
				// 	}
				// }
				this.last_scroll_top = scrollTop
			},

			stopLoading(res) {
				if (this.pull) {
					this.dataList[this.selectedIndex] = this.tabItemData()
				}
				this.triggered = false
				this.isloading = false
				this.pull = false
				//将新请求到的数据加到原数据中
				this.dataList[this.selectedIndex].list = [...this.dataList[this.selectedIndex].list, ...res.result.data
					.data
				]
				//判断是否还有更多数据
				let nextTime = res.result.data.nexttime
				let list = this.dataList[this.selectedIndex].list
				let time = list[list.length - 1].updatetime
				if (nextTime === time) {
					this.dataList[this.selectedIndex].hasNomore = false
				}
				this.dataList[this.selectedIndex].time = nextTime
			},

			//跳转到详情页面
			itemClick(item) {
				var url = '/subpkg/detail/detail?item_id=' + item.item_id
				if (this.selectedIndex === 1) {
					url += '&type=production'
				}
				uni.navigateTo({
					url: url
				})
			},
			//查看图片
			previewImage(index, images) {
				uni.previewImage({
					current: index,
					urls: images.map(img => img.bigurl)
				})
			}
		}
	}
</script>

<style lang="scss">
	.page-container{
		// width: 100%;
		// height: 100vh;
		background-color: yellow;
	}
	.center-tab{
		// width: 100%;
		background-color: greenyellow;
	}
	swiper{
		// width: 100%;
		background-color: brown;
		height: calc(100vh - 80rpx - 50px);
	}
	.list-scroll{
		// height: 100%;
		// background-color: rebeccapurple;
	}
	.bottom{
		height: 50px;
		background-color: bisque;
		text-align: center;
		z-index: 99;
		line-height: 50px;
	}
	.last{
		border:1px solid red;
	}

</style>