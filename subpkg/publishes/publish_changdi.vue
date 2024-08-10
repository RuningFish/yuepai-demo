<template>
	<view class="container">
		<image class="bg-image" :src="bg_image" style="width: 100%;" mode="widthFix"></image>
		<view class="bottom">
			<view class="bottom-button" :style="{'background-color': nav_bgColor}">
				{{nav_title === '发布场地'? '打开美影云': '打开模卡'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav_title:'发布场地',
				nav_bgColor:'#ff2c51',
				bg_image:'/static/icons/icon_area_release.png'
			};
		},
		
		onLoad(options) {
			console.log('changdi-----',options)
			if(options.type === '3'){
				//模卡演艺
				this.nav_title = '模卡演艺'
				this.nav_bgColor = '#fae827'
				this.bg_image = '/static/icons/icon_go_moka.png'
			}
			
			
			uni.setNavigationBarColor({
				frontColor: "#000000",
				backgroundColor:this.nav_bgColor
			})
			uni.setNavigationBarTitle({
				title:this.nav_title
			})
		}
	}
</script>

<style lang="scss">
.container{
	width: 100%;
	height: 100%;
	background-color: white;
}

.bottom{
	// background-color: blue;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 700rpx;
	width: 100%;
}
.bottom-button{
	width: 400rpx;
	height: 70rpx;
	text-align: center;
	color: #fff;
	font-size: 32rpx;
	line-height: 70rpx;
	border-radius: 35rpx;
}
</style>
