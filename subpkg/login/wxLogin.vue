<template>
	<view class="login">
		<view class="login-container">
			<image class="login-logo" src="/static/icons/icon_login_logo.png" mode="widthFix"></image>
			<view class="login-button" @click="loginButtonClick">
				<image class="login-wx" src="/static/icons/icon_login_wx.png" mode="widthFix"></image>
				<view class="login-title">微信登录/注册</view>
			</view>
			<view class="login-password" @click="phoneNumberLoginClick">用账号密码登录</view>
			<view class="user-agreement">
				<image class="agreement-icon" :src="agreement === false ? '/static/icons/icon_select_no.png':'/static/icons/icon_select_yes.png'" @click="agreementIconClick"></image>
				<view class="content">我已阅读并同意 <text @click="agreementClick(1)" style="color: #0076dd;">《用户协议》</text> 和 <text @click="agreementClick(2)" style="color: #0076dd;">《隐私政策》</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreement:false
			};
		},
		
		onLoad() {
			let info = uni.getSystemInfoSync()
			console.log('信息====',info)
		},
		
		methods:{
			loginButtonClick(){
				if(!this.agreement){
					uni.showModal({
						title:'提示',
						content:'请阅读并同意《用户协议》《隐私条款》',
						success: function(res){
							if(res.confirm){
								this.agreement = true
								//
								console.log('确定',this.agreement)
								// 微信登录
								this.wxlogin()
							}
							else{
								console.log('取消')
							}
						}.bind(this)
					})
					return
				}
				// 微信登录
				this.wxlogin()
			},
			
			//同意按钮点击
			agreementIconClick(){
				this.agreement = !this.agreement
			},
			
			//用户协议点击
			agreementClick(type){
				console.log('用户协议点击')
				let url = type === 1?'https://m.mdyuepai.com/m/about/agreement':'https://m.mdyuepai.com/m/about/private'
				let title = type === 1?'用户协议':'隐私政策'
				uni.navigateTo({
					url:'/subpkg/webview/webview?url='+url+'&title='+title
				}) 
			},
			
			wxlogin(){
				uni.showToast({
					title:'微信登录'
				})
			},
			
			phoneNumberLoginClick(){
				uni.navigateTo({
					url:'/subpkg/login/phoneNumberLogin'
				})
			}
		}
	}
</script>

<style lang="scss">

.login-container{
	padding:100rpx;
}

	.login-logo{
		width: 100%;
	}
	
	.login-button{
		margin-top: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		font-size: 30rpx;
		background-color: #fe5356;
		height: 80rpx;
		border-radius: 40rpx;
		.login-wx{
			width: 40rpx;
		}
		.login-title{
			margin-left: 10px;
		}
	}
	.login-password{
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #0076dd;
	}
	
	.user-agreement{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 160rpx;
		font-size: 22rpx;
		color: #a0a0a0;
		.agreement-icon{
			width: 28rpx;
			height: 28rpx;
		}
		.content{
			margin-left: 5px;
		}
	}
</style>
