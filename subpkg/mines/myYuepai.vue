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
					refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100" @refresherrefresh="onRefresh">
					<view v-if="dataList[index] && dataList[index].list">
						<view v-for="(item1,index1) in dataList[index].list" :key="index1">
							<homePageCardItem :item="item1" @itemClick="itemClick(item1)"
								@previewImage="previewImage"></homePageCardItem>
						</view>
					</view>
					<view class="" v-if="dataList[index] && dataList[index].no_data"> 
						<no-data no_data_text="当前暂无约拍～"></no-data> 
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
	import { $pageLoadMore } from '../../static/mixin/page-load-more';
	export default { 
		mixins:[$pageLoadMore],
		data() {
			return {
				tabList:['全部','展示中','已关闭','审核失败']
			};
		},

		onLoad(options) {
			
		},
		
		onUnload() {
			
		},
		
		methods: {
		  async	getDataList(){
				let param = Object.assign({},uni.$api.apiCommonRequestParam)
				this.$set(param, 's_id',this.$store.state.s_id)
				var status = 'all'
				if(this.selectedIndex === 1){
					status = 'opening'
				}
				else if(this.selectedIndex === 2){
					status = 'closed'
				}
				else if(this.selectedIndex === 3){
					status = 'audit_fail'
				}
				this.$set(param, 'status',status)
				const { data: res } = await uni.$http.post(uni.$api.apiMyYuepai, param)
				if (res.code !== '200') return uni.$showMsg()
				this.stopLoading(res)
			},
			
			itemClick(item){
				let item_id = item.item_id
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
	
	.center-tab{
		padding: 0px 20rpx;
	}
</style>