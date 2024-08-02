const utils = {
	
	function showModalTwoButton(
		title = '提示', 
		content,
		cancelText='取消',
		confirmText = '确定',
		confirmCallBack,
		cancelCallBack){
		uni.showModal({
			title:title,
			content:content,
			cancelText:cancelText,
			confirmText:confirmText,
			success: function(res){
				if(res.confirm){
					confirmCallBack && confirmCallBack()
				}
				else if(res.cancel){
					cancelCallBack && cancelCallBack()
				}
			}.bind(this)  
		})
	}
} 

export const $utils = utils
