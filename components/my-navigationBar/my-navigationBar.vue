<template>
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="logo">
      <!-- <image class="logo-image" src="@/static/images/logo.jpg"></image> -->
      <text class="logo-title">DOS圆梦大家庭</text>
      <text class="logo-text">诚挚缘分 成就梦想</text>
    </view>
  </view>
</template>

<script>
	export default {
		name:"my-navigationBar",
		data() {
			return {
				// 获取屏幕边界到安全区域距离
				safeAreaInsets:0 
			};
		},
		onLoad() {
			this.safeAreaInsets = uni.getSystemInfoSync()
		}
	}
</script>

<style lang="scss">
.navbar {
  // background-image: url(@/static/images/navigator_bg.png);
  background-size: cover;
  display: flex;
  .logo {
    display: flex;
    align-items: center;
    height: 86rpx;
    padding: 20rpx;
    .logo-image {
      width: 40rpx;
      height: 40rpx;
    }
    .logo-title {
      font-size: 32rpx;
      color: #fff;
      font-weight: bold;
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
    }
  }
}
</style>

