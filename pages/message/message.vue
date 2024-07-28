<template>
	<view class="message-container">
		<view class="list-group" v-for="(item,index) in dataList" :key="index">
			<view class="item" v-for="(item2,index2) in item" :key="index2" @click="itemClick(item2.title)">
					<view class="left">
						<image :src="item2.icon" mode=""></image>
						<view class="title">{{item2.title}}</view>
					</view>
					<view class="right">
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
							icon: '/static/icons/reicive_yuepai.png',
							title: '收到的约拍请求'
						},
						{
							icon: '/static/icons/send_yuepai.png',
							title: '发起的约拍请求'
						},
					],
					[	{
							icon: '/static/icons/reicive_message.png',
							title: '收到的极速联系'
						},
						{
							icon: '/static/icons/send_yuepai.png',
							title: '发起的极速联系'
						},
					],
					[	{
						icon: '/static/icons/sys_message.png',
						title: '系统消息'
						},
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
				//查看登陆状态
				if (!this.login){
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
