<template>
	
	<view class="info" v-if="!login" @click="gotoLogin">
		<image src="/static/icons/icon_avatar.png" mode=""></image>
		<view class="denglu">
			<view class="top">
				<view class="title">立即登录</view>
				<image src="/static/icons/arrow_right_able.png" mode="scaleToFill"></image>
			</view>
			<view class="bottom">点击登录</view>
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
						<view v-if="item2.title === '邀请好友'" style="color: #dd0700;font-size: 22rpx;" >赚麻豆</view>
						<uni-icons type="right" size="18" color="lightgray"></uni-icons>
					</view>
			</view>
		</view>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					[	{
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
					[	{
						icon: '/static/icons/mine_share.png',
						title: '邀请好友'
						},
					],
					[	{
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
				login:false
			};
		},

		onLoad(options) {
			this.login = this.$store.state.login
		},
		
		methods:{
			itemClick(title){
				
				if(title === '帮助中心'){
					
				}
				else if(title === '关于我们'){
					uni.navigateTo({
						url:'/subpkg/about/about'
					})
				}
				else if(title === '开具发票'){
					
				}
				//查看登陆状态
				else if (!this.login){
					this.gotoLogin()
					return
				}
			},
			
			gotoLogin(){
				uni.navigateTo({
					url:'/subpkg/login/wxLogin'
				})
			}
		}
	}
</script>

<style lang="scss">
.info{
	display: flex;
	background-color: #fff;
	padding: 20px 0 20px 10px;
	align-items: center;
	image{
		width: 120rpx;
		height: 120rpx;
	}
	.denglu{
		margin-left: 10px;
		.bottom{
			font-size: 26rpx;
			color: #d8d8d8;
			margin-top: 5px;
		}
	}
	.top{
		display: flex;
		justify-content: center;
		align-items: center;
		.title{
			font-size: 38rpx;
		}
		image{
			width: 15px;
			height: 15px;
			margin-left: 5px;
		}
	}
}

.list-group{
	background-color: #fff;
	margin: 5px 8px;
	border-radius: 5px;
	.item{
		padding: 24rpx 10px;
		display: flex;
		justify-content: space-between;
		border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.02);
	}
	.left{
		display: flex;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		.title{
			margin-left: 8px;
			font-size: 28rpx;
			display: flex;
			color: #333;
			justify-content: center;
			align-items: center;
		}
	}
	.right{
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>