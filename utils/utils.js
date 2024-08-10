import store from "../store/store"
import {$appConfig} from "../config/appConfig"
const utils = {
	
	// function showModalTwoButton(
	// 	title = '提示', 
	// 	content,
	// 	cancelText='取消',
	// 	confirmText = '确定',
	// 	confirmCallBack,
	// 	cancelCallBack){
	// 	uni.showModal({
	// 		title:title,
	// 		content:content,
	// 		cancelText:cancelText,
	// 		confirmText:confirmText,
	// 		success: function(res){
	// 			if(res.confirm){
	// 				confirmCallBack && confirmCallBack()
	// 			}
	// 			else if(res.cancel){
	// 				cancelCallBack && cancelCallBack()
	// 			}
	// 		}.bind(this)  
	// 	})
	// }
	
	chooseImageFromAlbum(callBack,imageCount = 9, crop = false){
		let cro = {}
		if(crop){
			let width = uni.getSystemInfoSync().screenWidth
			cro = {
				width:width, 
				height:width 
			}
		}
		
		uni.chooseImage({
			count:imageCount,
			crop:cro,
			success(filePath) {
				console.log('选择图片---',filePath)
				// that.select_avatar_path = filePath.tempFilePaths[0]
				callBack && callBack(filePath.tempFilePaths)
			},
			fail(error) {
				console.log('选择图片---error',error)
			},
			complete() {
				
			}
		})
	},
	
	//上传图片到七牛
	//上传imageList:图片列表 callBack：上传成功回调[七牛key]
	async uploadImagesToQiniu(imageList,callBack){
		//获取上传图片的token
		console.log('getAccessToken---begin')
		// let param = Object.assign({},uni.$api.apiCommonRequestParam)
		// this.$set(param,'s_id',store.state.s_id)
		let param = {
			appid: $appConfig.appid,
			appkey: $appConfig.appkey,
			platform: $appConfig.platform,
			version: $appConfig.version,
			s_id:store.state.s_id
		}
		const { data :res } = await uni.$http.post(uni.$api.apiGet_qiniu_access_token,param)
		if (res.code !== '200') return uni.$showMsg()
		let access_token = res.result.data.uptoken
		console.log('getAccessToken---end:',access_token)
		this.upLoadImage(imageList,access_token,callBack)
	},
	
	//上传图片
	async upLoadImage(imageList,token,callBack){
		console.log('upLoadImage---begin')
		let that = this
		var image_keys = []
		for(let i = 0; i < imageList.length; i++){
			uni.uploadFile({
				url:uni.$api.apiQiniu_upload_url,
				filePath:imageList[i],
				name:'file',
				formData:{
					token:token
				},
				success:({data:res}) =>{
					//res返回的是字符串格式
					let upload_key = JSON.parse(res).key
					image_keys.push(upload_key)
					console.log('上传图片成功了',res)
					if(i === imageList.length - 1){
						callBack && callBack(image_keys)
					}
				},
				fail:(error) => {
					console.log('上传图片失败了',error)
					if(i === imageList.length - 1){
						callBack && callBack([])
					}
				}
			})
		}
		console.log('upLoadImage---end:')
	},
} 

export const $utils = utils
