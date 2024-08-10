<template>
	<view>
		<view class="list">
			<view class="list-item" v-for="(item,index) in dataList" :key="index" @click="gotoPublishContent(index)">
				<view>
					<image class="item-image" :src="item.icon_url" mode="widthFix"></image>
				</view>
				<view class="item-title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: []
			};
		},

		onLoad() {
			this.getPubInfo()
			uni.setNavigationBarTitle({
				title: '选择约拍对象'
			})
		},

		methods: {
			//获取约拍对象列表
			async getPubInfo() {
				// 
				let param = Object.assign({}, uni.$api.apiCommonRequestParam)
				this.$set(param, 's_id', this.$store.state.s_id)
				const {
					data: res
				} = await uni.$http.post(uni.$api.apiGetPubInfo, param)
				if(res.code !== '200') return uni.$showMsg()
				if(res.result.status === 1){
					this.dataList = res.result.data.types
				}
			},
			
			gotoPublishContent(index){ 
				let obj = this.dataList[index]
				let param = `?title=${obj.title}&type=${obj.type}`
				if(obj.show_tips === 1){
					uni.showModal({
						title:' 温馨提示',
						content:obj.before_tips,
						showCancel:true,
						confirmText:'确定',
						cancelText:'取消',
						success(res) {
							if(res.confirm){
								uni.$router.gotoPublishContent(param)
							}
						}
					})
				}
				else{
					uni.$router.gotoPublishContent(param)
					
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: white;
	}

	.list {
		padding: 30rpx;
		columns: 2;
		column-gap: 30rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.list-item {
		// flex: 1;
		width: 330rpx;
		height: 330rpx;
		// background-color: greenyellow;
		margin-bottom: 25rpx;

		.item-image {
			// width: 330rpx;
			// height: 100rpx;
			width: 100%;
			position: relative;
			margin-bottom: 0;
		}

		.item-title {
			// width: 100%;
			font-size: 38rpx;
			font-weight: 400;
			text-align: center;
			position: relative;
			margin-top: -100rpx;
			// background-color: blue;
		}
	}
</style>