<template>
	<view class="item-list">
		<view class="list-group" v-for="(item,index) in dataList" :key="index">
			<view class="item" v-for="(item2,index2) in item" :key="index2" @click="itemClick(item2.title)">
				<view class="left">
					<view class="title">{{item2.title}}</view>
				</view>
				<view class="right">
					<view class="right-text" v-if="item2.title === '手机号' && phone">
						{{phone}}
					</view>
					<view class="right-text" v-if="item2.title === '检查更新' && version">
						版本{{version}}
					</view>
					<uni-icons type="right" size="18" color="lightgray"></uni-icons>
				</view>
			</view>
		</view>
			
		<view class="log-out" @click="logoutClick">退出登录</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				phone:'',
				version:'',
				dataList: [
					[{
							icon: '/static/icons/mine_photo.png',
							title: '编辑个人资料'
						},
						{
							icon: '/static/icons/mine_madou.png',
							title: '联系方式'
						},

					],
					[{
							icon: '/static/icons/mine_renzheng.png',
							title: '手机号'
						},
						{
							icon: '/static/icons/mine_danbao.png',
							title: '登录密码'
						},
						{
							icon: '/static/icons/mine_share.png',
							title: '社交账号绑定'
						},
						{
							icon: '/static/icons/mine_help.png',
							title: '通知与提醒'
						},
						{
							icon: '/static/icons/mine_about_me.png',
							title: '黑名单管理'
						},
						{
							icon: '/static/icons/mine_fapiao.png',
							title: '个性化内容推荐'
						}
					],

					[{
							icon: '/static/icons/mine_zuopin.png',
							title: '建议反馈'
						},
						{
							icon: '/static/icons/mine_collect.png',
							title: '关于MD约拍'
						}
					],

					[{
							icon: '/static/icons/mine_zan.png',
							title: '清除缓存'
						},
						{
							icon: '/static/icons/mine_home_seen.png',
							title: '检查更新'
						},
					]
				]
			};
		},

		onLoad(options) {
			this.getInforVersion()
		},

		methods: {
			...mapMutations(['saveLoginId']),
			async getInforVersion(){
				let param = uni.$api.apiCommonRequestParam
				this.$set(param, 's_id',this.$store.state.s_id)
				const {data:res} = await uni.$http.post(uni.$api.apiSetinforVersion, param, false)
				if (res.code !== '200') return uni.$showMsg()
				if(res.result.status === 1){
					this.phone = res.result.data.phone
					this.version = res.result.data.version.newversion.version
				}
				else{
					uni.$showMsg(res.result.message)
				}
			},
			
			itemClick(title){
				if(title == '编辑个人资料'){
					uni.$router.gotoEditUserInfo()
				}
				else if(title == '关于MD约拍'){
					uni.$router.gotoAbout()
				}
			},
			
			logoutClick(){
				let that = this
				uni.showModal({
					title:'MD约拍',
					content:'确定退出当前账号吗？',
					showCancel:true,
					confirmText:'取消',
					cancelText:'退出',
					cancelColor:'#cd372e',
					success(res) {
						if(res.cancel){
							that.saveLoginId({})
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-group {
		background-color: #fff;
		margin: 8px 0px;

		.item {
			padding: 24rpx 5px 10px;
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
				font-size: 30rpx;
				display: flex;
				color: #333;
				justify-content: center;
				align-items: center;
				font-weight: 400;
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
	
	.right-text{
		font-size: 28rpx;
		color: #a0a0a0;
		font-weight: 300;
	}
	
	.log-out{
		margin-top: 30px;
		text-align: center;
		line-height: 40px;
		background-color: #fff;
		color: #a0a0a0;
		font-weight: 350;
	}
</style>