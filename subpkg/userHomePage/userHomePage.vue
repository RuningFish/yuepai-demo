<template>
	<scroll-view id="100" class="bg-scroll" :scroll-y="bg_scroll_enable" :scroll-top="bg_scroll_top"
		show-scrollbar="false" :style="{height: windowHeight + 'px'}" @scroll="scroll">
		<view class="home-page-container">
			<view class="user-info" v-if="userInfo.nickname">
				<view class="info">
					<view class="info-left">
						<view class="avatar">
							<image :src="userInfo.avatar" mode="widthFix"></image>
						</view>
						<view class="info-content">
							<view class="name-content">
								<view class="nickname">{{userInfo.nickname}}</view>
								<view class="sex">{{userInfo.sex === 2 ? '女':'男'}}</view>
							</view>
							<view>
								<view class="last_active_time">{{userInfo.last_active_time}}</view>
							</view>
							<view class="identity-content">
								<view class="identity">{{userInfo.identity}} | {{userInfo.city_name}}</view>
								<view class="age">{{userInfo.age}}岁</view>
							</view>
						</view>
					</view>
					<view class="info-right" v-if="mine === undefined || mine === false">
						<view class="isfollow">+ 关注</view>
						<view class="tousu">投诉</view>
					</view>
				</view>
				<view class="count-content">
					<view class="yuepai">
						<view class="title">约拍</view>
						<view class="count">{{userInfo.yuepai_count}}</view>
					</view>
					<view class="follow">
						<view class="title">关注</view>
						<view class="count">{{userInfo.follow_count}}</view>
					</view>
					<view class="followed">
						<view class="title">粉丝</view>
						<view class="count">{{userInfo.followed_count}}</view>
					</view>
				</view>
			</view>
			<!-- 约拍动态-作品相册 -->
			<view class="tab" id="yuepaiAndZuopin"
				style="background-color: yellow;position: sticky;top: 0;z-index: 999;">
				<view class="tab-content">
					<view v-for="(item,index) in tabList" :key="index" @click="tabItemClick(index)">
						<view :class="index === selectedIndex? 'active' :''">{{item}}</view>
						<view class="bottom-line" v-if="index === selectedIndex"></view>
					</view>
				</view>
			</view>
			<!-- 列表数据 -->
			<view class="home-page-list">
				<swiper :indicator-dots="false" :autoplay="false" :current="selectedIndex" @change="tabChange"
					:style="{height:windowHeight +'px'}">
					<swiper-item v-for="(item,index) in tabList" :key="index">
						<scroll-view id="200" class="list-scroll" :scroll-y="list_scroll_enable"
							:scroll-top="list_scroll_top" :style="{height:windowHeight-50 +'px'}"
							@scrolltolower="scrolltolower" :lower-threshold="100" :scroll-anchoring="true"
							@scroll="scroll">
							<view v-if="dataList[index] && dataList[index].list">
								<view v-for="(item1,index1) in dataList[index].list" :key="index1">
									<homePageCardItem :item="item1" @itemClick="itemClick(item1)"
										@previewImage="previewImage"></homePageCardItem>
								</view>
								<!-- refresher-enabled="true" :refresher-threshold="100" @refresherrefresh="onRefresh"
							@refresherpulling="onPulling"  -->
							</view>
							<view class="nomore-container" v-if="!dataList[index].hasNomore">
								<view class="content">已全部加载完毕</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</scroll-view>

	<view class="home-page-bottom">
		<view class="">极速联系</view>
		<view class="">约拍{{userInfo.sex === 2 ? '她':'他'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户id
				user_id: '',
				//是否是自己的主页
				mine: false,
				windowHeight: 0,
				//个人信息
				userInfo: {},
				tabList: ['约拍动态', '作品相册'],
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
			console.log('onLoad-----')
			this.user_id = options.user_id
			this.mine = options.mine
			console.log('user_id', this.user_id)

			// const info = uni.getSystemInfoSync()
			// this.scroll_height = info.windowHeight-40
			// console.log('info === ',info)

			this.initData()

			const info = uni.getSystemInfoSync()
			this.windowHeight = info.windowHeight - (this.mine ? 0 : 40)
			console.log('text---', this.windowHeight, info);

			//用户信息
			this.getUserInfo()
			//约拍数据
			this.getUserYuepai()
		},

		methods: {
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
					direction = '向上滚动'//2
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
				if(direction === '向下滚动'){
					if(id === '100'){
						if(scrollTop >= this.offset_top){
							this.bg_scroll_top = this.offset_top
							this.bg_scroll_enable = false
							this.list_scroll_enable = true
							console.log('滚动到位置了==============')
						}
					}
					else{ 
						this.bg_scroll_enable = false
						this.list_scroll_enable = true
					}
				}
				else if(direction === '向上滚动'){
					if(id === '200'){
						if(scrollTop <= 5){
							this.bg_scroll_enable = true
							this.list_scroll_enable = false
						}
						else{
							this.bg_scroll_enable = false
							this.list_scroll_enable = true
						}
					}
					else if(id === '100'){
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
	page {
		background-color: #dc6067;
	}

	.home-page-container {
		height: 100%;
		// padding-bottom: 100px;
	}

	.info {
		padding: 20rpx;
		padding-bottom: 0;
		display: flex;
		justify-content: space-between;
	}

	.info-left {
		display: flex;
		color: #fff;
	}

	.info-right {
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.isfollow {
			font-size: 26rpx;
			border: 0.5px solid #fff;
			height: 36rpx;
			border-radius: 18rpx;
			padding: 5rpx 14rpx;
		}

		.tousu {
			margin-top: 14rpx;
			font-size: 22rpx;
		}
	}

	.info-content {
		margin-left: 10px;
		font-size: 24rpx;

		.name-content {
			display: flex;
		}

		.nickname {
			font-size: 30rpx;
		}

		.sex {
			margin-left: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.last_active_time {
			margin-top: 6rpx;
		}

		.identity-content {
			margin-top: 6rpx;
			display: flex;

			.age {
				margin-left: 10rpx;
			}
		}
	}

	.avatar {
		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
		}
	}

	.count-content {
		padding: 20rpx;
		display: flex;
		justify-content: space-around;

		.yuepai,
		.follow,
		.followed {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 44rpx;

			.title {
				font-size: 24rpx;
			}

			.count {
				margin-left: 10rpx;
			}
		}
	}

	.tab {
		background-color: #dc6067;
	}

	.tab-content {
		background-color: #fff;
		padding: 30rpx 60rpx;
		padding-bottom: 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 28rpx;
		color: rgb(120, 120, 120);
		border-radius: 30px 30px 0 0;

		.active {
			color: #000;
		}

		.bottom-line {
			margin-top: 8px;
			height: 2px;
			width: 44rpx;
			background-color: #dc6067;
			margin-left: 34rpx;
		}
	}

	.nomore-container {
		height: 100px;
		background-color: yellow;

		.content {
			font-size: 26rpx;
			display: flex;
			justify-content: center;
			padding-top: 10px;
			color: lightgray;
		}
	}

	.list-scroll {
		background-color: #efeff4;
		// padding-bottom: 1200px;
	}

	.home-page-bottom {
		position: absolute;
		left: 0;
		width: 100%;
		// right: 0;
		bottom: 0;
		height: 40px;
		z-index: 999;
		display: flex;
		padding: 20px;
		// padding-top: 10px;
		justify-content: space-around;
		background-color: green;
	}

	.ver-scroll {
		// background-color: yellow;
	}
</style>