<template>
	<view class="login">
		<view class="login-container">
			<view class="login-title">账号密码登录</view>
			<view class="account-content">
				<view class="item">
					<view class="title">账号</view>
					<input class="input" type="number" placeholder="请输入手机号" placeholder-class="placeholder" @input="phoneNumberChange"></input>
				</view>
				<view class="item">
					<view class="title">密码</view>
					<input class="input" password="true" placeholder="请输入密码" placeholder-class="placeholder" @input="passwordChange"></input>
				</view>
			</view>
			<view class="login-button" :class="loginButtonEnable ? 'active':''" @click="loginButtonClick">登录</view>
			<view class="forget-password" @click="forgetPasswordButtonClick">忘记密码？</view>
			<view class="other-login">
				<view class="other-title">
					<view class="u-line" />
					<view>&ensp;其他方式登录&ensp;</view>
					<view class="u-line" />
				</view>
				<view class="wxlogin">
					<image src="/static/icons/icon_share_weixin.png" mode=""></image>
				</view>
			</view>
			
			<view class="user-agreement">
				<image class="agreement-icon"
					:src="agreement === false ? '/static/icons/icon_select_no.png':'/static/icons/icon_select_yes.png'"
					@click="agreementIconClick">
				</image>
				<view class="content">我已阅读并同意 <text @click="agreementClick(1)" style="color: #0076dd;">《用户协议》</text> 和 <text @click="agreementClick(2)" style="color: #0076dd;">《隐私政策》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				agreement: false,
				//登录按钮是否可以点击
				loginButtonEnable:false,
				phone:'17611688560',
				password:'aaa123456'
			};
		},

		onLoad() {
			
		},

		methods: {
			...mapMutations(['saveLoginId']),
			loginButtonClick() {
				if(!this.loginButtonEnable){return}
				if (!this.agreement) {
					uni.showModal({
						title: '提示',
						content: '请阅读并同意《用户协议》《隐私条款》',
						success: function(res) {
							if (res.confirm) {
								this.agreement = true
								//
								console.log('确定', this.agreement)
								// 账号登录
								this.loginPhone()
							} else {
								console.log('取消')
							}
						}.bind(this)
					})
					return
				}
				// 账号登录
				this.loginPhone()
			},

			//同意按钮点击
			agreementIconClick() {
				this.agreement = !this.agreement
			},

			//用户协议点击
			agreementClick(type) {
				console.log('用户协议点击')
				let url = type === 1 ? 'https://m.mdyuepai.com/m/about/agreement' :
					'https://m.mdyuepai.com/m/about/private'
				let title = type === 1 ? '用户协议' : '隐私政策'
				uni.navigateTo({
					url: '/subpkg/webview/webview?url=' + url + '&title=' + title
				})
			},

			wxlogin() {
				// uni.showToast({
				// 	title: '跳转微信登录'
				// })
				
			},

			forgetPasswordButtonClick() {
				uni.showModal({
					title:'忘记密码怎么办？',
					content:'忘记密码，请选择使用微信等其他方式登录。登录成功后，可到设置页面修改密码。',
					confirmText:'我知道了',
					confirmColor:'#0076dd',
					showCancel:false
				})
			},
			
			phoneNumberChange(res){
				this.phone = res.target.value
				this.checkLoginButtonEnable()
			},
			
			passwordChange(res){
				this.password = res.target.value
				this.checkLoginButtonEnable()
			},
			
			checkLoginButtonEnable(){
				this.loginButtonEnable = (this.phone !== '' && this.password !== '')?true:false
			},
			
			async loginPhone() {
				let param = {
					appid:uni.$appConfig.appid,
					appkey:uni.$appConfig.appkey,
					phone:this.phone,
					pwd:this.password,
					platform:uni.$appConfig.platform,
					version:uni.$appConfig.version,
					system:uni.$appConfig.system,
					brand:uni.$appConfig.brand, 
					model:uni.$appConfig.model
				}
				const {data:res} = await uni.$http.post(uni.$api.loginphone,param)
				if (res.code !== '200') return uni.$showMsg()
				this.saveLoginId(res.result.data)
				uni.$emit('phoneLoginSuccess')
				console.log('登录后的s_id---',this.$store.state.s_id)
				uni.navigateBack({
					//回退2个页面，回到点击登录的页面
					delta:2
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.login-container {
		padding: 40rpx;
	}

	.login-title {
		margin-top: 100rpx;
		font-size: 46rpx;
	}

	.account-content {
		margin-top: 40rpx;

		.item {
			display: flex;
			padding: 25rpx 0;
			align-items: center;
			border-bottom: 0.25rpx solid #f5f5f5;
		}

		.title {
			font-size: 28rpx;
		}

		.input {
			margin-left: 60rpx;
			font-size: 30rpx;
		}

		.placeholder {
			font-size: 30rpx;
			color: #d5d5d5 !important;
		}
	}

	.login-button{
		margin: 80rpx 40rpx 0 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		font-size: 30rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background-color: #fed7d8;

	}
	.active{
		background-color: #fe5356;
	}
	
	.forget-password{
		font-size: 22rpx;
		margin-top: 10px;
		text-align: right;
		line-height: 50rpx;
		right: 75rpx;
		width: 120rpx;
		position: absolute;
		color: #8e8e8e;
	}
	.other-login{
		margin-top: 90rpx ;
		color: #a9a9a9;
		font-size: 24rpx;
		.other-title{
			display: flex;
			align-items: center;
			justify-content: center;
			.u-line{
				background-color: rgba(119, 119, 119, 0.3);
				height: 1rpx;
				width: 200rpx;
			}
		}
		.wxlogin{
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 80rpx;
				height:80rpx;
			}
		}
	}
	.user-agreement {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 120rpx;
		font-size: 22rpx;
		color: #a0a0a0;

		.agreement-icon {
			width: 28rpx;
			height: 28rpx;
		}

		.content {
			margin-left: 5px;
		}
	}
</style>