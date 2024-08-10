<template>
	<!-- #ifdef APP-PLUS -->
	<my-navigationBar @navRightIconClick="navRightIconClick" titleColor="#00c6ca"
		rightIcon="/static/icons/icon_mine_setting.png">

	</my-navigationBar>
	<!-- #endif -->

	<!-- #ifdef MP-WEIXIN -->
	<my-navigationBar @navLeftIconClick="navLeftIconClick" titleColor="#00c6ca"
		leftIcon="/static/icons/icon_mine_setting.png">

	</my-navigationBar>
	<!-- #endif -->
	<scroll-view class="hide-scrollbar" scroll-y="true" show-scrollbar="false">
		<!-- 未登录 -->
		<view class="not-login-info" v-if="userInfo.nickname === undefined" @click="gotoLogin">
			<image src="/static/icons/icon_avatar.png" mode=""></image>
			<view class="denglu">
				<view class="top">
					<view class="title">立即登录</view>
					<image src="/static/icons/arrow_right_able.png" mode="scaleToFill"></image>
				</view>
				<view class="bottom">点击登录</view>
			</view>
		</view>
		<!-- 已登录 -->
		<view class="login-info" v-else>
			<view class="info">
				<view class="info-left">
					<view class="avatar">
						<image @click="avatarClick" :src="userInfo.avatar" mode="widthFix"></image>
					</view>
					<view class="info-content">
						<view class="name-content">
							<view class="nickname">{{userInfo.nickname}}</view>
							<image class="sex"
								:src="userInfo.sex === 2 ? '/static/icons/sex_girl.png':'/static/icons/sex_boy.png'">
							</image>
						</view>
						<view class="identity-content">
							<view class="identity">{{userInfo.identity}} | {{userInfo.city}} {{userInfo.hidden_phone}}
							</view>
							<view class="age">{{userInfo.age}}</view>
						</view>
						<view class="realname-content">
							<image class="list-shiming"
								:src="userInfo.realname === 0? '/static/icons/mine_shiming_no.png' : '/static/icons/mine_shiming_yes.png'">
							</image>
							<image class="list-danbao"
								:src="userInfo.ispledge === 0? '/static/icons/mine_danbao_no.png' : '/static/icons/mine_danbao_yes.png'">
							</image>
						</view>
					</view>
				</view>
				<view class="info-right">
					<view @click="gotoUserHomePage">个人主页 ></view>
				</view>
			</view>
			<view class="count-content">
				<view class="coin">
					<view class="count">{{userInfo.coin}}</view>
					<view class="title">麻豆</view>
				</view>
				<view class="follow" @click="myFollowUser">
					<view class="count">{{userInfo.follow_count}}</view>
					<view class="title">关注</view>
				</view>
				<view class="followed">
					<view class="count">{{userInfo.followed_count}}</view>
					<view class="title">粉丝</view>
				</view>
			</view>

			<!-- vip -->
			<template v-if="false">
				<view class="vip-container">
					<image class="vip-bg" src="/static/icons/icon_vip_bg.png" mode="widthFix" />
					<image class="vip-no" src="/static/icons/icon_vip_no.png" mode="widthFix" />
					<view class="vip-title">点亮会员标志 享受尊贵特权</view>
				</view>
			</template>
		</view>

		<!-- 我的作品 -->
		<view class="mines-zuopin-container">
			<view class="mines-item" v-for="(item,index) in mines" :key="index" @click="mineItemsClick(item.title)">
				<image :src="item.icon" mode=""></image>
				<view>{{item.title}}</view>
			</view>
		</view>

		<view class="item-list">
			<view class="list-group" v-for="(item,index) in dataList" :key="index">
				<view class="item" v-for="(item2,index2) in item" :key="index2" @click="itemClick(item2.title)">
					<view class="left">
						<image :src="item2.icon" mode=""></image>
						<view class="title">{{item2.title}}</view>
					</view>
					<view class="right">
						<view v-if="item2.title === '邀请好友'" style="color: #dd0700;font-size: 22rpx;">赚麻豆</view>
						<uni-icons type="right" size="18" color="lightgray"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
	<myTabbar class="mine-tabbar" currentPath="/pages/mine/mine"></myTabbar>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import myTabbar from '@/components/myTabbar/myTabbar';
	export default {
		comments: {
			myTabbar
		},
		computed: {

		},

		data() {
			return {
				userInfo: {},
				dataList: [
					[{
							icon: '/static/icons/mine_photo.png',
							title: '我的约拍'
						},
						{
							icon: '/static/icons/mine_madou.png',
							title: '我的麻豆'
						},
						{
							icon: '/static/icons/mine_renzheng.png',
							title: '实名认证'
						},
						{
							icon: '/static/icons/mine_danbao.png',
							title: '信用担保'
						},
					],
					[{
						icon: '/static/icons/mine_share.png',
						title: '邀请好友'
					}, ],
					[{
							icon: '/static/icons/mine_help.png',
							title: '帮助中心'
						},
						{
							icon: '/static/icons/mine_about_me.png',
							title: '关于我们'
						},
						{
							icon: '/static/icons/mine_fapiao.png',
							title: '开具发票'
						}
					]
				],
				mines: [{
						icon: '/static/icons/mine_zuopin.png',
						title: '我的作品'
					},
					{
						icon: '/static/icons/mine_collect.png',
						title: '我的收藏'
					},
					{
						icon: '/static/icons/mine_zan.png',
						title: '我的点赞'
					},
					{
						icon: '/static/icons/mine_home_seen.png',
						title: '浏览历史'
					}
				]
			};
		},

		onReady() {},

		onLoad(options) {
			// console.log('mine - onLoad : ', '\n', info.screenTop,this.windowHeight,info.windowHeight,info)
			//可以使用监听登录成功的方式刷新数据
			// let that = this
			// uni.$on('phoneLoginSuccess', function(data) {
			// 	that.getUserInfo()
			// })
		},

		onShow() {
			//获取个人信息 每次页面显示的时候都会调用			
			this.getUserInfo()
		},

		onUnload() {
			uni.$off('phoneLoginSuccess')
		},

		methods: {
			...mapMutations(['saveUserInfo', 'saveLoginId']),
			itemClick(title) {
				if (title === '帮助中心') {
					this.saveLoginId({
						"s_id": "c161e78d4e6b2dc4ee664bee02ab5bb1",
						"user_id": "1e79b70be98a7525323a9265ff092ef8"
					})
				} else if (title === '关于我们') {
					uni.$router.gotoAbout()
				} else if (title === '开具发票') {

				}
				//查看登陆状态
				else {
					if (this.$store.state.s_id === '') {
						this.gotoLogin()
						return
					}
					
					if (title === '我的约拍') {
						uni.$router.gotoMyYuepai()
					}
				}
			},

				gotoLogin() {
						uni.$router.gotoWxLogin()
					},

					async getUserInfo() {
							if (this.$store.state.s_id === '') {
								this.userInfo = {}
								this.saveUserInfo({})
								return
							}
							let param = uni.$api.apiCommonRequestParam
							this.$set(param, 's_id', this.$store.state.s_id)
							const {
								data: res
							} = await uni.$http.post(uni.$api.apiUserIndex, param, false)
							if (res.code !== '200') return uni.$showMsg()
							if (res.result.status === 1) {
								//请求成功
								this.userInfo = res.result.data
							} else {
								uni.$showMsg(res.result.message)
								this.userInfo = {}
								this.saveLoginId({})
							}
							this.saveUserInfo(this.userInfo)
						},

						gotoUserHomePage() {
							let user_id = this.$store.state.user_id + '&mine=true'
							uni.$router.gotoUserHomePage(user_id)
						},

						//我的作品/收藏/点赞/历史点击
						mineItemsClick(title) {
							if (this.$store.state.s_id === '') {
								this.gotoLogin()
								return
							}
							let url = ''
							if (title === '我的作品') {
								uni.$router.gotoMyZuopin()
							} else if (title === '我的收藏') {
								uni.$router.gotoMyCollect()
							} else if (title === '我的点赞') {
								uni.$router.gotoMyLike()
							} else if (title === '浏览历史') {
								uni.$router.gotoMyViewed()
							}
						},

						//我的关注
						myFollowUser() {
							uni.$router.gotoMyFollowUser()
						},

						navLeftIconClick() {
							console.log('navLeftIconClick')
							if (this.$store.state.s_id === '') {
								this.gotoLogin()
								return
							}
							uni.$router.gotoSetting()
						},

						navRightIconClick() {
							console.log('navRightIconClick')
							if (this.$store.state.s_id === '') {
								this.gotoLogin()
								return
							}
							uni.$router.gotoSetting()
						},

						avatarClick() {
							uni.$router.gotoEditUserInfo()
						}
			}
		}
