<template>
	<myTabbar currentPath="/pages/publish/publish"></myTabbar>
</template>

<script>
	import myTabbar from '@/components/myTabbar/myTabbar';
	export default {
		comments:{
			myTabbar
		},
		data() {
			return {
				tabBars: [{
					name: '待收货',
					id:1
				}, {
					name: '待付款',
					id:2
				}, {
					name: '待评价',
					id:3
				}],
				banner:[],
				recommendList:[],
				imageWidth:0
			};
		},
		onLoad() {
			this.getBanner()
			this.getRecommendList()
			
			const info = uni.getSystemInfoSync()
			this.imageWidth = (info.windowWidth-50)/3
			console.log('text---',this.imageWidth);
		},
		
		methods:{

		},
	}
</script>

<style lang="scss">

</style>