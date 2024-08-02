<template>
	<view class="detail-container" v-if="item.avatar">
		<view class="info">
			<view class="list-info-container">
				<image class="list-avatar" :src="item.avatar"></image>
				<view  class="list-info-right-container">
					<view class="list-name-sex-container">
						<view  class="list-name">{{item.nickname}}</view>
						<image class="list-sex" :src="item.sex === 1 ? '/static/icons/sex_boy.png': '/static/icons/sex_girl.png'" mode=""></image>
						<view  class="list-uonlinetime">{{item.uonlinetime}}</view>
					</view>
					<view class="identity-city-container">
						<view  class="list-identity-city">{{item.identity}} | {{item.city_name}}</view>
						<image class="list-shiming" src="/static/icons/mine_shiming_yes.png" v-if="item.realname"></image>
						<image class="list-danbao"  src="/static/icons/mine_danbao_yes.png"  v-if="item.ispledge"></image>
					</view>
				</view>
			</view>
			<view class="info-right">
				<!--  已关注/ 关注 -->
				<image @click="followUserClick" class="follow-icon"
					:src="item.isfollow ? '/static/icons/icon_detail_guanzhu_yes.png' :'/static/icons/icon_detail_guanzhu_no.png'"
					mode="widthFix"></image>
				<view class="tousu">投诉</view>
			</view>
		</view>
		<view class="middle" v-if="groups[0].title">
			<view class="item" v-for="(item,index) in groups" :key="index">
				<image class="icon" :src="item.icon"></image>
				<view>{{item.title}}</view>
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
			<video class="video-player" style="margin-left:10px;width: 350rpx;height: 510rpx;"
				:src="item.video"></video>
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
		<view class="regAvatarList"
			v-show="regAvatarList !== undefined && regAvatarList !== null && regAvatarList.length>0">
			<view class="title">
				<view>收到的约拍：{{regAvatarList.length}}</view>
			</view>
			<view class="images">
				<image mode="widthFix" :src="item5.avatar" v-for="(item5,index5) in regAvatarList" :key="index5">
				</image>
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
				<scroll-view class="image-scroll" scroll-x="true">
					<image mode="aspectFill" :src="item4.origurl" v-for="(item4,index4) in item.zuopin" :key="index4"
						@click="previewImage(index4,item.zuopin)"></image>
				</scroll-view>
			</view>
		</view>
		<!-- 推荐约拍 -->
		<view class="recommend-list"
			v-if="item.recommend_list !== undefined && item.recommend_list !== null && item.recommend_list.length >0">
			<view id="title">
				- 推荐约拍 -
			</view>
			<!-- 推荐列表 -->
			<view class="recommend-item" v-for="(item5,index5) in item.recommend_list" :key="index5">
				<listCardItem :item="item5" @itemClick="itemClick" @previewImage="previewImage(index5,item5.imgUrl)">
				</listCardItem>
			</view>
		</view>
	</view>
	<!-- 点赞/收藏 -->
	<view class="bottom-container">
		<view class="bottom-left">
			<view class="icon_item" @click="likeIconClick">
				<image class="like"
					:src="item.islike ? '/static/icons/icon_bottom_like_yes.png' : '/static/icons/icon_bottom_like.png'" />
				<view class="like-count">{{item.like_count === 0 ? '':item.like_count}}</view>
			</view>
			<view class="icon_item" @click="collectIconClick">
				<image class="collect"
					:src="item.iscollect ? '/static/icons/icon_bottom_collect_yes.png' : '/static/icons/icon_bottom_collect.png'" />
			</view>
		</view>
		<view class="bottom-right">
			<view class="bottom-right-yuepai">立即约拍</view>
		</view>
	</view>
</template>

