<template>
	<!-- <view class="loading-container">
		<image src="/static/icons/loading.gif" mode=""></image>
	</view> -->
	<view
	  class="q-loading"
	  :style="{'backgroundColor': bgColor}"
	>
	  <view class="q-loading-inner">
	    <slot name="load">
	      <!-- 图标部分 -->
	      <view
	        :class="{'q-loading-icon': true, 'pause': !show && !showIcon}"
	        v-if="showIcon"
	      >
	        <slot name="icon">
	          <!-- 圆环 -->
	          <view
	            class="q-loading-item q-loading-circle"
	            :style="{'width': borSize +'rpx', 'height': borSize +'rpx', 'borderWidth': borWin + 'rpx', 'borderColor': borColor, 'borderLeftColor': bordActiveColor}"
	            v-if="iconName == 'circle'"
	          >
	          </view>
	          <!-- 呼吸 -->
	          <view
	            class="q-loading-item q-loading-circle-breath"
	            v-if="iconName == 'circle-breath'"
	          >
	          </view>
	          <!-- 旋转 -->
	          <view
	            class="q-loading-item q-loading-circle-round"
	            v-if="iconName == 'circle-round'"
	          >
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	            <view
	              class="loading-round"
	              :style="{'backgroundColor': bordActiveColor}"
	            ></view>
	          </view>
	        </slot>
	      </view>
	      <!-- 提示文本 -->
	      <view
	        class="q-loading-text"
	        v-if="showText"
	        :style="{'color': textColor, 'fontSize': textSize + 'rpx'}"
	      >
	        <slot name="text"> {{ text }} </slot>
	      </view>
	    </slot>
	  </view>
	</view>
	
	<view class="navbar">
		<view class="fixed-content">
	        <!-- 状态栏高度 -->
			<view :style="{'height': statusBarHeight + 'px'}"></view>
	        <!-- 导航栏高度 -->
			<view class="bar-content" :style="{'height': navbarHeight+'px'}">
				<slot>
					<image @tap="navigateBack()" class="nav-left" src="/static/img/common/arrow-left.png" mode=""></image>
					<view name="title" class="nav-title">12345</view>
				</slot>
			</view>
		</view>
		<!-- 占位高度，状态栏高度+导航栏高度，父组件就不需要计算导航栏高度 -->
		<view :style="{'height': statusBarHeight + navbarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"loading",
		data() {
			return {
				
			};
		},
		props: {
		  // 显示加载
		  show: {
		    type: Boolean,
		    default: true,
		  },
		  // 背景色
		  bgColor: {
		    type: String,
		    default: "#fff",
		  },
		  // 显示图标
		  showIcon: {
		    type: Boolean,
		    default: true,
		  },
		  // 名称
		  iconName: {
		    type: String,
		    default: "circle",
		  },
		  // 大小
		  borSize: {
		    type: Number,
		    default: 60,
		  },
		  // 边框粗细
		  borWin: {
		    type: Number,
		    default: 8,
		  },
		  // 颜色
		  borColor: {
		    type: String,
		    default: "#e3e3e3",
		  },
		  // 活动颜色
		  bordActiveColor: {
		    type: String,
		    default: "#24afd6",
		  },
		  // 显示文本
		  showText: {
		    type: Boolean,
		    default: true,
		  },
		  // 文本内容
		  text: {
		    type: String,
		    default: "加载中...",
		  },
		  // 文本颜色
		  textColor: {
		    type: String,
		    default: "#555",
		  },
		  // 文本大小
		  textSize: {
		    type: Number,
		    default: 20,
		  },
		}
	}
</script>

<style lang="scss">
	.loading-container{
		top: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: aqua;
	}
	
	.q-loading {
	  position: fixed;
	  top: 0;
	  left: 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  box-sizing: border-box;
	  padding: 10rpx;
	  width: 100%;
	  height: 100vh;
	  .q-loading-inner {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    .q-loading-icon {
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      margin-bottom: 10rpx;
	      width: 100rpx;
	      height: 100rpx;
	      .q-loading-circle {
	        border-radius: 50%;
	        border-style: solid;
	        animation: loadingCircle 1s linear infinite;
	      }
	      .q-loading-circle-breath {
	        box-shadow: 0 0 0 0 rgb(204, 73, 152);
	        height: 36px;
	        width: 36px;
	        border-radius: 50%;
	        animation: loadingCircleBreath 1s linear infinite;
	      }
	      .q-loading-circle-round {
	        position: relative;
	        width: 75rpx;
	        height: 75rpx;
	        .loading-round {
	          position: absolute;
	          width: 26rpx;
	          height: 26rpx;
	          border-radius: 50%;
	          animation: loadingCircleRound 3s ease infinite;
	          transform-origin: 120% 80rpx;
	          &.loading-round:nth-child(1) {
	            z-index: 7;
	          }
	          &.loading-round:nth-child(2) {
	            height: 12px;
	            width: 12px;
	            animation-delay: 0.2s;
	            z-index: 6;
	          }
	          &.loading-round:nth-child(3) {
	            height: 11px;
	            width: 11px;
	            animation-delay: 0.4s;
	            z-index: 5;
	          }
	          &.loading-round:nth-child(4) {
	            height: 10px;
	            width: 10px;
	            animation-delay: 0.6s;
	            z-index: 4;
	          }
	          &.loading-round:nth-child(5) {
	            height: 9px;
	            width: 9px;
	            animation-delay: 0.8s;
	            z-index: 3;
	          }
	          &.loading-round:nth-child(6) {
	            height: 8px;
	            width: 8px;
	            animation-delay: 1s;
	            z-index: 2;
	          }
	          &.loading-round:nth-child(7) {
	            height: 7px;
	            width: 7px;
	            animation-delay: 1.2s;
	            z-index: 1;
	          }
	        }
	      }
	      &.pause {
	        .q-loading-item {
	          animation-play-state: paused;
	        }
	      }
	    }
	  }
	}
	
	// 圆环
	@keyframes loadingCircle {
	  0% {
	    transform: rotate(0);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	
	// 呼吸
	@keyframes loadingCircleBreath {
	  0% {
	    transform: scale(0.3);
	    box-shadow: 0 0 0 0 rgba(36, 175, 214, 60%);
	  }
	
	  60% {
	    transform: scale(0.5);
	    box-shadow: 0 0 0 56rpx rgba(36, 175, 214, 0%);
	  }
	
	  100% {
	    transform: scale(0.3);
	    box-shadow: 0 0 0 0 rgba(36, 175, 214, 0%);
	  }
	}
	
	// 转动
	@keyframes loadingCircleRound {
	  to {
	    transform: rotate(1turn);
	  }
	}
</style>