<template>
	<scroll-view class="list-scroll" :scroll-y="true" @scrolltolower="scrolltolower" :lower-threshold="30" :scroll-anchoring="true"
					refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100" @refresherrefresh="onRefresh">
		<view class="list-item" v-for="(item,index) in followList" :key="index" @click="gotoUserHomePage(item.to_user_id)">
			<view class="left">
				<image class="list-avatar" :src="item.avatar" mode=""></image>
				<view class="name-container">
					<view class="list-name-sex-container">
						<view class="list-name">{{item.nickname}}</view>
						<image class="list-sex" :src="item.sex === 1 ? '/static/icons/sex_boy.png': '/static/icons/sex_girl.png'" mode=""></image>
					</view>
					<view class="identity-city-container">
						<view class="list-identity-city">{{item.identity}} | {{item.city_name}}</view>
					</view>
				</view>
			</view>
			<view class="right">
				<image class="follow-icon" src="/static/icons/icon_detail_guanzhu_yes.png" mode=""></image>
			</view>
		</view>
		<view class="nomore-container" v-if="!hasNomore">
			<view class="text">已全部加载完毕</view>
		</view>
	</scroll-view>
</template>

<script>
	import { $pageLoadMore } from '../../static/mixin/page-load-more';
	export default {
		mixins:[$pageLoadMore],
		data() {
			return {
				followList:[],
				time:'',
				hasNomore:true
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
			async getDataList() {
				console.log('getDataList===========')
				let param = uni.$api.apiCommonRequestParam  
				this.$set(param,'s_id',this.$store.state.s_id)
				this.$set(param,'time',this.time)
				const {data : res} = await uni.$http.post(uni.$api.apiMyFollowUser, param)
				this.stopLoading(res)
				this.followList = this.dataList[0].list
				this.time = this.dataList[0].time
				this.hasNomore = this.dataList[0].hasNomore
			},
			
			gotoUserHomePage(user_id){
				uni.$router.gotoUserHomePage(user_id)
			}
		}
	}
</script>
	
<style lang="scss">
	.list-scroll{
		background-color: white;
		height: 100%;
		width: 100%;
	}
	.list-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx $margin-left-right;
		border-bottom: 1rpx solid #efefef;
	}
	.list-name{
		max-width: 600rpx;
	}
	.left,
	.right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.name-container{
		margin-left: 20rpx;
	}
</style>
