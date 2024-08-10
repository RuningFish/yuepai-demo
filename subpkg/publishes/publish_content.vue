<template>
	<view class="container">
		<!-- 是否可以发布 -->
		<view style="height: 600rpx;text-align: center;display: flex;flex-direction: column; align-items: center;justify-content: center;" v-if="showMessage !== ''">
			<image style="width: 200rpx;height: 200rpx;" src="/static/icons/icon_error_user1.png" mode=""></image>
			<text style="margin-top: 40rpx;">{{showMessage}}</text>
		</view>

		<view v-if="addIndex.tags && addIndex.tags.length > 0">
			<!-- 提示 -->
			<view class="top_tips" v-if="addIndex && addIndex.show_top_tips === 1">
				<image style="width: 36rpx;height: 36rpx;" src="/static/icons/icon_yuepai_notice.png" mode=""></image>
				<view style="margin-left: 16rpx;">{{addIndex.top_tips}}</view>
			</view>

			<!-- 发布内容 -->
			<view class="publsh-content">
				<view v-if="addIndex && addIndex.show_top_tips === 1" style="height: 80rpx;"></view>
				<!-- 约拍要求 -->
				<view class="item" :class="`item-yuepai`">
					<view class="item-title">
						<text class="title">约拍要求</text>
						<text style="color:#fd2e2f ;">*</text>
						<text class="sub-title">（尽可能详细）</text>
					</view>
					<textarea class="require-textarea" :value="require" @input="requireChange"
						style="width: 100%;padding-top:10px;font-size:28rpx;"
						placeholder="请描述一下你的约拍要求...(不能包含任何联系方式,照片中不能有漏点照片,不能发布私房约拍,不要用拼图,否则审核不通过,7个字以上)"
						placeholder-style="color:#919191;font-size:28rpx;font-weight:300;"></textarea>
				</view>

				<!-- 上传照片 -->
				<view class="item" :class="`item-photo`">
					<view class="item-title">
						<text class="title">上传照片</text>
						<text class="sub-title">（本人作品/本人照片/期待的风格）</text>
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

				<!-- 时间 商家/修图师不显示-->
				<view class="item" :class="`item-time`" v-if="totype !== '3' && totype !== '6'">
					<view class="item-title-">
						<text class="title">时间</text>
						<view class="item-right">
							<input class="right-text" placeholder="您期望的时间(选填)" @input="timeChange"></input>
							<uni-icons type="right" size="18" color="white"></uni-icons>
						</view>
					</view>
					<view class="item-title-">
						<text class="title">地点</text>
						<view class="item-right">
							<input class="right-text" placeholder="您期望的地点(选填)" @input="locationChange"></input>
							<uni-icons type="right" size="18" color="white"></uni-icons>
						</view>
					</view>
					<view class="item-title-" :class="`item-title-last`">
						<text class="title">成片</text>
						<view class="item-right">
							<input class="right-text" placeholder="如:原片多少 精修多少等(选填)" @input="fanpianChange"></input>
							<uni-icons type="right" size="18" color="white"></uni-icons>
						</view>
					</view>
				</view>

				<!-- 费用 -->
				<view class="item" :class="`item-money`">
					<view class="item-title-">
						<view>
							<text class="title">费用模式</text>
							<text style="color:#fd2e2f ;">*</text>
						</view>
						<view class="item-right">
							<picker :range="money_mode" @change="moneyModeChange">
								<input :value="selected_money_mode" disabled="true" placeholder="请选择费用模式"></input>
							</picker>
							<uni-icons type="right" size="18" color="lightgray"></uni-icons>
						</view>
					</view>
					<!-- 金额 -->
					<view class="item-title-" v-if="selected_money_mode === '需要收费' | selected_money_mode === '愿意付费'">
						<view class=""></view>
						<view class="item-right">
							<input style="margin-right: 5px;" type="number" :value="money"
								:placeholder="money_placeholder" @input="moneyChange"></input>
							<view style="margin-right: 5px;">元</view>
						</view>
					</view>
					<view class="item-title-">
						<view>
							<text class="title">面向地区</text>
							<text style="color:#fd2e2f ;">*</text>
						</view>
						<view class="item-right">
							<picker>
								<input :value="selected_location" disabled="true" placeholder="请选择面向地区"></input>
							</picker>
							<uni-icons type="right" size="18" color="lightgray"></uni-icons>
						</view>
					</view>
					<view class="item-title-" :class="`item-title-last`">
						<view>
							<text class="title">信用担保</text>
							<text style="color:#fd2e2f ;">*</text>
						</view>
						<view class="item-right">
							<picker :range="pledgeList" @change="pledgeChange">
								<input :value="selected_pledge" disabled="true"></input>
							</picker>
							<uni-icons type="right" size="18" color="lightgray"></uni-icons>
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
						<view class="tag-item" :class="item.active ? 'active' : ''"
							v-for="(item,index) in addIndex.tags" :key="index" @click="tagItemClick(item)">
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
				//约拍的对象类型
				totype: '',
				pledgeList: ['不要求对方存入保证金', '要求对方存入保证金'],
				addIndex: {},
				//约拍要求
				require: '',
				//选择的图片数组
				selected_Images: [],
				//费用模式
				money_mode: [],
				selected_money_mode: '',
				//面向地区
				selected_location: '北京',
				//担保
				selected_pledge: '',
				//选择的标签，最多5个
				selected_tags: [],
				//选填-时间
				time: '',
				//选填-地点
				location: '',
				//选填-返片
				fanpian: '',
				//收付费
				money: '',
				money_placeholder: '',
				//上传图片的key
				image_key: '',
				showMessage: ''

			};
		},

		onLoad(options) {
			this.selected_pledge = this.pledgeList[0]
			this.totype = options.type
			uni.setNavigationBarTitle({
				title: options.title
			})

			this.getAddIndex()
		},

		methods: {
			async getAddIndex() {
				let param = Object.assign({}, uni.$api.apiCommonRequestParam)
				this.$set(param, 's_id', this.$store.state.s_id)
				this.$set(param, 'totype', this.totype)
				const {
					data: res
				} = await uni.$http.post(uni.$api.apiYuepaiAddIndex, param)
				if (res.code !== '200') return uni.$showMsg()
				if (res.status === 1) {
					//可以发布		
					this.addIndex = res.result.data
					this.money_mode = this.addIndex.mode.map(obj => obj.name)
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

			//时间
			timeChange(e) {
				this.time = e.target.value
			},

			//地点
			locationChange(e) {
				this.location = e.target.value
			},

			//成片
			fanpianChange(e) {
				this.fanpian = e.target.value
			},

			// 费用
			moneyModeChange(e) {
				this.selected_money_mode = this.money_mode[e.detail.value]
				this.money_placeholder = ''
				this.money = ''
				if (e.detail.value === '1') {
					this.money_placeholder = '请输入收费金额'
				} else if (e.detail.value === '2') {
					this.money_placeholder = '请输入付费金额'
				}
			},
			// 收付费
			moneyChange(e) {
				this.money = e.target.value
			},

			//担保
			pledgeChange(e) {
				this.selected_pledge = this.pledgeList[e.detail.value]
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
						title: '约拍要求不能少于7个字',
						icon: 'none'
					})
					return
				}
				if (this.selected_money_mode.length === 0) {
					uni.showToast({
						title: '请选择费用模式',
						icon: 'none'
					})
					return
				}

				//如果选择的是收付费，需要判断金额是否填写
				if (this.selected_money_mode === '需要收费' | this.selected_money_mode === '愿意付费') {
					if (this.money.length === 0) {
						uni.showToast({
							title: '请输入金额',
							icon: 'none'
						})
						return
					}
				}

				if (this.selected_location.length === 0) {
					uni.showToast({
						title: '请选择面向地区',
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
			},

			async publish() {
				let money_mode_id = this.addIndex.mode.findIndex(obj => {
					if (obj.name === this.selected_money_mode) {
						return obj.id
					}
				})

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
				this.$set(param, 'city', '110100')
				this.$set(param, 'city_name', '北京')
				this.$set(param, 'province', '110000')
				this.$set(param, 'city_name', '北京')
				this.$set(param, 'province_name', '北京市')
				this.$set(param, 'totype', this.totype)
				this.$set(param, 'content', this.require)
				this.$set(param, 'time', this.time)
				this.$set(param, 'location', this.location)
				this.$set(param, 'fanpian', this.fanpian)
				this.$set(param, 'video', '')
				this.$set(param, 'video_cover', '')
				this.$set(param, 'video_height', '')
				this.$set(param, 'video_width', '')
				this.$set(param, 'needpledge', '')
				this.$set(param, 'needCost', '1')
				this.$set(param, 'money_mode', money_mode_id)
				this.$set(param, 'money', this.money)
				this.$set(param, 'tag', tag_ids)
				this.$set(param, 'img', this.image_key)

				const {
					data: res
				} = await uni.$http.post(uni.$api.apiAddYuepai, param)
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
			border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.02); 
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
		height: 80rpx;
		width: 500rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		border-radius: 40rpx;
		background-color: $main-theme-color;
	}
</style>