<template>
	<my-tabs :tabList="['推荐约拍','最新约拍','同城约拍']">~~~~</my-tabs>
		<view class="home-tab">
	
		</view>
	<!-- 首页banner -->
	<view class="home-banner">
		<swiper :indicator-dots="banner.length>1" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image class="banner-img" :src="item.imgUrl"></image>
			</swiper-item>
		</swiper>
	</view>
	<!-- 推荐列表 -->
	<view class="home-recommend-list">
		<view class="home-recommend-item" v-for="(item,index) in recommendList" :key="index">
			<view class="item-container" @click="itemClick(item)">
				<view class="item-info">
					<view class="item-info-left">
						<image :src="item.avatar" class="info-img"></image>
						<view class="info-content">
							<view class="name-content">
								<view class="name">{{item.nickname}}</view>
							</view>
							<view class="zhiye-content">
								<view class="zhiye" style="font-size:12px;margin-left: 0px;">{{item.identity}}</view>
								<view class="shiming" v-if="item.realname">已实名</view>
								<view class="danbao" v-if="item.ispledge">已担保</view>
							</view>
						</view>
					</view>
					<view class="item-info-right">{{item.uonlinetime}}</view>
				</view>
				<!-- 简介 -->
				<view class="item-title">
					<view class="title">{{item.title}}</view>
					<view class="city">{{item.city}}</view>
				</view>
				<view class="item-content">
					<view class="title">{{item.content}}</view>
				</view>
				<!-- 图片区域 -->
				<view class="item-images">
					<block v-for="(item2,index2) in item.imgUrl.slice(0,3)" :key="index2">
						<image :src="item2.origurl" mode="aspectFill" ></image> <!--:style="{'height':imageWidth + 'px'}"-->
					</block>
				</view>
				<!-- 标签区域 -->
				<view class="item-tags"> 
					<view class="tag" v-for="(item3,index3) in item.tag" :key="index3">{{item3.name}}</view>
				</view>
				<!-- 阅读量区域 -->
				<view class="item-bottom">
					<view class="item-bottom-left">
						<view class="timetext">{{item.timetext}}</view>
						<view class="meet_count" v-if="item.meet_count">收到的约拍{{item.meet_count}}</view>
					</view>
					<view class="item-bottom-right">
						<view class="view_count">阅读 {{item.view_count}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars: [{
					name: '待收货',
					id:1
				}, {
					name: '待付款',
					id:2
				}, {
					name: '待评价',
					id:3
				}],
				banner:[],
				recommendList:[],
				imageWidth:0
			};
		},
		onLoad() {
			this.getBanner()
			this.getRecommendList()
			
			const info = uni.getSystemInfoSync()
			this.imageWidth = (info.windowWidth-50)/3
			console.log('text---',this.imageWidth);
		},
		
		methods:{
			async getBanner(){
				const {data:res} = await uni.$http.get('/appapi/Banner/apiGetList')
				if (res.code !== '200') return uni.$showMsg()
				this.banner = res.result.data.banner
				console.log('首页banner---',res,this.banner);
			},
			async getRecommendList(){
				const {data:res} = await uni.$http.get('/appapi/Yuepai/apiGetRecommendList')
				if (res.code !== '200') return uni.$showMsg()
				this.recommendList = res.result.data.data
				console.log('首页推荐---',this.recommendList);
			},
			
			itemClick(item){
				uni.navigateTo({
					url:'/subpkg/detail/detail?item_id='+item.item_id
				})
			}
		},
	}
</script>

<style lang="scss">
.home-nav-container {
	height: 100px;
	width: 100%;
	background-color: orangered;
}
	
.home-banner{
	margin: 10px 10px;
	.banner-img{
		width: 100%;
		height: 180rpx;
		background-color: aqua;
	}
}

.home-recommend-list{
	margin: 0px 10px;
	.home-recommend-item{
		margin: 10px 0px;
		background-color: white;
		border-radius: 5px;
		.item-info{
			display: flex;
			padding-bottom: 10px;
			display: flex;
			justify-content: space-between;

			.item-info-left image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
			}
			.info-content{
				margin-left: 10px;
				.name{
					// margin-top: 8px;
					font-size: 14px;
				}
				.zhiye-content{
					display: flex;
					margin-top: 3px;
					.zhiye{
						font-size: 12px;
					}
					.shiming{
						padding: 2px 2px;
						font-size:9px;
						margin-left: 10px;
						background-color: rgb(100,128,249);
						color: white;
						border-radius: 2px;
					}
					.danbao{
						// justify-content: center;
						height: 12px;
						padding: 2px 2px;
						font-size:9px;
						margin-left: 10px;
						background-color: rgb(101,176,152);
						color: white;
						border-radius: 2px;
					}
				}
			}
			.item-info-right{
				font-size: 11px;
				color: grey;
				float: right;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.item-title{
			font-size: 13px;
			display: flex;
			justify-content: space-between;
			.city{
				font-size: 12px;
			}
		}
		.item-content{
			margin-top: 10px;
			font-size: 13px;
			color: gray;
			display: flex;
		}
	}
}

.item-container{
	padding: 10px 10px;
	// background-color: yellow;
}

.item-images{
	display: flex;
	margin-top: 10px;
	justify-content: space-between;
	image{
		width: 216rpx;
		height: 216rpx;
		border-radius: 5px;
	}
}

.item-tags{
	height: 30px;
	// background-color: green;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 0.5px solid #efefef;
	.tag{
		height: 14px;
		border-radius: 7px;
		// background-color: yellow;
		margin-right: 10px;
		color: rgb(232,153,154);
		border: 1px solid rgb(232,153,154);
		font-size: 8px;
		line-height: 14px;
		padding: 0px 5px;
		display: flex;
		align-content: center;
		justify-content: center;
	}
}
.item-bottom{
	margin-top: 10px;
	display: flex;
	justify-content: space-between;
	.item-bottom-left{
		display: flex;
		.timetext{
			font-size: 12px;
			color: gray;
			margin-right: 10px;
		}
		.meet_count{
			font-size: 12px;
			color: gray;
		}
	}
	.item-bottom-right{
		.view_count{
			font-size: 12px;
			color: gray;
		}
	}
}

.item-info-left{
	display: flex;
}

.home-nav-container{
		position: sticky;
		top: 0;
		z-index: 999;
}
page{
	// bounces:
}
</style>