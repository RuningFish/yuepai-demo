<template>
	<view class="container">
		<view class="title">您可以发布</view>
		<view class="item-list">
			<view class="item" v-for="(item,index) in dataList" :key="index" @click="itemClick(index)">
				<view class="item-left">
					<image class="item-icon" :src="item.icon" mode="aspectFit"></image>
				</view>
				<view class="item-right">
					<view class="item-title">{{item.title}}</view>
					<view class="item-sub-title">{{item.subTitle}}</view>
				</view>
			</view>
		</view>
	</view>
	<myTabbar currentPath="/pages/publish/publish"></myTabbar>
</template>

<script>
	import myTabbar from '@/components/myTabbar/myTabbar';
	export default {
		comments:{
			myTabbar
		},
		data() {
			return {
				dataList: [
					{
						icon:'/static/icons/fabu_yuepai.png',
						title: '发布约拍',
						subTitle:'您可以发布约拍需求。约拍摄影师、模特、商家、化妆师、修图师'
					}, 
					{	
						icon:'/static/icons/fabu_zuopin.png',
						title: '发布作品',
						subTitle:'您可以上传自己的作品或照片来提高自己的约拍吸引力'
					}, 
					{
						icon:'/static/icons/fabu_changdi.png',
						title: '发布场地',
						subTitle:'您可以分享自己知道的比较适合的约拍场地，帮助他人创作，并获得奖励'
					},
					{
						icon:'/static/icons/fabu_moka.png',
						title: '制作模卡',
						subTitle:'免费制作专业高清模卡，模特卡，主播卡，演员卡数百种模板'
					},
				]
			};
		},
		onLoad() {
			
		},
		
		methods:{
			itemClick(index){
				if(index === 0){
					//约拍
					uni.$router.gotoPublishPubInfo()
				}
				else if(index === 1){
					//作品
					uni.$router.gotoPublishContentZuopin()
				}
				else if(index === 2 | index === 3){
					let type = `?type=${index}`
					uni.$router.gotoPublishChangdi(type)
				}
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.container{
		padding: 0 60rpx;
	}
	.title{
		margin-top: 30px;
		font-size: 50rpx;
		font-weight: 500;
	}
	.item-list{
		margin-top: 30rpx;
	}
	.item{
		display: flex;
		align-items: center;
		padding: 30rpx 0;
	}
	.item-icon{
		width: 120rpx;
		height: 120rpx;
	}
	.item-right{
		margin-left: 20px;
	}
	.item-title{
		color: #f7485e;
		font-size: 400;
		font-size: 40rpx;
	}
	.item-sub-title{
		color: #5a5a5a;
		font-size: 28rpx;
	}
</style>