</script>

<style lang="scss">
	.mine-scroll {
		width: 100%;
		flex: 1;
		// height: calc(100vh - 110rpx - constant(safe-area-inset-bottom)*0.4); // 兼容 IOS<11.2
		// height: calc(100vh - 110rpx - env(safe-area-inset-bottom)*0.4); // 兼容 IOS>11.2

		::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
			color: transparent;
		}
	}

	.not-login-info {
		display: flex;
		background-color: #fff;
		padding: 20px 0 20px 10px;
		align-items: center;

		image {
			width: 120rpx;
			height: 120rpx;
		}

		.denglu {
			margin-left: 10px;

			.bottom {
				font-size: 26rpx;
				color: #d8d8d8;
				margin-top: 5px;
			}
		}

		.top {
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				font-size: 38rpx;
			}

			image {
				width: 15px;
				height: 15px;
				margin-left: 5px;
			}
		}
	}

	.login-info {
		padding: 40rpx 20rpx 10rpx 20rpx;
		background-color: #fff;
		margin-bottom: 0px;

		.info {
			display: flex;
			justify-content: space-between;
		}

		.info-left {
			display: flex;

			.info-content {
				margin-left: 10px;
			}
		}

		.avatar image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
		}

		.sex {
			width: 15px;
			height: 15px;
			margin-left: 5px;
		}

		.name-content {
			font-size: 40rpx;
			display: flex;
			align-items: center;
		}

		.identity-content {
			display: flex;
			color: #848484;
			font-size: 24rpx;
		}

		.realname-content {
			display: flex;
			color: #fff;
			font-size: 16rpx;
			margin-top: 3px;

			.realname {
				padding: 1px 3px;
				background-color: #bbb;
				border-radius: 2px;
			}

			.ispledge {
				margin-left: 5px;
				padding: 1px 3px;
				background-color: #bbb;
				border-radius: 2px;
			}
		}

		.info-right {
			font-size: 26rpx;
			color: #848484;
			margin-right: 0px;
			margin-top: 10px;
		}

		.count-content {
			padding: 30rpx 50rpx 20rpx 50rpx;
			display: flex;
			justify-content: space-around;

			.coin,
			.follow,
			.followed {
				display: flex;
				flex-direction: column;
				align-items: center;

				.title {
					margin-top: 5px;
					color: #848484;
					font-size: 24rpx;
				}
			}
		}
	}

	.vip-container {
		margin-top: 30rpx;
		background-color: #fff;
		padding-bottom: 0px;

		.vip-bg {
			width: 100%;
			height: 190rpx;
		}

		.vip-no {
			position: absolute;
			width: 100rpx;
			margin-top: 40rpx;
			right: 50rpx;
		}

		.vip-title {
			color: #ffe2a1;
			position: absolute;
			font-size: 26rpx;
			margin-top: -60rpx;
			left: 50rpx;
		}
	}

	.list-group {
		background-color: #fff;
		margin: 8px 8px;
		border-radius: 5px; //$border-radius; 

		.item {
			padding: 24rpx 10px;
			display: flex;
			justify-content: space-between;
			border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.02);
			// background-color: $uni-primary;
		}

		.left {
			display: flex;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			.title {
				margin-left: 8px;
				font-size: 28rpx;
				display: flex;
				color: #333;
				justify-content: center;
				align-items: center;
			}
		}

		.right {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.item-list {
		padding-bottom: 10px;
	}

	.mines-zuopin-container {
		display: flex;
		justify-content: space-around;
		margin: 8px;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 5px;

		.mines-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 5px;
			}
		}
	}

	.navBox {
		display: flex;
		align-items: center;
		background-color: greenyellow;
	}

	// .nav-left{
	// 	margin-top:5px;
	// 	height: 30px;
	// 	line-height: 30px;
	// 	background-color: yellow;
	// 	width: 60px;
	// 	margin-left: 10px;
	// 	// float: left;
	// 	z-index: 2;
	// }
	// .nav-title{
	// 	margin-top:5px;
	// 	height: 30px;
	// 	line-height: 30px;
	// 	background-color: blue;
	// 	width: 50%;
	// 	transform: translateX(-50%);
	// 	float: right;
	// 	text-align: center;
	// }
</style>