<template>
	<view class="production-container">
		<!-- 选项卡 -->
		<my-tabs ref="myTabs" :currentIndex="selectedIndex" @tabIndexChange="tabIndexChange"
			:tabList="tabList"></my-tabs>
		<view class="list-scroll">
			<!-- 滚动组件 -->
			<swiper class="hor-swiper" :indicator-dots="false" :autoplay="false" :current="selectedIndex" @change="tabChange">
				<swiper-item class="production-swiper-item" v-for="(item,index) in tabList" :key="index">
					<scroll-view class="hide-scrollbar" scroll-y="true" :refresher-triggered="triggered"
						@scrolltolower="scrolltolower" :lower-threshold="100" refresher-enabled="true"
						:refresher-threshold="100" @refresherrefresh="onRefresh" @refresherpulling="onPulling"
						:scroll-anchoring="true">
						<!-- 列表数据 -->
						<view class="production-list">
							<view class="production-list-column" v-for="(item0,index0) in column_count" :key="index0">
								<template v-if="recommendList[selectedIndex]">
									<view class="list-column-item"
										v-for="(item,index) in recommendList[selectedIndex][index0]" :key="index"
										@click="itemClick(item)">
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
								</template>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	<myTabbar currentPath="/pages/production/production"></myTabbar>
	<myLoading></myLoading>  
</template>

<script>
	import myTabbar from '@/components/myTabbar/myTabbar';
	import { $pageLoadMore } from '../../static/mixin/page-load-more';
	export default {
		mixins:[$pageLoadMore],
		comments: {
			myTabbar
		},
		data() {
			return {
				tabList: ['推荐', '同城', '模特', '摄影师', '化妆师', '修图师', '造型师'],
				// 存放数据的数组
				recommendList: [
					[]
				],
				lastTime: [],
				column_count: 2,
			};
		},

		onLoad() {

		},

		methods: {
			//请求对应分类的数据
			async getDataList() {
				let index = this.selectedIndex
				let param = this.getRequestParam(index)
				this.isloading = true
				const {
					data: res
				} = await uni.$http.post(uni.$api.apiGetZuoPinList, param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
				const grouplist = this.dynamicGroupList(this.recommendList[index], res.result.data.data, this
					.column_count)
				this.recommendList[index] = grouplist
				this.lastTime[index] = this.dataList[index].time
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
						s_city: this.$store.state.current_city_code 
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
				uni.$router.gotoDetail(item.item_id + '&type=production')
			},

			tabChange(e) {
				let index = e.target.current || e.detail.current
				if (this.selectedIndex === index) return
				this.$refs.myTabs.itemIndexChange(index)
			},

			//选项卡点击
			tabIndexChange(index) {
				this.tabItemClick(index)
			}
		}
	}
</script>

<style lang="scss">
	.hor-swiper {
		width: 100%;
		height: calc(100vh - 80rpx - 110rpx - constant(safe-area-inset-bottom)*0.4); // 兼容 IOS<11.2
		height: calc(100vh - 80rpx - 110rpx - env(safe-area-inset-bottom)*0.4); // 兼容 IOS>11.2
	}
	.hide-scrollbar{
		height: 100%;
	}
	page {
		height: 100%;
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
		background-color: #fff;
		white-space: pre-wrap;
	}

	.production-item-info {
		margin-top: 20rpx;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
		padding-bottom: 16rpx;
		display: flex;
		justify-content: space-between;

		.production-item-info-left {
			display: flex;

			.info-content {
				margin-left: 16rpx;
				font-size: 20rpx;
				color: lightgrey;

				.nickname {
					width: 110rpx;
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
		padding-top: 8px;
		padding-bottom: 10px;
		columns: 2;
		column-gap: $list-row-col-spacing;
		margin-left: $margin-left-right;
		margin-right: $margin-left-right;

		.production-list-column {
			// width: 350rpx;
			flex: 1;
			position: relative;

			.list-column-item {
				background-color: white;
				border-radius: $border-radius;
				margin-bottom: $list-row-col-spacing;
			}

			.image-cover {
				width: 100%;
				border-radius: 5px;
			}

			.video-icon {
				width: 20px;
				// background-color: aqua;
				position: absolute;
				margin-left: 290rpx;
				margin-top: 10px;
				z-index: 999;
			}
		}
	}
</style>