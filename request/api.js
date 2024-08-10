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
	apiGetBannerList:'/Banner/apiGetList',
	//首页获取小程序列表
	apiGetMiniAppSetInfor:'/setInfor/getMiniAppSetInfor',
	//首页获取推荐列表
	apiGetRecommendList:'/Yuepai/apiGetRecommendList',
	//首页最新&同城列表
	apiGetYuepaiList:'/Yuepai/apiGetList',
	//手机账号登录
	loginphone: '/user/loginphone',
	//作品分类列表
	apiGetZuoPinList:'/zuopin/apiGetList',
	//请求个人信息
	apiUserIndex: '/user/apiUserIndex',
	//约拍详情
	apiGetDetail: '/yuepai/apiGetDetail',
	//约拍头像列表
	apiGetRegAvatarList:'/yuepai/getRegAvatarList',
	//作品详情
	apiGetItem:'/zuopin/apiGetItem',
	//关注
	apiFollowUser: '/follow/apiFollowUser',
	//取消关注
	apiUnFollowUser: '/follow/apiUnFollowUser',
	//点赞
	apiLike: '/like/apiLike',
	//取消点赞
	apiUnLike: '/like/apiUnLike',
	/**收藏**/
	apiCollect: '/collect/apiCollect',
	//取消收藏
	apiUnCollect: '/collect/apiUnCollect',
	//个人主页-个人展示信息
	apiUsershow:'/user/apiUsershow',
	//个人主页-约拍数据
	apiUserYuepai:'/yuepai/apiUserYuepai',
	//个人主页-作品数据
	apiUserZuopin:'/zuopin/apiUserZuopin',
	//我的关注
	apiMyFollowUser:'/follow/apiMyFollowUser',
	//我的收藏type：1约拍 2作品
	apiMyCollect:'/collect/apiMyCollect',
	//我的点赞type:同上
	apiMyLike:'/like/apiMyLike',
	//浏览历史type:同上
	apiMyViewed:'/viewhistory/apiMyViewed',
	//签到
	apiGetSign:'/sign/apiSign',
	//检查版本更新
	apiSetinforVersion:'/Setinfor/setIndex',
	//编辑用户信息
	apiEditUserInfor:'/user/editUserInfor',
	//职业列表
	apiGetIdentity:'/identity/apiGetIdentity',
	//保存编辑信息
	apiSaveEditUserInfor:'/user/apiEditUserInfor',
	//保存简介
	apiSaveUserIntro:'/user/apiSaveUserIntro',
	//获取图片上传token
	apiGet_qiniu_access_token:'/qiniu/get_access_token',
	//上传图片/视频地址
	apiQiniu_upload_url: 'https://upload.qiniup.com/',
	//发布---约拍对象列表
	apiGetPubInfo:'/yuepai/getPubInfo',
	//主题标签-约拍
	apiYuepaiAddIndex:'/yuepai/apiAddIndex',
	//主题标签-作品
	apiZuoPinAddIndex:'/zuopin/apiAddIndex',
	//发布约拍
	apiAddYuepai:'/yuepai/apiAddYuepai',
	//发布作品
	apiAddZuoPin:'/zuopin/apiAddZuopin',
	//我的约拍status:all 全部 opening展示中 closed 已关闭 audit_fail 审核失败
	apiMyYuepai:'/yuepai/apiMyYuepai'
}

export const $api = api