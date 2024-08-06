<template name="message">
	<view class="loading-container" v-if="show">
		<!-- <view > -->
			<image class="loading-image" src="/static/icons/loading.gif" mode=""></image>
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		name:"loading",
		data() {
			return {
				// show:true
			};
		},
		// props: {
		//   // 显示加载
		//   show: {
		//     type: Boolean,
		//     default: true,
		//   },
		// },
		
		computed:{
			show(){
				return this.$store.state.isLoading
			}
		},
		
		methods:{
			showLoading: function(){
				this.show = true
			},
			
			hideLoading: function(){
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.loading-container{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		z-index: 1;
		background-color: aqua;
		.loading-image{
			margin-top: calc(50vh - 220rpx);
			width: 350rpx;
			height: 70rpx;
			background-color: yellow;
		}
	}
</style>