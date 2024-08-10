<template>
	<view class="container">
		<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;padding-top: 200rpx;">
			<image src="/static/icons/icon_no_data.png" mode="widthFix"></image>
			<text>{{no_data_text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"no-data",
		data() {
			return {
				
			};
		},
		
		props: {
			no_data_text: {
				type:String,
				default:'暂无数据'
			}
		}
	}
</script>

<style lang="scss">
.container{
	image{
		width: 160rpx;
		height: 160rpx;
	}
	
	text{
		margin-top: 40rpx;
	}
}
</style>