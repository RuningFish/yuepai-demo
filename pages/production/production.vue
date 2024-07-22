<template>
	<view class="production-container">
		<!-- 选项卡 -->
		<my-tabs :currentIndex="selectedIndex" @tabIndexChange="tabIndexChange" :tabList="tabList"></my-tabs>
		<!-- 滚动组件 -->
		<swiper :indicator-dots="false" :autoplay="false" :current="selectedIndex" @change="tabChange"
			:style="{height:windowHeight +'px'}">
			<swiper-item class="production-swiper-item" v-for="(item,index) in tabList" :key="index">
				<scroll-view scroll-y="true" class="list-scroll" :style="{height:windowHeight +'px'}"
					:refresher-triggered="triggered" @scrolltolower="scrolltolower" :lower-threshold="100"
					refresher-enabled="true" :refresher-threshold="100" @refresherrefresh="onRefresh"
					@refresherpulling="onPulling" :scroll-anchoring="true">
					<!-- 列表数据 -->
					<view class="production-list">
						<view class="production-list-column" v-for="(item0,index0) in column_count" :key="index0">
							<view class="list-column-item" v-for="(item,index) in recommendList[selectedIndex][index0]"
								:key="index" @click="itemClick(item)">
								<!-- 视频图片有先显示视频图片 -->
								<block v-if="item.video_cover !== null && item.video_cover.length > 0">
									<view class="video-icon">
										<uni-icons type="videocam" size="25" color="#fff"></uni-icons>
									</view>
									<image class="image-cover" :src="item.video_cover" mode="widthFix"></image>
								</block>
								<block v-for="(item2,index2) in item.imgUrl" :key="index2" v-else>
									<image class="image-cover" :src="item2.bigurl" mode="widthFix"
										v-show="index2 === 0"></image>
								</block>
								<rich-text class="content">{{item.content}}</rich-text>
								<view class="production-item-info">
									<view class="production-item-info-left">
										<view class="avatar">
											<image :src="item.avatar"></image>
										</view>
										<view class="info-content">
											<view class="top">
												<view class="nickname">{{item.nickname}}</view>
											</view>
											<view class="bottom">
												<view>{{item.identity}} | {{item.city_name}}</view>
											</view>
										</view>
									</view>
									<view class="production-item-info-right">{{item.uonlinetime}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['推荐', '同城', '模特', '摄影师', '化妆师', '修图师', '造型师'],
				selectedIndex: 0,
				// 存放数据的数组
				recommendList: [
					[]
				],
				//可滚动的区域
				windowHeight: 0,
				isloading: false,
				//加载更多使用，为上一条数据的time
				lastTime: [],
				triggered: true,
				pull: false,
				//列数
				column_count: 2,

			};
		},

		onLoad() {
			const info = uni.getSystemInfoSync()
			this.windowHeight = info.windowHeight - 40

			//获取列表数据
			this.apiGetList(this.selectedIndex)
		},

		methods: {
			//请求对应分类的数据
			async apiGetList(index) {
				let param = this.getRequestParam(index)
				this.isloading = true
				const {
					data: res
				} = await uni.$http.post('/appapi/zuopin/apiGetList', param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading()
				// this.recommendList[index] = [...this.recommendList[index], ...res.result.data.data]
				const grouplist = this.dynamicGroupList(this.recommendList[index], res.result.data.data, this
					.column_count)
				this.recommendList[index] = grouplist
				this.lastTime[index] = res.result.data.nexttime
				console.log(this.tabList[index], "-----111", this.recommendList[index]);
			},

			getRequestParam(index) {
				let title = this.tabList[index]
				let param = {
					has_video: 1,
					time: this.lastTime[index] || ''
				}

				if (index === 1) { //'同城'
					param = {
						has_video: 1,
						time: this.lastTime[index] || '',
						s_city: this.$store.state.current_city_code//'140200'
					}
				} else if (index >= 1) {
					param = {
						has_video: 1,
						time: this.lastTime[index] || '',
						s_identity: title
					}
				}

				return param
			},

			/**将请求到的数据分为column_count个数组
			 *	@param groupList 已经分好的组数据
			 *   @param data 未组的数据
			 *  @param column 要分的组数 
			 */
			dynamicGroupList(groupList, data, column) {
				if (column <= 0) return "列数必须大于0"
				//构造一个包含column元素的数组
				var group = groupList
				if (group === undefined || group === null || group.length === 0) {
					group = []
					for (let i = 0; i < column; i++) {
						group.push([])
					}
				}

				for (let i = 0; i < data.length; i++) {
					let index = i % column
					//将原始数据添加到对应的列数组中
					group[index].push(data[i])
				}

				return group
			},

			//跳转到详情页面
			itemClick(item) {
				console.log('作品跳转到详情页面---', item.item_id);
				uni.navigateTo({
					url: '/subpkg/detail/detail?item_id=' + item.item_id + '&type=production'
				})
			},

			tabChange(e) {
				let index = e.target.current || e.detail.current
				console.log('tabChange---');
				if (this.selectedIndex === index) return
				this.tabIndexChange(index)
			},

			//选项卡点击
			tabIndexChange(index) {
				this.triggered = false
				this.selectedIndex = index
				let dataList = this.recommendList[index]

				if (dataList === undefined || dataList === null) {
					dataList = []
					this.recommendList[index] = dataList
				}

				if (dataList !== undefined && dataList !== null && dataList.length === 0) {
					//数据为空时请求数据
					this.apiGetList(index)
				}
			},

			onRefresh() {
				this.pull = true
				this.triggered = true
				this.lastTime[this.selectedIndex] = ''
				console.log('onRefresh+++', 'data');
				if (this.isloading) return
				console.log('onRefresh---', 'data');
				this.scrolltolower()
			},

			onPulling() {

			},

			//上拉加载
			scrolltolower() {
				console.log('loadMore-----', 'data');
				if (this.isloading) return
				this.apiGetList(this.selectedIndex)
			},

			stopLoading() {
				if (this.pull) {
					console.log('stopLoading---', this.pull);
					this.recommendList[this.selectedIndex] = []
				}
				this.triggered = false
				this.isloading = false
				this.pull = false
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.production-container {
		margin: 10px;
	}

	.content {
		padding: 10rpx 10rpx;
		font-size: 26rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		min-height: 40rpx;
		max-height: 105rpx;
		// background-color: aqua;
		white-space: pre-wrap;
	}

	.production-item-info {
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
		padding-bottom: 8px;
		display: flex;
		justify-content: space-between;

		.production-item-info-left {
			display: flex;

			.info-content {
				margin-left: 16rpx;
				font-size: 20rpx;
				color: lightgrey;

				.nickname {
					width: 130rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #333333;
				}
			}
		}

		image {
			width: 66rpx;
			height: 66rpx;
			border-radius: 33rpx;
		}

		.production-item-info-right {
			font-size: 20rpx;
			color: lightgrey;
			margin-right: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	// }

	.production-list {
		display: flex;
		justify-content: space-between;
		.production-list-column {
			width: 350rpx;
			position: relative;
			// background-color: yellow;

			.list-column-item {
				background-color: white;
				border-radius: 5px;
				// margin-bottom: 0;
			}

			.image-cover {
				width: 100%;
				border-radius: 5px;
			}
			
			.video-icon{
				width: 20px;
				// background-color: aqua;
				position: absolute;
				margin-left: 290rpx;
				margin-top :10px;
				z-index: 999;
			}
		}
	}

	.production-item-info {
		// background-color: aqua;
		// margin-bottom: 10px;
	}
</style>