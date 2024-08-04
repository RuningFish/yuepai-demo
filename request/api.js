import {$appConfig} from "../config/appConfig"
const api = {
	//请求公共参数 => 为了测试方便
	apiCommonRequestParam: {
		appid: $appConfig.appid,
		appkey: $appConfig.appkey,
		platform: $appConfig.platform,
		version: $appConfig.version,
		// s_id: store.state.s_id
	},

	//首页获取banner列表
	apiGetBannerList:'/appapi/Banner/apiGetList',
	//首页获取小程序列表
	apiGetMiniAppSetInfor:'/appapi/setInfor/getMiniAppSetInfor',
	//首页获取推荐列表
	apiGetRecommendList:'/appapi/Yuepai/apiGetRecommendList',
	//首页最新&同城列表
	apiGetYuepaiList:'/appapi/Yuepai/apiGetList',
	//手机账号登录
	loginphone: '/appapi/user/loginphone',
	//作品分类列表
	apiGetZuoPinList:'/appapi/zuopin/apiGetList',
	//请求个人信息
	apiUserIndex: '/appapi/user/apiUserIndex',
	//约拍详情
	apiGetDetail: '/appapi/yuepai/apiGetDetail',
	//约拍头像列表
	apiGetRegAvatarList:'/appapi/yuepai/getRegAvatarList',
	//作品详情
	apiGetItem:'/appapi/zuopin/apiGetItem',
	//关注
	apiFollowUser: '/appapi/follow/apiFollowUser',
	//取消关注
	apiUnFollowUser: '/appapi/follow/apiUnFollowUser',
	//点赞
	apiLike: '/appapi/like/apiLike',
	//取消点赞
	apiUnLike: '/appapi/like/apiUnLike',
	/**收藏**/
	apiCollect: '/appapi/collect/apiCollect',
	//取消收藏
	apiUnCollect: '/appapi/collect/apiUnCollect',
	//个人主页-个人展示信息
	apiUsershow:'/appapi/user/apiUsershow',
	//个人主页-约拍数据
	apiUserYuepai:'/appapi/yuepai/apiUserYuepai',
	//个人主页-作品数据
	apiUserZuopin:'/appapi/zuopin/apiUserZuopin',
	//我的关注
	apiMyFollowUser:'/appapi/follow/apiMyFollowUser',
	//我的收藏type：1约拍 2作品
	apiMyCollect:'/appapi/collect/apiMyCollect',
	//我的点赞type:同上
	apiMyLike:'/appapi/like/apiMyLike',
	//浏览历史type:同上
	apiMyViewed:'/appapi/viewhistory/apiMyViewed'
}

export const $api = api