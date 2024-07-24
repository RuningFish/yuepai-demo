<template>
	<view>
		<view class="list-card-item-container" @click="gotoDetail(item)">
			<view class="list-card-item-info">
				<view class="list-card-item-info-left">
					<image :src="item.avatar" class="list-card-info-img"></image>
					<view class="list-card-info-content">
						<view class="list-card-name-content">
							<view class="list-card-name">{{item.nickname}}</view>
							<image class="list-card-sex" :src="item.sex === 1 ? '/static/icons/male.png':'/static/icons/female.png'">{{item.nickname}}</image>
						</view>
						<view class="list-card-zhiye-content">
							<view class="list-card-zhiye" style="font-size:12px;margin-left: 0px;">{{item.identity}}</view>
							<view class="list-card-shiming" v-if="item.realname">已实名</view>
							<view class="list-card-danbao" v-if="item.ispledge">已担保</view>
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

		.list-card-item-info-left {
			display: flex;
		}

		.list-card-item-info-left image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 40rpx;
		}

		.list-card-info-content {
			margin-left: 10px;
			
			.list-card-name-content{
				display: flex;
				align-items: center;
				.list-card-name {
					font-size: 14px;
				}
				
				.list-card-sex{
					width: 15px;
					height: 15px;
					margin-left: 3px;
				}
			}


			.list-card-zhiye-content {
				display: flex;
				margin-top: 3px;

				.list-card-zhiye {
					font-size: 12px;
				}

				.list-card-shiming {
					padding: 2px 2px;
					font-size: 9px;
					margin-left: 10px;
					background-color: rgb(100, 128, 249);
					color: white;
					border-radius: 2px;
				}

				.list-card-danbao {
					// justify-content: center;
					height: 12px;
					padding: 2px 2px;
					font-size: 9px;
					margin-left: 10px;
					background-color: rgb(101, 176, 152);
					color: white;
					border-radius: 2px;
				}
			}
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
			border: 1px solid rgb(232, 153, 154);
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