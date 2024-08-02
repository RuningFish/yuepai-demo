<template>
	<view>
		<view class="list-card-item-container" @click="gotoDetail(item)">
			<view class="list-card-item-info">
				<view class="list-info-container">
					<image class="list-avatar" :src="item.avatar"></image>
					<view class="list-info-right-container">
						<view class="list-name-sex-container">
							<view class="list-name">{{item.nickname}}</view>
							<image class="list-sex" :src="item.sex === 1 ? '/static/icons/sex_boy.png': '/static/icons/sex_girl.png'" mode=""></image>
						</view>
						<view class="identity-city-container">
							<view  class="list-identity-city">{{item.identity}}</view>
							<image class="list-shiming" src="/static/icons/mine_shiming_yes.png" v-if="item.realname"></image>
							<image class="list-danbao"  src="/static/icons/mine_danbao_yes.png"  v-if="item.ispledge"></image>
						</view>
					</view>
				</view>
				<view class="list-card-item-info-right">{{item.uonlinetime}}</view>
			</view>
			<!-- 简介 -->
			<view class="list-card-item-title">
				<view class="list-card-title">{{item.title}}</view>
				<view class="list-card-city">{{item.city}}</view>
			</view>
			<view class="list-card-item-content">
				<view class="list-card-title">{{item.content}}</view>
			</view>
			<!-- 图片区域 -->
			<view class="list-card-item-images">
				<view v-for="(item2,index2) in item.imgUrl.slice(0,3)" :key="index2">
					<image :src="item2.origurl" mode="aspectFill" @click.stop="previewImage(index2,item.imgUrl)"></image>
					<view class="img-count" v-if="item.imgUrl.length>3 && index2===2">+{{item.imgUrl.length-3}}</view>
				</view>
			</view>
			<!-- 标签区域 -->
			<view class="list-card-item-tags">
				<view class="list-card-tag" v-for="(item3,index3) in item.tag" :key="index3">{{item3.name}}</view>
			</view>
			<!-- 阅读量区域 -->
			<view class="list-card-item-bottom">
				<view class="list-card-item-bottom-left">
					<view class="list-card-timetext">{{item.timetext}}</view>
					<view class="list-card-meet-count" v-if="item.meet_count">收到的约拍{{item.meet_count}}</view>
				</view>
				<view class="list-card-item-bottom-right">
					<view class="list-card-view-count">阅读 {{item.view_count}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "listCardItem",
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
				console.log('listCardItem----gotoDetail')
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
	.list-card-item-info {
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;

		.list-info-container{
			padding: 0;
		}

		.list-card-item-info-right {
			font-size: 11px;
			color: grey;
			float: right;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.list-card-item-title {
		font-size: 13px;
		display: flex;
		justify-content: space-between;

		.list-card-city {
			font-size: 12px;
		}
	}

	.list-card-item-content {
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

	.list-card-item-container {
		padding: 10px 10px;
		margin: 10px 10px;
		background-color: white;
		border-radius: 5px;
	}

	.list-card-item-images {
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

	.list-card-item-tags {
		height: 30px;
		// background-color: green;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 0.5px solid #efefef;

		.list-card-tag {
			height: 14px;
			border-radius: 7px;
			// background-color: yellow;
			margin-right: 10px;
			color: rgb(232, 153, 154);
			border: 0.5px solid rgb(232, 153, 154);
			font-size: 8px;
			line-height: 14px;
			padding: 0px 5px;
			display: flex;
			align-content: center;
			justify-content: center;
		}
	}

	.list-card-item-bottom {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		.list-card-item-bottom-left {
			display: flex;

			.list-card-timetext {
				font-size: 12px;
				color: gray;
				margin-right: 10px;
			}

			.list-card-meet-count {
				font-size: 12px;
				color: gray;
			}
		}

		.list-card-item-bottom-right {
			.list-card-view-count {
				font-size: 12px;
				color: gray;
			}
		}
	}
</style>