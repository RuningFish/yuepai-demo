<template>
	<view class="tabbar-container" :style="tabbar_height">
		<view class="tabbar-item" v-for="(item,index) in tabbarList" :key="index" @click="switchTab(item.pagePath)">
			<view class="item">
				<image class="image" :src="item.iconPath" mode=""></image>
				<view class="text" :class="currentPath !== item.pagePath ? '' : 'active-text'">{{item.text}}</view>
			</view>
		</view>
	</view>

	<!-- 	<uni-popup ref="popup" backgroundColor="#fff354" v-if="showPopup">
	 				<uni-popup-share></uni-popup-share>
					<view class="">
						aaaaa
					</view>
	</uni-popup> -->


	<!-- <uni-popup ref="popup" type="bottom" background-color="#fff" :show="true"
		@close="closePopup">
		<view style="height: 100%; border-bottom: 1rpx solid #E5E5E5;padding:24rpx 0 32rpx; text-align: center;">提示</view>
		<view class="flex-colomn">
			<view class="tet">正确答案为：{{answer}}</view>
			<uni-icons class="close-btn" type="closeempty" size="20" @click="closePopup"></uni-icons>
		</view>
	</uni-popup> -->
<!-- </template>
<script>
	export default {
		data() {
			return {
				answer: 'A',

			}
		},
		methods: {
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']

				this.$refs.popup.open('bottom')
			},

			closePopup() {
				this.$refs.popup.close()
			},
		}
	}
</script> -->

</template>

<script>
	export default {
		name: "myTabbar",
		props: {
			currentPath: {
				type: String,
				default: '/pages/home/home'
			}
		},

		computed: {

		},

		created() {
			uni.hideTabBar({
				animation: false
			})
			// let info = uni.getSystemInfoSync()
			// var height = info.safeAreaInsets.bottom > 0 ? 65 : 50;
			// this.tabbar_height += String(height) + 'px'
			// console.log('=====1111rrrr:', this.tabbar_height)
		},

		data() {
			return {
				showPopup: false,
				tabbar_height: '--tabbar_height:',
				tabbarList: [{
						"pagePath": "/pages/home/home",
						"text": "首页",
						"iconPath": "/static/icons/home_main.png",
						// "selectedIconPath": "static/icons/home_main_active.png"
					},
					{
						"pagePath": "/pages/production/production",
						"text": "作品",
						"iconPath": "/static/icons/home_zuopin.png"
						// "selectedIconPath": "static/tabbar-icons/home-active.png"
					},
					{
						"pagePath": "/pages/publish/publish",
						"text": "发布",
						"iconPath": "/static/icons/fabu.png"
						// "selectedIconPath": "static/tabbar-icons/home-active.png"
					},
					{
						"pagePath": "/pages/message/message",
						"text": "消息",
						"iconPath": "/static/icons/home_message.png"
						// "selectedIconPath": "static/tabbar-icons/home-active.png"
					},
					{
						"pagePath": "/pages/mine/mine",
						"text": "我的",
						"iconPath": "/static/icons/home_mine.png"
						// "selectedIconPath": "static/tabbar-icons/home-active.png"
					}
				]
			};
		},

		onLoad() {

		},

		methods: {
			switchTab(url) {
				if (this.currentPath !== url) {
					if (url === this.tabbarList[2].pagePath) {
						if(this.$store.state.s_id === ''){
							uni.$router.gotoWxLogin()
						}
						else{
							uni.switchTab({
								url: url
							})
						}
					} else {
						uni.switchTab({
							url: url
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar-container {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		// height: 60px;//var(--tabbar_height);
		z-index: 10000;
		background-color: #fff;
		display: flex;
		height: calc(110rpx + constant(safe-area-inset-bottom)*0.4); // 兼容 IOS<11.2 
		height: calc(110rpx + env(safe-area-inset-bottom)*0.4); // 兼容 IOS>11.2

		.image {
			width: 44rpx;
			height: 44rpx;
			margin-top: 3px;
		}

		.text {
			font-size: 22rpx;
			text-align: center;
			color: #333;
			margin-top: 5rpx;
		}

		.active-text {
			color: $main-theme-color;
		}

		.tabbar-item {
			height: 100%;
			flex: 1;
		}

		.item {
			height: 100%;
			margin-top: 0rpx;
			display: flex;
			flex-direction: column;
			padding-top: 5px;
			align-items: center;
		}
	}
</style>