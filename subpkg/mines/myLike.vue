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
					<view class="" v-if="dataList[index] && dataList[index].no_data">
						<no-data no_data_text="当前暂无点赞～"></no-data> 
					</view>
					<view class="nomore-container" v-if="dataList[index] && dataList[index].list">
						<template v-if="dataList[index].list.length > 0 && !dataList[index].hasNomore">
							<view class="text">已全部加载完毕</view>
						</template>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { $pageLoadMore } from '../../static/mixin/page-load-more.js'
	export default {
		mixins:[$pageLoadMore],
		data() {
			return {
				
			};
		},
		
		onLoad(options) {
			let that = this
			uni.$on('updateMinesDataList',function(){
				//重置数据
				that.dataList[that.selectedIndex] = that.tabItemData()
				that.getDataList()
			})
		},
		
		onUnload() {
			uni.$off('updateMinesDataList')
		},
		
		methods:{
		  async	getDataList(){
				let param = this.getRequestParam()
				const { data: res } = await uni.$http.post(uni.$api.apiMyLike, param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
			},
			
			itemClick(item){
				var item_id = item.item_id
				if (this.selectedIndex === 1) {
					item_id += '&type=production'
				}
				uni.$router.gotoDetail(item_id)
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
	.hor-swiper{
		height: calc(100vh - 80rpx);
	}
	.list-scroll{
		height: 100%;
	}
</style>
