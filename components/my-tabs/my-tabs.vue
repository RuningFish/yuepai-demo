<template>
	<scroll-view class="tab-scroll" scroll-x="true">
		<view :style="{'line-height':tabHeight + 'rpx'}" class="tab-item"  v-for="(item,index) in tabList" :key="index" @click="itemIndexChange(index)">
			<view :class="selectedIndex === index ? 'active-title' : 'normal-title'"> {{item}}</view>
				<!-- <view class="bottom-line" v-if="index === selectedIndex"></view> -->
		</view>
	</scroll-view>
	<!-- <swiper :indicator-dots="false" :autoplay="false" :current="selectedIndex" @change="tabChange">
		<swiper-item v-for="(item,index) in tabList" :key="index">
			<view class="swiper-item">这是第{{index}}个页面</view>
		</swiper-item>
	</swiper> -->
</template>

<script>
// import { number } from 'prop-types';
	export default {
		name: "my-tabs",

		props: { 
			//选项卡列表
			tabList: {
				type: Array,
				default: ['选项卡1', '选项卡2', '选项卡3']
			},
			//选中的下标
			currentIndex: {
				type: Number,
				default: 0
			},
			
			tabHeight:{
				type:Number,
				default:80
			}
		},

		data() {
			return {
				// if (tabList.length === 0){
				// tabList : ['选项卡1','选项卡2','选项卡3']
				// }
				selectedIndex:this.$props.currentIndex !== 0 ?this.$props.currentIndex:0
			};
		},

		methods: {
			// tabChange(e){
			// 	let index = e.target.current || e.detail.current
			// 	this.itemIndexChange(index)
			// },
			
			itemIndexChange(index) {
				if (this.selectedIndex !== index) {
					this.selectedIndex = index
				}
				this.$emit('tabIndexChange',index)
			}
		}
	}
</script>

<style lang="scss">
	.tab-scroll {
		background-color: white;
		width: 100%;
		// height: 40px;
		white-space: nowrap;
		// display: flex;
		// justify-content: center;
		// align-items: center;
	}

	.tab-item {
		font-size: 28rpx;
		color: rgb(205, 205, 205);
		// line-height: 40px;
		display: inline-block;
		margin-left: 10px;
		margin-right: 10px;
		flex-wrap: nowrap;
		align-items: center;
	}

	.active-title {
		font-size: 30rpx;
		color: #333333;
		border-bottom: 2px solid $main-theme-color;
	}

	.tab {
		width: 100%;
		display: flex;
	}
	
</style>