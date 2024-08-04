<template>
	<view class="about-container">
		<view class="logo">
			<image src="/static/icons/icon_login_logo.png" mode="widthFix"></image>
			<view class="version">版本 {{version}}</view>
		</view>
		<!-- list -->
		<view class="item-list">
			<view class="list-group" v-for="(item,index) in dataList" :key="index">
				<view class="item" v-for="(item2,index2) in item" :key="index2" @click="itemClick(item2)">
						<view class="title">{{item2.title}}</view>
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
				version:uni.$appConfig.version,
				dataList: [
					[	{
							url: '',
							title: '关注微博'
						},
						{
							url: '',
							title: '关注公众号'
						},
						{
							url: '',
							title: '联系客服'
						},
						{
							url: 'https://m.mdyuepai.com/m/about/safetip',
							title: '防骗指南'
						},
						{
							url: 'https://images.madouyuepai.com/o_1g4s37v2qv4j1si1kf812646ck7.jpg',
							title: '营业执照'
						},
						{
							url: 'https://images.madouyuepai.com/o_1g4s38gf61rougeg1n0b1k4c1ou67.jpg',
							title: '人才服务许可'
						}
					],
					[	{
							url: 'https://m.mdyuepai.com/m/about/agreement',
							title: '用户协议'
						},
						{
							url: 'https://m.mdyuepai.com/m/about/private',
							title: '隐私政策'
						},
						{
							url: 'https://api.mdyuepai.com/m/about/sdklist',
							title: '第三方信息共享清单'
						},
						{
							url: 'https://api.mdyuepai.com/m/about/userinfolist',
							title: '个人信息收集清单'
						},
						{
							url: 'http://m.mdyuepai.com/m/about/charge',
							title: '充值服务'
						}
					]
				],
			};
		},
		
		methods:{
			itemClick(item){
				if(item.url !== ''){
					uni.$router.gotoWebView(item.url)
				}
				else{
					uni.showModal({
						content:item.title,
						confirmText:'确定',
						showCancel:false
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.logo{
	background-color: white;
	padding: 80rpx 40rpx 20rpx 40rpx;
	font-size: 28rpx;
	color: #e5e5e5;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		width: 400rpx;
		height: 400rpx;
	}
	.version{
		margin-top: 30rpx;
	}
}

.item-list{
	.list-group{
		margin-top: 10px;
		background-color: white;
	}
	.item{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 10px 10px;
		border-bottom: 1px solid rgba(229, 229, 229, 0.2);
	}
}
</style>
