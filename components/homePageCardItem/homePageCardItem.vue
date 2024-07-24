<template>
	<view>
		<view class="home-page-card-item-container" @click="gotoDetail(item)">
			<!-- 简介 -->
			<view class="home-page-card-item-title">
				<view>{{item.title}}</view>
				<view class="home-page-card-city" v-if="item.city_name">
					<uni-icons type="location" size="18"></uni-icons>
					<view class="home-page-card-title">{{item.city_name}}</view>
				</view>
			</view>
			<view class="home-page-card-item-content">
				<view>{{item.content}}</view>
			</view>
			<!-- 视频图片有先显示视频图片 -->
			<block v-if="item.video_cover !== null && item.video_cover.length > 0">
				<image class="video-icon" src="/static/icons/play_icon.png">
					<!-- <uni-icons type="videocam" size="25" color="#fff"></uni-icons> -->
					
				</image>
				<image class="image-cover" :src="item.video_cover" ></image>
			</block>
			<!-- 图片区域 -->
			<view class="home-page-card-item-images" v-else>
				<view v-for="(item2,index2) in item.imgUrl.slice(0,3)" :key="index2">
					<image :src="item2.origurl" mode="aspectFill" @click.stop="previewImage(index2,item.imgUrl)"></image>
					<view class="img-count" v-if="item.imgUrl.length>3 && index2===2">+{{item.imgUrl.length-3}}</view>
				</view>
			</view>
			<!-- 阅读量区域 -->
			<view class="home-page-card-item-bottom">
				<view class="home-page-card-item-bottom-left">
					<view class="home-page-card-timetext">{{item.timetext}}</view>
					<view class="home-page-card-meet-count" v-if="item.meet_count">收到的约拍{{item.meet_count}}</view>
				</view>
				<view class="home-page-card-item-bottom-right">
					<view class="home-page-card-view-count">阅读 {{item.view_count}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "homePageCardItem",
		props: {
			item: {
				type: Object,
				default: {}
			}
		},

		data() {
			return {

			};
		},
		
		methods:{
			//跳转到详情页面
			gotoDetail(item){
				this.$emit('itemClick',item)
			},
			//查看图片
			previewImage(index,imgs){
				this.$emit('previewImage',index,imgs)
			}
		}
	}
</script>

<style lang="scss">

	.home-page-card-item-title {
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;

		.home-page-card-city {
			font-size: 14px;
			display: flex;
		}
	}

	.home-page-card-item-content {
		margin-top: 10px;
		font-size: 26rpx;
		color: gray;
		display: flex;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		min-height: 40rpx;
		max-height: 105rpx;
		white-space: pre-wrap;
	}

	.home-page-card-item-container {
		padding: 10px 10px;
		margin: 10px 10px;
		background-color: white;
		border-radius: 5px;
	}

	.home-page-card-item-images {
		display: flex;
		margin-top: 10px;
		position: relative;
		image {
			width: 216rpx;
			height: 216rpx;
			border-radius: 5px;
			margin-right: 6px;
			position: relative;
		}
		
		.img-count{
			background-color: rgba(0, 0, 0, 0.4);// rgb(232, 153, 154);
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			width: 40rpx;
			height: 35rpx;
			z-index: 999;
			margin-top: -43rpx;
			margin-left: 177rpx;
			font-size: 22rpx;
			color: white;
			border-radius: 5px 0 5px 0;
		}
	}

	.home-page-card-item-bottom {
		margin-top: 5px;
		padding-top: 10px;
		display: flex;
		justify-content: space-between;
		border-top: 0.25px solid #efefef;
		.home-page-card-item-bottom-left {
			display: flex;

			.home-page-card-timetext {
				font-size: 12px;
				color: gray;
				margin-right: 10px;
			}

			.home-page-card-meet-count {
				font-size: 12px;
				color: gray;
			}
		}

		.home-page-card-item-bottom-right {
			.home-page-card-view-count {
				font-size: 12px;
				color: gray;
			}
		}
	}
	
	.video-icon{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		margin-top: 240rpx;
		margin-left: 145rpx;
		z-index: 999;
		color: #fff;
	}
	
	.image-cover{
		width: 350rpx;
		height: 500rpx;
		border-radius: 5px;
		margin-top: 10px;
	}
</style>