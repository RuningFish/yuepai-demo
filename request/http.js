// 封装的request函数，用于发送HTTP请求
/**
 *  url  请求的接口路径
 *  method GET POST...
 *  param  请求需要的参数
 */

class request{
	constructor(options = {}){
		// 请求的根路径
		this.baseUrl = options.baseUrl || ''
		// 请求的 url 地址
		this.url = options.url || ''
		// 请求方式
		this.method = 'GET'
		// 请求的参数对象
		this.data = null
		// header 请求头
		this.header = options.header || {}
		this.beforeRequest = null
		//请求成功的统一操作ex:登录失效统一处理
		this.requestSuccess = null
		this.afterRequest = null
	}
	
	get(url, param = {}, showLoading = true) {
		return this.configRequest(url, 'Get', param, showLoading)
	}
	
	post(url, param = {}, showLoading = true){
		return this.configRequest(url,'Post',param, showLoading)
	}
	
	put(url, param = {}, showLoading = true){
		return this.configRequest(url,'Put',param, showLoading)
	}
	
	delete(url, param = {}, showLoading = true){
		return this.configRequest(url,'Delete',param, showLoading)
	}
	
	configRequest(url, methed, param, showLoading) {
		let reg = /(http|https):\/\/([\w.]+\/?)\S*/ig
		if (!url.match(reg)) {
			//不是以http或https开头
			url = this.baseUrl + url
		}
		return this.request(url, methed, param, showLoading)
	}
	
	request(url, method, param = {}, showLoading = true) {
		if (url === undefined || url === '') {
			console.log('url错误')
			return
		}
		
		// 清空 header 对象
		this.header = {}
		if(showLoading){
			// 请求之前做一些事
			this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
		}
		// 使用Promise封装异步请求
		let promise = new Promise((resolve, reject) => {
			let source = wx
			if ('undefined' !== typeof uni) {
			  source = uni
			}
			source.request({
				url: url,
				method: method,
				data: param,
				header:this.header,
				success:(res => {
					this.requestSuccess && typeof this.requestSuccess === 'function' && this.requestSuccess(res)
					resolve(res)
					console.log('请求成功-',url,'\n','param-',param,'\n','response-', res)
					/****/
				}),
				fail:(err => {
					reject(err)
					console.log('请求失败-',url,'\n','param-',param,'\n','error-', err)
				}),
				complete:(res => {
					if(showLoading){
						this.afterRequest && typeof this.afterRequest === 'function' && this.afterRequest(res)
					}
				})
			})
		});
		return promise; // 返回Promise对象
	}
}

export const $http = new request()