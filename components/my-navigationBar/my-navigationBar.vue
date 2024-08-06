<template>
	<view class="nav-container">
		<view class="nav-content">
			<view class="status-bar" :style="{height: statusBarHeight + 'px'}"></view>
			<view class="nav-bar" :style="{height: navbarHeight + 'px'}">
				<slot name="left">
					<view class="nav-left">
						<image class="nav-left-icon" :src="leftIcon" @click="leftIconClick"></image>
					</view>
				</slot>
				<slot name="title">
					<view class="nav-title" :style="{color: titleColor}">{{title}}</view>
				</slot>
				<slot name="right">
					<view class="nav-right">
						<image class="nav-right-icon" :src="rightIcon" @click="rightIconClick"></image>
					</view>
				</slot>
			</view>
		</view>
		<view :style="{height: statusBarHeight + navbarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: 'my-navigationBar',
		data() {
			return {
				statusBarHeight: 0,
				navbarHeight:0
			};
		},

		created() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏高度 = 胶囊高度 + 上间距 + 下间距 + 微调	（menuButtonInfo.top - uni.getSystemInfoSync()['statusBarHeight'] = 上间距）	        
			let navbarHeight = menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2 + 2
			// #endif
			// #ifdef APP-PLUS || H5
			let navbarHeight = 44
			// #endif
			this.navbarHeight = navbarHeight
		},

		computed: {
			
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			leftIcon:{
				type: String,
				default: ''
			},
			rightIcon:{
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			titleColor: {
				type: String,
				default: '#333333'
			}
		},
		methods: {
			// back() {
			// 	uni.navigateBack({
			// 		delta: 1
			// 	});
			// }
			
			leftIconClick(){
				this.$emit('navLeftIconClick')
			},
			
			rightIconClick(){
				this.$emit('navRightIconClick')
			}
		},

		onLoad() {

		}
	}
</script>

<style lang="scss">
	.nav-container {
		// background-color: yellow;
	}

	.nav-content {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		// background-color: rebeccapurple;
	}
	
	.nav-left{
		// background-color: aqua;
		width: 60px;
		height: 30px;
		margin-top:5px;
		line-height: 30px;
		margin-left: 10px;
		position: absolute;
		z-index: 2;
		.nav-left-icon{
			width: 20px;
			height: 20px;
			margin-top:5px;
			// background-color: yellow;
		}
	}
	
	.nav-title {
		height: 30px;
		line-height: 30px;
		width: 50%;
		position: absolute;
		font-weight: 400;
		font-size: 32rpx;
		margin-top:5px;
		transform: translateX(50%);
		// background-color: red;
		text-align: center;
	}
	
	.nav-right{
		// background-color: blue;		
		width: 60px;
		height: 30px;
		margin-top:5px;
		line-height: 35px;
		right: 10px;
		position: absolute;
		z-index: 2;
		display: flex;
		justify-content: end;
		.nav-right-icon{
			width: 20px;
			height: 20px;
			margin-top:5px;
			right: 8px;
			// background-color: yellow;
		}
	}
</style>