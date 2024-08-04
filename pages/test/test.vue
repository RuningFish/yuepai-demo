<template>
	<view class="page-container">
		<view class="center-tab">
			<view class="center-tab-item" v-for="(item,index) in tabList" :key="index" @click="tabItemClick(index)">
				<view :class="selectedIndex === index ? 'active' : ''"> {{item}}</view>
			</view>
		</view>
		<!-- 列表数据 -->
		<swiper class="hor-swiper" :current="selectedIndex" :indicator-dots="false" :autoplay="false" @change="tabChange">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<scroll-view id="200" class="list-scroll" :scroll-y="true" @scrolltolower="scrolltolower" :lower-threshold="100" :scroll-anchoring="true"
					refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100" @refresherrefresh="onRefresh" @refresherpulling="onPulling">
					<view v-if="dataList[index] && dataList[index].list">
						<view v-for="(item1,index1) in dataList[index].list" :key="index1">
							<homePageCardItem :item="item1" @itemClick="itemClick(item1)"
								@previewImage="previewImage"></homePageCardItem>
						</view>
					</view>
					<view class="nomore-container" v-if="dataList[index] && dataList[index].list">
						<template v-if="dataList[index].list.length > 0 && !dataList[index].hasNomore">
							<view class="text">已全部加载完毕</view>
						</template>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<view class="bottom">
			这是底部固定的view
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中的下标 //默认约拍列表
				selectedIndex: 0,
				tabList: ['约拍', '作品'],
				//数据列表：约拍-作品
				dataList: [],
				isloading: false,
				pull: false,
				triggered:true
			};
		},

		onReady() {
			console.log('onReady-----')
		},

		onLoad(options) {
			this.initData()
			this.getMyCollect()
			
		},

		methods: {
			
			//初始化数据
			initData() {
				for (let i = 0; i < this.tabList.length; i++) {
					let obj = this.tabItemData()
					this.dataList.push(obj)
				}
			},
			
			tabItemData() {
				let item = {
					list: [], //列表数据
					time: '', //加载更多使用，为上一条数据的time
					hasNomore: true //是否还有更多数据
				}
				return item
			},
			
			itemIndexChange(index){
				if (this.selectedIndex !== index) {
					this.selectedIndex = index
				}
			},

			tabItemData() {
				let item = {
					list: [], //列表数据
					time: '', //加载更多使用，为上一条数据的time
					hasNomore: true //是否还有更多数据
				}
				return item
			},

			//获取收藏信息
			async getMyCollect() {
				let param = uni.$api.apiCommonRequestParam
				let type = this.selectedIndex === 0 ? '1' : '2'
				let time = this.dataList[this.selectedIndex].time
				this.$set(param, 'type',type)
				this.$set(param, 's_id',this.$store.state.s_id)
				this.$set(param, 'time',time)
				const { data: res } = await uni.$http.post(uni.$api.apiMyCollect, param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
			},
			
			//选项卡点击
			tabItemClick(index) {
				if (index === this.selectedIndex) return
				this.selectedIndex = index
				let dataList = this.dataList[index].list
				if (dataList !== undefined || dataList !== null || dataList.length === 0) {
					//数据为空时请求数据
					this.scrolltolower()
				}
				console.log('tabItemClick')
			},

			tabChange(e) {
				let index = e.target.current || e.detail.current
				this.tabItemClick(index)
			},

			onRefresh() {
				this.pull = true
				this.triggered = true
				this.dataList[this.selectedIndex].hasNomore = true
				this.dataList[this.selectedIndex] = this.tabItemData()
				if (this.isloading) return
				console.log('onRefresh 2====', this.dataList)
				this.scrolltolower()
			},

			//上拉加载
			scrolltolower() {
				if (this.isloading || !this.dataList[this.selectedIndex].hasNomore) return
				this.getMyCollect()
			},

			stopLoading(res) {
				if (this.pull) {
					this.dataList[this.selectedIndex] = this.tabItemData()
				}
				this.triggered = false
				this.isloading = false
				this.pull = false
				//将新请求到的数据加到原数据中
				this.dataList[this.selectedIndex].list = [...this.dataList[this.selectedIndex].list, ...res.result.data
					.data]
				//判断是否还有更多数据
				let nextTime = res.result.data.nexttime
				let list = this.dataList[this.selectedIndex].list
				let time = list[list.length - 1].updatetime
				//
				this.dataList[this.selectedIndex].hasNomore = (nextTime === time && res.result.data.count !== res.result.data.data.length) ? false :true
				this.dataList[this.selectedIndex].time = nextTime
			},

			//跳转到详情页面
			itemClick(item) {
				var url = '/subpkg/detail/detail?item_id=' + item.item_id
				if (this.selectedIndex === 1) {
					url += '&type=production'
				}
				uni.navigateTo({
					url: url
				})
			},
			//查看图片
			previewImage(index, images) {
				uni.previewImage({
					current: index,
					urls: images.map(img => img.bigurl)
				})
			}
		}
	}
</script>

<style lang="scss">
	// .page-container{
	// 	background-color: yellow;
	// }
	// .center-tab{
	// 	background-color: greenyellow;
	// }
	.hor-swiper{
		// background-color: brown;
		height: calc(100vh - 80rpx - 50px);
	}
	.list-scroll{
		height: 100%;
	}
	.bottom{
		height: 50px;
		background-color: bisque;
		text-align: center;
		z-index: 99;
		line-height: 50px;
	}
	.last{
		border:1px solid red;
	}

</style>