const pageLoadMore = {
	data() {
		return {
			//选中的下标 //默认第一个
			selectedIndex: 0,
			tabList: ['约拍', '作品'],
			//数据列表：约拍-作品
			dataList: [],
			time: '', //加载更多使用，tablist.length < 2有值
			hasNomore: true, //是否还有更多数据
			//是否正在加载
			isloading: false,
			//是否是下拉刷新
			pull: false,
			triggered: true
		}
	}, 

	onLoad(options) {
		this.tabItemClick(this.selectedIndex)
		console.log('page-load-more',this.tabList)
	},
	
	methods: {
		
		initData(){
			this.dataList = []
			for(let i = 0; i < this.tabList.length; i++){
				let obj = this.tabItemData()
				this.dataList.push(obj)
			}
		},
		
		tabItemData() {
			let item = {
				list: [], //列表数据
				time: '', //加载更多使用，为上一条数据的time
				hasNomore: true, //是否还有更多数据
				no_data:false
			}
			return item
		},
		
		itemIndexChange(index) {
			if (this.selectedIndex !== index) {
				this.selectedIndex = index
			}
		},
				
		//选项卡点击
		tabItemClick(index) {
			let dataItem = this.dataList[index]
			if (dataItem !== undefined && index === this.selectedIndex) return
			this.selectedIndex = index
			if (dataItem === undefined) {
				// this.dataList.splice(index,0,this.tabItemData())
				this.dataList[index] = this.tabItemData()
				//数据为空时请求数据
				this.scrolltolower()
			}
		},
		
		tabChange(e) {
			let index = e.target.current || e.detail.current
			this.tabItemClick(index)
		},
		
		onRefresh() {
			this.pull = true
			this.triggered = true
			this.dataList[this.selectedIndex].hasNomore = true
			this.dataList[this.selectedIndex] = this.tabItemData()
			if (this.isloading) return
			this.scrolltolower()
		},
		
		//上拉加载
		scrolltolower() {
			if (this.isloading || !this.dataList[this.selectedIndex].hasNomore) return
			this.getDataList()
			this.isloading = true
		},
		
		stopLoading(res) {
			if (this.pull) {
				this.dataList[this.selectedIndex] = this.tabItemData()
			}
			this.triggered = false
			this.isloading = false
			this.pull = false
			//将新请求到的数据加到原数据中
			this.dataList[this.selectedIndex].list = [...this.dataList[this.selectedIndex].list, ...res.result.data
				.data
			]
			
			if(this.dataList[this.selectedIndex].list.length === 0 && res.result.data.data.length === 0){
				this.dataList[this.selectedIndex].no_data = true
			}
			else{
				this.dataList[this.selectedIndex].no_data = false
			}
			
			if(res.result.data.data.length === 0 || (nextTime === time && res.result.data.data.length < res.result
				.data.count)){
				this.dataList[this.selectedIndex].hasNomore = false
				return
			}
			//判断是否还有更多数据
			let nextTime = res.result.data.nexttime
			let list = this.dataList[this.selectedIndex].list
			let time = list[list.length - 1].updatetime
			this.dataList[this.selectedIndex].time = nextTime
		},
		
		getRequestParam(){
			let param = uni.$api.apiCommonRequestParam
			// 1:约拍 2:作品
			let type = this.selectedIndex === 0 ? '1' : '2'
			let time = this.dataList[this.selectedIndex].time
			this.$set(param, 'type',type)
			this.$set(param, 's_id',this.$store.state.s_id)
			this.$set(param, 'time',time)
			return param
		},
	}
}

export const $pageLoadMore = pageLoadMore