<script>
	import {
		$appConfig
	} from '../../config/appConfig';
	import {
		$api
	} from '../../request/api';
	import {
		$mixin
	} from '../../static/mixin/mixin';
	export default {
		mixins: [$mixin],
		data() {
			return {
				param: $api.apiCommonRequestParam,
				//详情
				item: {},
				groups: [{
						icon: '/static/icons/location2.png',
						title: ''
					},
					{
						icon: '/static/icons/cameraman.png',
						title: ''
					},
					{
						icon: '/static/icons/money.png',
						title: ''
					}
				],
				//收到的约拍
				regAvatarList: [],
				page_type: 0, //0从首页列表页面及详情页面进入 1.从作品页面进入
				video: false //是否是视频
			};
		},

		onLoad(options) {
			console.log('text---', options);
			if (options.item_id === '' || options.item_id === null) return
			this.$set(this.param, 'item_id', options.item_id)
			let title = '约拍详情'
			//判断是否是作品页面进入
			if (options.type !== null && options.type === 'production') {
				this.page_type = 1
				title = '作品详情'
				this.getApiGetItem()
			} else {
				//请求详情
				this.getDetail()
				//收到的约拍
				this.getRegAvatarList()
			}
			uni.setNavigationBarTitle({
				title: title
			})
		},

		methods: {
			async getDetail() {
				console.log('详情页param---', this.param);
				const {
					data: res
				} = await uni.$http.post($api.apiGetDetail, this.param)
				if (res.code !== '200') return uni.$showMsg()
				this.item = res.result.data
				this.groups[0].title = '面向' + this.item.city_name
				this.groups[1].title = this.item.type_text
				this.groups[2].title = this.item.mode_text
				this.checkVideo()
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

			checkVideo() {
				if (this.item.imgUrl !== undefined && this.item.imgUrl !== null && this.item.imgUrl.length === 0 && this
					.item.video.length > 0) {
					this.video = true
				}
			},

			//跳转到详情页面
			itemClick(item) {
				uni.navigateTo({
					url: '/subpkg/detail/detail?item_id=' + item.item_id
				})
			},
			//查看图片
			previewImage(index, images) {
				console.log('详情页查看图片---', images, index)
				uni.previewImage({
					current: index,
					urls: images.map(img => img.bigurl)
				})
			},
			//跳转个人主页
			gotoHomePage() {
				console.log("----------------gotoHomePage")
				uni.navigateTo({
					url: '/subpkg/userHomePage/userHomePage?user_id=' + this.item.user_id
				})
			},

			//关注用户
			followUserClick() {
				if (this.item.isfollow) {
					this.unFollowUser(this.item.user_id, () => {
						this.item.isfollow = false
					})
					
				} else {
					this.followUser(this.item.user_id, () => {
						this.item.isfollow = true
					})
				}
				// if (this.$store.state.s_id === '') {
				// 	//跳转登录页面
				// 	uni.navigateTo({
				// 		url: '/subpkg/login/wxLogin'
				// 	})
				// } else if (this.item.isfollow) {
				// 	uni.showModal({
				// 		cancelText: '取消',
				// 		confirmText: '确定',
				// 		title: '温馨提示',
				// 		content: '确定要取消关注对方吗？',
				// 		success: function(res){
				// 			if (res.confirm) {
				// 				this.unFollowUser(() => {
				// 					this.item.isfollow = false
				// 					uni.showToast({
				// 						title: '取消成功',
				// 						icon: 'success'
				// 					})
				// 				})
				// 			} else if (res.cancel) {
				// 				console.log('cancel')
				// 			}
				// 		}.bind(this)
				// 	})
				// } else if (!this.item.isfollow) {
				// 	this.followUser(() => {
				// 		this.item.isfollow = true
				// 		uni.showToast({
				// 			title: '关注成功',
				// 			icon: 'success'
				// 		})
				// 	})
				// }
			},
			
			async likeIconClick(){
				if (this.$store.state.s_id === '') {
					//跳转登录页面
					uni.navigateTo({
						url: '/subpkg/login/wxLogin'
					})
					return
				}
				
				let param = $api.apiCommonRequestParam
				this.$set(param,'s_id',this.$store.state.s_id)
				this.$set(param, 'item_id',this.item.item_id)
				this.$set(param, 'type','1')
				
				if(this.item.islike){
					//已点赞 =>取消点赞
					const { data: res } = await uni.$http.post($api.apiUnLike, param)
					if (res.code !== '200') return uni.$showMsg()
					if(res.result.status === 1){
						this.item.islike = false
						this.item.like_count -= 1
					}
				}
				else{
					const { data: res } = await uni.$http.post($api.apiLike, param)
					if (res.code !== '200') return uni.$showMsg()
					if(res.result.status === 1){
						this.item.islike = true
						this.item.like_count += 1
						uni.showToast({
							title:'点赞成功',
							icon:'none'
						})
					}
				}
			},

			//收藏
			async collectIconClick() {
				if (this.$store.state.s_id === '') {
					//跳转登录页面
					uni.navigateTo({
						url: '/subpkg/login/wxLogin'
					})
					return
				}
				
				let param = $api.apiCommonRequestParam
				this.$set(param,'s_id',this.$store.state.s_id)
				this.$set(param, 'item_id',this.item.item_id)
				this.$set(param, 'type','1')
				
				if(this.item.iscollect){
					//已收藏 =>取消收藏
					const { data: res } = await uni.$http.post($api.apiUnCollect, param)
					if (res.code !== '200') return uni.$showMsg()
					if(res.result.status === 1){
						this.item.iscollect = false
					}
				}
				else{
					const { data: res } = await uni.$http.post($api.apiCollect, param)
					if (res.code !== '200') return uni.$showMsg()
					if(res.result.status === 1){
						this.item.iscollect = true
					}
				}
			},
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
		border-radius: 5px;

		.list-info-container{
			padding: 15px 15px 15px;
			.list-avatar{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50rpx;
			}
			.list-name{
				font-size:36rpx;
			}
		}

		.info-right {
			// background-color: yellow;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-right: 10px;

			.tousu {
				margin-top: 5px;
				font-size: 26rpx;
				color: #b4b0b1;
			}
		}
	}

	.middle {
		margin: 10px 10px;
		background-color: white;
		padding: 15px 0;
		display: flex;
		justify-content: space-around;
		border-radius: 5px;

		.icon {
			width: 66rpx;
			height: 66rpx;
			margin-bottom: 5px;
		}

		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 22rpx;
		}
	}

	.yupai-content {
		background-color: white;
		margin: 10px 10px;
		margin-bottom: 0px;
		padding: 10px 10px;
		border-radius: 5px 5px 0 0;

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
		border-radius: 0 0 5px 5px;

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
		border-radius: 5px;

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

			.image-scroll {
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

	.regAvatarList {
		margin: 10px 10px;
		background-color: white;
		padding: 10px 10px;
		border-radius: 5px;

		.title {
			height: 20px;
			border-left: 3px solid #c00000;
			padding-left: 10px;
		}

		.images {
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;

			image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				margin-right: 10px;
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}
	}

	.recommend-list {
		margin: 10px 0px;

		#title {
			line-height: 30px;
			color: rgb(232, 153, 154);
			text-align: center;
		}
	}

	.video-container {
		background-color: white;
		margin: 0px 10px;
	}

	.bottom-container {
		background-color: #fff;
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 130rpx;
		z-index: 999;
		display: flex;
		justify-content: space-between;

		.bottom-left {
			display: flex;
			margin-left: 20px;
			margin-top: 10px;
			height: 70rpx;
			flex: 1;

			.icon_item {
				width: 40px;
				height: 100%;
				display: flex;
				align-items: center;

				.like-count {
					font-size: 20rpx;
					line-height: 22rpx;
					position: relative;
					margin-top: -38rpx;
				}
			}

			image {
				width: 42rpx;
				height: 42rpx;
			}

			// .collect{
			// 	margin-left: 5px;
			// }
		}

		.bottom-right-yuepai {
			height: 70rpx;
			width: 300rpx;
			font-size: 30rpx;
			border-radius: 35rpx;
			margin-right: 20px;
			margin-top: 10px;
			color: #fff;
			line-height: 70rpx;
			text-align: center;
			background: linear-gradient(90deg, #fe8185 0%, $main-theme-color 40%, $main-theme-color 100%);
		}
	}
</style>