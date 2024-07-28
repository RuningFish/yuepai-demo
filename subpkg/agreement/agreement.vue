<template>
	<view>
		<!-- <rich-text :nodes="html"></rich-text> -->
		<text v-html="htmlStr"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				htmlStr: '1234567<text style="color:red;">888</text>9'
			};
		},

		onLoad(options) {
			this.requestHtmlData(options.type)
		},

		methods: {
			async requestHtmlData(str) {
				//用户协议和隐私政策共用页面 1协议 2隐私
				let url = ''
				//字符串分割
				let arr = str.split('=')
				let type = arr[0]
				if(type === '1'){
					url = 'https://m.mdyuepai.com/m/about/agreement'
				}
				else if(type === '2'){
					url = 'https://m.mdyuepai.com/m/about/private'
				}
				console.log('url ==== ',url,arr)
				if(url === '') return
				uni.showLoading({
					title:'加载中...'
				})
				uni.request({
					method:'GET',
					url:url
					// success(res){
					// 	this.htmlStr = res.data
					// 	console.log('000000 = ',res.data)
					// },
					// fail() {
						
					// },
					// complete() {
					// 	uni.hideLoading()
					// }
				})
				.then(res => {
					this.htmlStr = res.data
					console.log('000000 = ',res.data)
					uni.hideLoading()
				})
				.catch(err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">

</style>