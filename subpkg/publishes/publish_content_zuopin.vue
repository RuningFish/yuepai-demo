<template>
	<view class="container">
		<!-- 提示 -->
		<view style="height: 600rpx;text-align: center;display: flex;flex-direction: column; align-items: center;justify-content: center;" v-if="showMessage !== ''">
			<image style="width: 200rpx;height: 200rpx;" src="/static/icons/icon_error_user1.png" mode=""></image>
			<text style="margin-top: 40rpx;">{{showMessage}}</text>
		</view>
		
		<view v-if="addIndex.tags && addIndex.tags.length > 0">
			<!-- 作品名称/描述 -->
			<view class="publsh-content">
				<view v-if="addIndex && addIndex.show_top_tips === 1" style="height: 80rpx;"></view>
				<!-- 约拍要求 -->
				<view class="item" :class="`item-zuopin`">
					<view class="item-title">
						<text class="title">作品名称/描述</text>
						<text style="color:#fd2e2f ;">*</text>
						<text class="sub-title">（尽可能详细）</text>
					</view>
					<textarea class="require-textarea" :value="require" @input="requireChange"
						style="width: 100%;padding-top:10px;font-size:28rpx;"
						placeholder="请输入作品名称/描述...(不能上传拼图,不能包含任何联系方式,照片中不能有漏点照片,不能发布私房约拍,,否则审核不通过,5个字以上)"
						placeholder-style="color:#919191;font-size:28rpx;font-weight:300;"></textarea>
				</view>
			
				<!-- 上传照片 -->
				<view class="item" :class="`item-photo`">
					<view class="item-title">
						<text class="title">上传照片</text>
						<text class="sub-title">（必须本人拍摄/本人照片）</text>
					</view>
			
					<view class="select-image-list">
						<view class="item-img" v-for="(item,index) in selected_Images" :key="index">
							<image @click="previewImage(index)" :src="item" mode="scaleToFill"></image>
							<image @click="closeImageClick(index)" class="close-icon" src="/static/icons/icon_close.png"
								mode=""></image>
						</view>
						<image @click="chooseImage" v-if="selected_Images.length !== 9" class="upload-image"
							src="/static/icons/icon_pick_photo.png"></image>
					</view>
				</view>
			
				<!-- 设备/地点 -->
				<view class="item" :class="`item-device`">
					<view class="item-title-">
						<text class="title">拍摄设备</text>
						<view class="item-right">
							<input class="right-text" placeholder="请填写拍摄设备(选填)" @input="deviceChange"></input>
							<!-- <uni-icons type="right" size="18" color="white"></uni-icons> -->
						</view>
					</view>
					<view class="item-title-">
						<text class="title">拍摄地点</text>
						<view class="item-right">
							<input class="right-text" placeholder="请填写拍摄地点(选填)" @input="locationChange"></input>
							<!-- <uni-icons type="right" size="18" color="white"></uni-icons> -->
						</view>
					</view>
					<view class="item-title-" :class="`item-title-last`">
						<text class="title">约拍返片</text>
						<view class="item-right" style="display: flex;align-items: center;justify-content: end;">
							<input class="right-text" disabled="true" placeholder="是否约拍返片?"></input>
							<!-- <uni-icons type="right" size="18" color="white"></uni-icons> -->
							<switch color="#fe5457" @change="switchChange" style="transform: scale(0.7);" />
						</view>
					</view>
				</view>
			
				<!-- 主题标签 -->
				<view class="item" :class="`item-tag`">
					<view class="item-title">
						<text class="title">主题标签</text>
						<text style="color:#fd2e2f;">*</text>
					</view>
					<view class="tag-list">
						<view class="tag-item" :class="item.active ? 'active' : ''" v-for="(item,index) in addIndex.tags"
							:key="index" @click="tagItemClick(item)">
							{{item.name}}
						</view>
					</view>
				</view>
			
				<view class="bottom">
					<view @click="publishButtonClick" class="publish-button">发布</view>
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addIndex: {},
				//约拍要求
				require: '',
				//选择的图片数组
				selected_Images: [],
				//选择的标签，最多5个
				selected_tags: [],
				//选填-设备
				device: '',
				//选填-地点
				location: '',
				//选填-返片
				isfanpian: 0,
				//上传图片的key
				image_key: '',
				showMessage:''
			};
		},

		onLoad(options) {
			this.getAddIndex()
		},

		methods: {
			async getAddIndex() {
				let param = Object.assign({}, uni.$api.apiCommonRequestParam)
				this.$set(param, 's_id', this.$store.state.s_id)
				var {
					data: res
				} = await uni.$http.post(uni.$api.apiZuoPinAddIndex, param)
				res = {
					"code": "200",
					"msg": "ok",
					"result": {
						"status": 2,
						"message": "请30分钟以后再发布！",
						"data": {}
					}
				}
				if(res.code !== '200') return uni.$showMsg()
				if(res.result.status === 1){
					//可以发布		
					this.addIndex =  res.result.data
				} else {
					this.showMessage = res.result.message
				}
			},

			//选择照片
			chooseImage() {
				let that = this
				uni.$utils.chooseImageFromAlbum((imagePath) => {
					that.selected_Images = [...that.selected_Images, ...imagePath]
				})
			},

			//查看图片
			previewImage(index) {
				let that = this
				uni.previewImage({
					current: index,
					urls: that.selected_Images
				})
			},

			//删除图片
			closeImageClick(index) {
				this.selected_Images.splice(index, 1)
			},

			//约拍要求
			requireChange(e) {
				this.require = e.target.value
			},

			//设备
			deviceChange(e) {
				this.device = e.target.value
			},

			//地点
			locationChange(e) {
				this.location = e.target.value
			},

			//返片
			switchChange(e) {
				this.isfanpian = e.target.value === true ? 1 : 0
			},

			//标签点击
			tagItemClick(item) {
				let active = item.active
				if (active === undefined | active === false) {
					if (this.selected_tags.length === 5) {
						uni.showModal({
							title: '温馨提示',
							content: '您最多只能选择5个标签哦～',
							showCancel: false,
							confirmText: '确定'
						})
						return
					}
					this.$set(item, 'active', true)
					this.selected_tags.push(item)
				} else if (active) {
					this.$set(item, 'active', false)
					let index = this.selected_tags.findIndex(obj => {
						if (item.name === obj.name) {
							return true
						}
					})
					this.selected_tags.splice(index, 1)
				}
			},

			//发布按钮点击
			publishButtonClick() {
				//判读必填项
				if (this.require.length === 0) {
					uni.showToast({
						title: '作品名称/描述不能少于5个字',
						icon: 'none'
					})
					return
				}

				if (this.selected_tags.length === 0) {
					uni.showToast({
						title: '请选择主题标签',
						icon: 'none'
					})
					return
				}

				if (this.selected_Images.length === 0) {
					this.publish()
				} else {
					//上传图片
					if(this.image_key.length === 0){
						let that = this
						uni.$utils.uploadImagesToQiniu(this.selected_Images, (filePath) => {
							for (let i = 0; i < filePath.length; i++) {
								if (i !== filePath.length - 1) {
									that.image_key += filePath[i] + ','
								} else {
									that.image_key += filePath[i]
								}
							}
							that.publish()
						})
					}
					else{
						that.publish()
					}
				}
			},

			async publish() {
				var tag_ids = ''
				for (let i = 0; i < this.selected_tags.length; i++) {
					if (i !== this.selected_tags.length - 1) {
						tag_ids += this.selected_tags[i].id + ','
					} else {
						tag_ids += this.selected_tags[i].id
					}
				}

				let param = Object.assign({}, uni.$api.apiCommonRequestParam)
				this.$set(param, 's_id', this.$store.state.s_id)
				this.$set(param, 'content', this.require)
				this.$set(param, 'device', this.device)
				this.$set(param, 'location', this.location)
				this.$set(param, 'isfanpian', this.isfanpian)
				this.$set(param, 'video', '')
				this.$set(param, 'video_cover', '')
				this.$set(param, 'video_height', '')
				this.$set(param, 'video_width', '')
				this.$set(param, 'tag', tag_ids)
				this.$set(param, 'img', this.image_key)

				const {
					data: res
				} = await uni.$http.post(uni.$api.apiAddZuoPin, param)
				if (res.code !== '200') return uni.$showMsg()
				if (res.result.status === 1) {
					//发布成功-切换到首页		
					uni.switchTab({
						url: '/pages/home/home',
						success() {
							uni.showToast({
								title: '发布成功',
								icon: 'success',
								duration: 3000
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 200rpx;
	}

	.top_tips {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		display: flex;
		align-items: center;
		background-color: #ffeeed;
		color: $main-theme-color;
		font-size: 26rpx;
		padding: 0 20rpx;
		height: 80rpx;
	}

	.publsh-content {
		padding: 0 20rpx 0 20rpx;
		position: relative;
	}

	.item {
		border-radius: $border-radius;
		background-color: #fff;
		margin-top: $margin-left-right;
		padding: 0 20rpx;

		.item-title,
		.item-title- {
			font-size: 32rpx;
			font-weight: 400;
			padding-top: 18rpx;
			padding-bottom: 18rpx;
			border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.02); //rgba(133, 234, 198, 1);
			color: #333;
		}

		.sub-title {
			color: #919191;
			font-size: 28rpx;
			font-weight: 300;
		}

		.item-title- {
			display: flex;
			justify-content: space-between;

			.bottom-line {
				background-color: aqua;
				height: 1px;

			}
		}
	}

	.select-image-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
		columns: 4;
		column-gap: 20rpx;
		background-color: white;

		.item-img {
			width: calc((100vw - 80rpx - 60rpx)/4);
			height: calc((100vw - 80rpx - 60rpx)/4);
			margin-top: 20rpx;
			position: relative;

			image {
				width: 100%;
				height: 100%;
				border-radius: $border-radius;
			}

			.close-icon {
				width: 34rpx;
				height: 34rpx;
				position: absolute;
				top: 2px;
				right: 2px;
			}
		}
	}

	.upload-image {
		width: calc((100vw - 80rpx - 60rpx)/4);
		height: calc((100vw - 80rpx - 60rpx)/4);
		border-radius: $border-radius;
		margin-top: 20rpx;
		margin-right: 20rpx;
	}

	.item-right {
		display: flex;
	}

	.input-placeholder {
		color: #919191;
		text-align: right;
		font-weight: 300;
	}

	input {
		text-align: right;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 10px 0;

		.tag-item {
			height: 56rpx;
			padding: 0 22rpx;
			background-color: #f0f0f0;
			color: #666666;
			font-size: 28rpx;
			border-radius: 28rpx;
			margin: 8px 8px 0 0;
			line-height: 56rpx;
			font-weight: 300;
		}

		.active {
			color: #fff;
			background-color: $main-theme-color;
		}
	}

	.bottom {
		margin-top: 80px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.publish-button {
		// margin-top: 100rpx;
		height: 80rpx;
		width: 500rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		border-radius: 40rpx;
		background-color: $main-theme-color;
	}
</style>