<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		
		onLoad(options) {
			this.url = options.url
			// uni.setNavigationBarTitle({
			// 	title:options.title
			// })
		}
	}
</script>

<style lang="scss">

</style>
