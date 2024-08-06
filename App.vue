<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			let that = this
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					that.$store.state.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						that.$store.state.CustomBar = e.statusBarHeight + 50;
					} else {
						that.$store.state.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					that.$store.state.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					// Vue.prototype.Custom = custom;
					that.$store.state.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 4;
					// #endif		
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/static/css/variable.scss';
	@import '/static/css/common.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: $background-color;
		width: 100vw;
		height: 100vh;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
