const router = {

	//跳转到详情页
	gotoDetail(item_id){
		let url = '/subpkg/detail/detail?item_id=' + item_id
		this.navigateTo(url)
	},

	//跳转到网页
	gotoWebView(param){
		let url = '/subpkg/webview/webview?url=' + param
		this.navigateTo(url)
	},
	
	//个人主页
	gotoUserHomePage(user_id){
		let url = '/subpkg/userHomePage/userHomePage?user_id=' + user_id
		this.navigateTo(url)
	},

	//wx登陆页面
	gotoWxLogin(){
		let url = '/subpkg/login/wxLogin'
		this.navigateTo(url)
	},

	//手机号码登录
	gotoPhoneLogin(){
		let url = '/subpkg/login/phoneNumberLogin'
		this.navigateTo(url)
	},

	//关于页面
	gotoAbout(){
		let url = '/subpkg/about/about'
		this.navigateTo(url)
	},
	
	//我的收藏
	gotoMyCollect(){
		let url = '/subpkg/mines/myCollect'
		this.navigateTo(url)
	},
	
	//我的点赞
	gotoMyLike(){
		let url = '/subpkg/mines/myLike'
		this.navigateTo(url)
	},
	
	//我的关注
	gotoMyFollowUser(){
		let url = '/subpkg/mines/myFollowUser'
		this.navigateTo(url)
	},
	
	//浏览历史
	gotoMyViewed(){
		let url = '/subpkg/mines/myViewed'
		this.navigateTo(url)
	},
	
	//设置页面
	gotoSetting(){
		let url = '/subpkg/setting/setting'
		this.navigateTo(url)
	},
	
	gotoEditUserInfo(){
		let url = '/subpkg/setting/editUserInfo'
		this.navigateTo(url)
	},
	
	navigateTo(url){
		uni.navigateTo({
			url: url
		});
	}
}

export const $router = router