import { $api } from '../../request/api.js'
const mixin = {
	data() {
		return {

		}
	},

	methods: {
		//关注用户
		async followUser(to_user_id, callBack) {			
			if (this.$store.state.s_id === '') {
				//跳转登录页面
				uni.navigateTo({
					url: '/subpkg/login/wxLogin'
				})
			}
			else {
				let param = uni.$api.apiCommonRequestParam
				this.$set(param,'s_id',this.$store.state.s_id)
				this.$set(param, 'to_user_id',to_user_id)
				const {
					data: res
				} = await uni.$http.post($api.apiFollowUser, param)
				if (res.code !== '200') return uni.$showMsg()
				if(res.result.status === 1){
					callBack && callBack()
					uni.showToast({
						title: '已关注',
						icon: 'success'
					})
				}
			}
		},
		//取消关注 
		 unFollowUser(to_user_id, callBack) {			
			uni.showModal({
				cancelText: '取消',
				confirmText: '确定',
				title: '温馨提示',
				content: '确定要取消关注对方吗？',
				success: function(res){
					if (res.confirm) {
						this.unFollow(to_user_id,callBack)
					} 
				}.bind(this)
			})
		},
		
		async unFollow(to_user_id,callBack){
			let param = uni.$api.apiCommonRequestParam
			this.$set(param,'s_id',this.$store.state.s_id)
			this.$set(param, 'to_user_id',to_user_id)
			const {data: res} = await uni.$http.post($api.apiUnFollowUser, param)
			if (res.code !== '200') return uni.$showMsg()
			if(res.result.status === 1){
				callBack && callBack()
				uni.showToast({
					title: '取消成功',
					icon: 'success'
				})
			}
		}
	}
}

export const $mixin = mixin