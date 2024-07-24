<template>
	<view class="detail-container" v-if="item.avatar">
		<view class="info">
			<view class="info-left">
				<image :src="item.avatar" class="info-img"></image>
				<view class="info-content">
					<view class="name-content">
						<view class="name">{{item.nickname}}</view>
						<image class="sex" :src="item.sex === 1 ? '/static/icons/male.png':'/static/icons/female.png'">{{item.nickname}}</image>
						<view class="uonlinetime">{{item.uonlinetime}}</view>
					</view>
					<view class="zhiye-content">
						<view class="zhiye" style="font-size:12px;margin-left: 0px;">{{item.identity}} | {{item.city_name}}</view>
						<view class="shiming" v-if="item.realname">已实名</view>
						<view class="danbao" v-if="item.ispledge">已担保</view>
					</view>
				</view>
			</view>
			<view class="info-right">
				<view class="guanzhu">+ 关注</view>
				<view class="tousu">投诉</view>
			</view>
		</view>
		<view class="middle" v-if="groups.length>0">
			<view class="item" v-for="(item,index) in groups" :key="index">
				<uni-icons type="location" size="25" color="rgba(93,159,64,1)"></uni-icons>
				<view>{{item}}</view>
			</view>
		</view>
		<!-- 约拍要求 -->
		<view class="yupai-content">
			<view class="title">
				<view class="">{{page_type === 1? '作品名称/描述':'约拍要求'}}</view>
			</view>
			<view class="content">
				<!-- <view class="">约拍要求</view> -->
				{{item.content}}
			</view>
			<view class="time" v-if="item.time">
				<view class="time-title">时间：</view>
				<view>{{item.time}}</view>
			</view>
			<view class="fanpian" v-if="item.isfanpian && page_type == 1">
				<view class="fanpian-title">约拍返片：</view>
				<view>约拍返片</view>
			</view>
			<view class="location" v-if="item.location">
				<view class="location-title">地点：</view>
				<view>{{item.location}}</view>
			</view>
			<view class="device" v-if="item.device && page_type == 1">
				<view class="device-title">设备：</view>
				<view>{{item.device}}</view>
			</view>
			<view class="fanpian" v-if="item.fanpian && page_type == 0">
				<view class="location-title">成片：</view>
				<view>{{item.fanpian}}</view>
			</view>
		</view>
		<!-- 显示视频-->
		<view class="video-container" v-if="video">
			<video class="video-player" style="margin-left:10px;width: 350rpx;height: 510rpx;"  :src="item.video"></video>
		</view>
		<!-- 图片 -->
		<view class="yupai-image" v-else>
			<view class="" v-for="(item2,index2) in item.imgUrl" :key="index2">
				<image :src="item2.bigurl" mode="widthFix" @click="previewImage(index2,item.imgUrl)"></image>
			</view>
		</view>
		<!-- 标签区域 -->
		<view class="item-tags">
			<view class="tag" v-for="(item3,index3) in item.tags" :key="index3">{{item3.name}}</view>
		</view>
		<!-- 阅读量区域 -->
		<view class="item-bottom">
			<view class="item-bottom-left">
				<view class="timetext">{{item.timetext}}</view>
				<view class="meet_count" v-if="item.meet_count">收到的约拍{{item.meet_count}}</view>
			</view>
			<view class="item-bottom-right">
				<view class="view_count">阅读 {{item.view_count}}</view>
				<view class="collect_count">赞 {{item.collect_count}}</view>
			</view>
		</view>
		<!-- 收到的约拍 -->
		<view class="regAvatarList" v-show="regAvatarList !== undefined && regAvatarList !== null && regAvatarList.length>0">
			<view class="title">
				<view>收到的约拍：{{regAvatarList.length}}</view>
			</view>
			<view class="images">
				<image mode="widthFix" :src="item5.avatar" v-for="(item5,index5) in regAvatarList" :key="index5"></image>
			</view>
		</view>
		<!-- 作品 -->
		<view class="zuopin" v-show="item.zuopin !== undefined && item.zuopin !== null && item.zuopin.length>0">
			<view class="title">
				<view class="title-left">
					<view>{{item.sex === 1?'他':'她'}}的作品</view>
				</view>
				<view class="title-right" @click="gotoHomePage">{{item.sex === 1?'他':'她'}}的主页 ></view>
			</view>
			<view class="images">
				<scroll-view class="image-scroll"  scroll-x="true">
					<image mode="aspectFill" :src="item4.origurl" v-for="(item4,index4) in item.zuopin" :key="index4" @click="previewImage(index4,item.zuopin)"></image>
				</scroll-view>
			</view>
		</view>
		<!-- 推荐约拍 -->
		<view class="recommend-list" v-if="item.recommend_list !== undefined && item.recommend_list !== null && item.recommend_list.length >0">
			<view id="title">
				- 推荐约拍 -
			</view>
			<!-- 推荐列表 -->
			<view class="recommend-item" v-for="(item5,index5) in item.recommend_list" :key="index5">
				<listCardItem :item="item5" @itemClick="itemClick" @previewImage="previewImage(index5,item5)"></listCardItem>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: {
					item_id: ''
				},
				//详情
				item: {},
				groups: [],
				//收到的约拍
				regAvatarList:[],
				page_type:0,//0从首页列表页面及详情页面进入 1.从作品页面进入
				video:false//是否是视频
			};
		},

		onLoad(options) {
			console.log('text---', options);
			this.param.item_id = options.item_id
			let title = '约拍详情'
			//判断是否是作品页面进入
			if (options.type !== null && options.type === 'production'){
				this.page_type = 1
				title = '作品详情'
				this.getApiGetItem()
			}
			else{
				//请求详情
				this.getDetail()
				//收到的约拍
				this.getRegAvatarList()
			} 
			uni.setNavigationBarTitle({
				title:title
			})
		},

		methods: {
			async getDetail() {
				console.log('详情页param---', this.param);
				const {
					data: res
				} = await uni.$http.post('/appapi/yuepai/apiGetDetail', this.param)
				if (res.code !== '200') return uni.$showMsg()
				this.item = res.result.data
				this.groups.push('面向' + this.item.city_name)
				this.groups.push(this.item.type_text)
				this.groups.push(this.item.mode_text)
				this.checkVideo()
				console.log('详情页数据---', res, this.groups)
			},
			
			async getRegAvatarList() {
				const {
					data: res
				} = await uni.$http.post('/appapi/yuepai/getRegAvatarList', this.param)
				if (res.code !== '200') return uni.$showMsg()
				this.regAvatarList = res.result.data.data
				console.log('详情页约拍数据---', this.regAvatarList)
			},

			// 请求作品详情-从作品页面进入
			async getApiGetItem() {
				console.log('详情页param---', this.param)
				const {
					data: res
				} = await uni.$http.post('/appapi/zuopin/apiGetItem', this.param)
				if (res.code !== '200') return uni.$showMsg()
				this.item = res.result.data
				this.checkVideo()
				console.log('详情页数据---zuopin', res, this.groups)
			},
			
			checkVideo(){
				if(this.item.imgUrl !== undefined && this.item.imgUrl !== null && this.item.imgUrl.length === 0 && this.item.video.length > 0){
					this.video = true
				}
			},
				
			//跳转到详情页面
			itemClick(item){
				uni.navigateTo({
					url:'/subpkg/detail/detail?item_id='+item.item_id
				})
			},
			//查看图片
			previewImage(index,images){
				console.log('详情页查看图片---',images,index)
				uni.previewImage({
					current:index,
					urls:images.map(img => img.bigurl)
				})
			},
			//跳转个人主页
			gotoHomePage(){
				console.log("----------------gotoHomePage")
				uni.navigateTo({
					url:'/subpkg/userHomePage/userHomePage?user_id='+this.item.user_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-container {
		padding-bottom: 260px;
	}

	.info {
		display: flex;
		margin: 10px;
		display: flex;
		justify-content: space-between;
		background-color: white;

		.info-left {
			padding: 20px 10px;
			display: flex;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
			}

			.info-content {
				margin-left: 10px;

				.name-content {
					display: flex;
					align-items: center;
					.name {
						// margin-top: 8px;
						font-size: 14px;
					}
					
					.sex{
						width: 15px;
						height: 15px;
						margin-left: 3px;
					}

					.uonlinetime {
						margin-left: 10px;
						font-size: 12px;
						line-height: 18px;
						color: gray;
					}
				}


				.zhiye-content {
					display: flex;
					margin-top: 3px;

					.zhiye {
						font-size: 12px;
					}

					.shiming {
						padding: 2px 2px;
						font-size: 9px;
						margin-left: 10px;
						background-color: rgb(100, 128, 249);
						color: white;
						border-radius: 2px;
					}

					.danbao {
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
		}

		.info-right {
			// background-color: yellow;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-right: 10px;

			.guanzhu {
				font-size: 14px;
				color: #c00000;
				border: 1px solid #c00000;
				height: 20px;
				padding: 2px 5px;
				border-radius: 10px;
			}

			.tousu {
				margin-top: 5px;
				font-size: 13px;
				color: gray;
			}
		}
	}

	.middle {
		margin: 10px 10px;
		background-color: white;
		padding: 15px 0;
		display: flex;
		justify-content: space-around;

		// align-items: center;
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 14px;
		}
	}

	.yupai-content {
		background-color: white;
		margin: 10px 10px;
		margin-bottom: 0px;
		padding: 10px 10px;

		.title {
			height: 20px;
			border-left: 3px solid #c00000;
			padding-left: 10px;
		}

		.content {
			margin: 10px 0px;
			font-size: 13px;
		}

		.time,
		.fanpian,
		.location,
		.device,
		.fanpian {
			display: flex;
			align-items: center;
			font-size: 12px;
			color: gray;
		}

		.time-title,
		.fanpian-title,
		.location-title,
		.device-title,
		.fanpian-title {
			font-size: 16px;
			color: #000000;
		}
	}

	.yupai-image {
		margin: 0 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 670rpx;
		}
	}

	.item-tags {
		margin: 0px 10px;
		padding-left: 10px;
		height: 30px;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 0.5px solid #efefef;

		.tag {
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

	.item-bottom {
		margin: 0px 10px;
		padding: 10px 10px;
		display: flex;
		justify-content: space-between;
		background-color: white;

		.item-bottom-left {
			display: flex;

			.timetext {
				font-size: 12px;
				color: gray;
				margin-right: 10px;
			}

			.meet_count {
				font-size: 12px;
				color: gray;
			}
		}

		.item-bottom-right {
			font-size: 12px;
			color: gray;
			display: flex;

			.view_count {
				margin-right: 10px;
			}
		}
	}

	.zuopin {
		background-color: white;
		margin: 10px 10px;

		.title {
			padding: 10px 10px;
			display: flex;
			justify-content: space-between;

			.title-left {
				height: 20px;
				border-left: 3px solid #c00000;
				padding-left: 10px;
			}

			.title-right {
				font-size: 14px;
				color: gray;
			}
		}
		
		.images {
			padding: 10px 10px;
			.image-scroll{
				background-color: white;
				width: 100%;
				height: 260rpx;
				white-space: nowrap;
				display: inline-block;
				image {
					width: 260rpx;
					height: 260rpx;
					border-radius: 5px;
					margin-right: 8px;
				}
			}
		}
	}
	.regAvatarList{
		margin: 10px 10px;
		background-color: white;
		padding: 10px 10px;
		.title{
			height: 20px;
			border-left: 3px solid #c00000;
			padding-left: 10px;
		}
		.images{
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin-right: 10px;
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}
	}
	.recommend-list{
		 margin: 10px 0px;
		 #title{
			 line-height: 30px;
			 color: rgb(232, 153, 154);
			 text-align: center;
		 }
	}
	
	.video-container{
		background-color: white;
		margin: 0px 10px;
	}
</style>