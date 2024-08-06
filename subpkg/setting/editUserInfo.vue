<template>
	<view class="container">
		<view class="list-item avatar">
			<view class="name">头像</view>
			<view class="item-right">
				<image :src="avatar" mode=""></image>
				<uni-icons type="right" size="18" color="lightgray"></uni-icons>
			</view>
		</view>
		<view class="list-item">
			<view class="name">昵称</view>
			<view class="item-right" >
				<input class="uni-input" style="background-color: white;text-align: right;" :value="nickname" @input="nickNameChange"></input>
				<uni-icons type="right" size="18" color="white"></uni-icons>
			</view>
		</view>
		<view class="list-item">
			<view class="name">性别</view>
			<view class="item-right">
				<picker :value="select_sex_index" :range="sex_list" @change="sexChange">
					<view class="right-text" v-if="select_sex_index">{{select_sex_index === 2 ? '女' : '男'}}</view>
				</picker>
				<uni-icons type="right" size="18" color="lightgray"></uni-icons>
			</view>
		</view>
		<view class="list-item">
			<view class="name">生日</view>
			<view class="item-right">
				<picker mode="date" :end="getCurrentDate()" @change="birthdayChange">
					<view class="right-text">{{select_birthday}}</view>
				</picker>
				<uni-icons type="right" size="18" color="lightgray"></uni-icons>
			</view>
		</view>
		<view class="list-item">
			<view class="name">身份</view>
			<view class="item-right">
				<picker mode="selector" :range="identity_list" @change="identityChange">
					<view class="right-text">{{select_identity}}</view>
				</picker>
				<uni-icons type="right" size="18" color="lightgray"></uni-icons>
			</view>
		</view>
		<view class="list-item">
			<view class="name">地区</view>
			<view class="item-right">
				<view class="right-text">{{select_city}}</view>
				<uni-icons type="right" size="18" color="lightgray"></uni-icons>
			</view>
		</view>
		<view class="list-item-intro">
			<view class="name">
				<text style="color: #929292">自我简介</text>
				<text style="color: #fe5457;font-size:24rpx"> (请勿带有联系方式哦，否则审核不通过)</text>
			</view>
		</view>
		<view class="list-item-intro-content">
			<textarea class="name" :value="intro" placeholder="请填写自我简介" placeholder-style="color:#8c8c8c;font-size:28rpx;font-weight:300;" @input="introChange"></textarea>
		</view>
		
		<view class="bottom">
			<view class="save-button" @click="saveInfo">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info:{},
				avatar:'',
				sex_list:['男','女'],
				identity_list:[],
				nickname:'',
				select_sex_index:'',
				select_birthday:'',
				select_identity:'',
				select_city:'',
				intro:''
			};
		},
		
		onLoad() {
			//获取编辑信息
			this.getEditUserInfor()
			//获取职业列表
			this.getIdentity()
		},
		
		methods:{
			async getEditUserInfor(){
				let param = uni.$api.apiCommonRequestParam
				this.$set(param, 's_id',this.$store.state.s_id)
				const {data:res} = await uni.$http.post(uni.$api.apiEditUserInfor, param)
				if (res.code !== '200') return uni.$showMsg()
				let data = res.result.data
				this.user_info = data
				this.avatar = data.avatar
				this.nickname = data.nickname
				this.select_sex_index = data.sex
				this.select_birthday = data.birthday
				this.select_identity = data.identity
				this.select_city = data.city_name
				this.intro = data.intro
			},
			
			async getIdentity(){
				let param = uni.$api.apiCommonRequestParam
				this.$set(param, 's_id',this.$store.state.s_id)
				const {data:res} = await uni.$http.post(uni.$api.apiGetIdentity, param, false)
				if (res.code !== '200') return uni.$showMsg()
				if(res.result.status === 1){
					this.identity_list = res.result.data.identity_data.map(obj => obj.name)
				} 
			},
			
			nickNameChange(e){
				this.nickname = e.target.value
			},
			
			//性别选择
			sexChange(e){
				this.select_sex_index = e.detail.value - 0 +1
			},
			//生日选择
			birthdayChange(e){
				this.select_birthday = e.detail.value
			},
			//职业选择
			identityChange(e){
				console.log(e.detail.value)
				this.select_identity = this.identity_list[e.detail.value]
			},
			
			//简介修改
			introChange(e){
				this.intro = e.target.value
			},
			
			//获取当前时间
			getCurrentDate(){
				let now = new Date()
				let year = now.getFullYear()
				let month = now.getMonth() + 1
				let date = now.getDate()
				return `${year}-${month}-${date}`
			},
			
			//保存信息
			async saveInfo(){
				let promiseList = []
				//判断是否调用接口
				let editInfo = false
				let editIntro = false
				if(
				// this.avatar !== this.user_info.avatar  // qiniu key获取不到 无法更改
				  this.nickname !== this.user_info.nickname 
				| this.select_sex_index !== this.user_info.sex
				| this.select_birthday !== this.user_info.birthday
				| this.select_identity !== this.user_info.identity
				// || this.select_city !== this.user_info.city_name // 无城市列表 无法更改
				){
					editInfo = true
				}
				
				if(this.intro !== this.user_info.intro){
					editIntro = true
				}
				
				if(editInfo){
					let param = Object.assign({},uni.$api.apiCommonRequestParam)
					this.$set(param, 's_id',this.$store.state.s_id)
					this.$set(param, 'area','0')
					this.$set(param, 'area_name','')
					this.$set(param, 'avatar',this.avatar)
					this.$set(param, 'birthday',this.select_birthday)
					this.$set(param, 'city','110100')
					this.$set(param, 'city_name','北京')
					this.$set(param, 'identity',this.select_identity)
					this.$set(param, 'nickname',this.nickname)
					this.$set(param, 'province','110000')
					this.$set(param, 'province_name','北京市')
					this.$set(param, 'realname','0')
					this.$set(param, 'sex',this.select_sex_index)
					this.$set(param, 'identity',this.select_identity)
					this.$set(param, 'nickname',this.nickname)
					const promise = await uni.$http.post(uni.$api.apiSaveEditUserInfor,param).then().catch(error => {
	
					})
					promiseList.push(promise)
					
				}
				
				if(editIntro){
					let param =  Object.assign({},uni.$api.apiCommonRequestParam) 
					this.$set(param, 'intro',this.intro)
					this.$set(param, 's_id',this.$store.state.s_id)
					const promise = await uni.$http.post(uni.$api.apiSaveUserIntro,param).then().catch(error => {
					
					})
					promiseList.push(promise)
				}
				
				if(promiseList.length === 0){
					console.log('没有修改---')
					uni.navigateBack({
						delta:1
					})
				}
				else{
					const allPromise = Promise.allSettled(promiseList)
					allPromise.then(res => {
						uni.navigateBack({
							delta:1
						})
					}).catch(error => {
						uni.navigateBack({
							delta:1
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.list-item{
	display: flex;
	padding: 15px $margin-left-right;
	background-color: #fff;
	justify-content: space-between;
	align-items: center;
	border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.02);

	.item-right{
		display: flex;
		align-items: center;
		image{
			width: 44px;
			height: 44px;
			border-radius: 22px;
			margin-right: 5px;
		}
		.right-text{
			margin-right: 3px;
		}
	}
}

.container{
	margin-top: $margin-left-right;
}

.list-item-intro{
	color: #929292;
	padding: 15px $margin-left-right;
}

.list-item-intro-content{
	height: 260rpx;
	background-color: #fff;
	textarea{
		background-color: white;
		padding-top: 15px;
		padding-left: $margin-left-right;
		height: 100%;
		width: 100%; 
		font-size: 28rpx;
	} 
}

.bottom{
	margin-top: 60px;
	width: 100%;
	// background-color: yellow;
	display: flex;
	align-items: center;
	justify-content: center;
}

.save-button{
	margin: 10px 0;
	height: 80rpx;
	width: 500rpx;
	line-height: 80rpx;
	text-align: center;
	color: #fff;
	border-radius: 40rpx;
	background-color: $main-theme-color;
}
</style>
