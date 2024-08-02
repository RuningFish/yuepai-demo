<template>
	<view class="list">
		<view class="list-item" v-for="(item,index) in dataList" :key="index" @click="gotoUserHomePage(item.to_user_id)">
			<view class="left">
				<image class="list-avatar" :src="item.avatar" mode=""></image>
				<view class="name-container">
					<view class="list-name-sex-container">
						<view class="list-name">{{item.nickname}}</view>
						<image class="list-sex" :src="item.sex === 1 ? '/static/icons/sex_boy.png': '/static/icons/sex_girl.png'" mode=""></image>
					</view>
					<view class="identity-city-container">
						<view class="list-identity-city">{{item.identity}} | {{item.city_name}}</view>
					</view>
				</view>
			</view>
			<view class="right">
				<image class="follow-icon" src="/static/icons/icon_detail_guanzhu_yes.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[]
			};
		},
		
		onLoad() {
			this.getMyFollowUser()
		},
		
		methods:{
			async getMyFollowUser() {
				// if (this.$store.state.s_id === '') {
				// 	return
				// }
				let param = uni.$api.apiCommonRequestParam  
				this.$set(param,'s_id',this.$store.state.s_id)
				const {data : res} = await uni.$http.post(uni.$api.apiMyFollowUser, param)
				// if (res.code !== '200') return uni.$showMsg()
				// if(res.result.status === 1){
				// 	//请求成功
				// 	this.dataList = [...this.followList,...res.result.data.data] 
				// }
				this.dataList = res.data
				console.log('datalist=== ',this.dataList)
			},
			
			gotoUserHomePage(user_id){
				uni.navigateTo({
					url:'/subpkg/userHomePage/userHomePage?user_id='+user_id
				})
			}
		}
	}
</script>
	
<style lang="scss">
	.list{
		padding: 0px $margin-left-right;
		background-color: white;
	}
	.list-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 10rpx;
		border-bottom: 1rpx solid #efefef;
	}
	.left,
	.right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.name-container{
		margin-left: 20rpx;
	}
</style>
