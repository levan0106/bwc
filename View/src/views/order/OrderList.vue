<template>
    <el-row>
		<bwc-layout menu-id="order/list"
		title="Order List"
		:bread-crumb="breadCrumb">
			<el-row>
				<el-button-group>
					<router-link to="/order/create">
						<el-button type="primary" icon="el-icon-plus">Create</el-button>
					</router-link>
					<el-button type="success" :disabled="isDisabledMark" @click="handleMark">
						<i class="el-icon-check"></i> Mark to complete
					</el-button>
				</el-button-group>
			</el-row>
			<order-filtering v-on:doSearch="handleSearch"></order-filtering>
			<order-list 
				:loading="loading"
				:data="data" 
				:dataExpand="dataExpand" 
				@expand-change="handleExpandChange"
				@selection-change="handleSelectionChange">
			</order-list>
		</bwc-layout>
    </el-row>  
</template>

<script>
import OrderList from '@/components/order/OrderList.vue'
import OrderFiltering from '@/components/order/OrderFiltering.vue'
import functions from '@/plugin/function'

export default {
    name:'PurchaseMain',
    components:{
		OrderList,
		OrderFiltering
    },
    data(){
        return({
			loading:true,
			isDisabledMark:true,
			listSelectedItem:[],
			dataExpand:[],
			data:[],
			breadCrumb:[
				{href:'/',name:'Home'},
				{href:'/order/list',name:'Order'},
				{href:'',name:'List'}
			],
			rowSelected:[] 
			})
		},
		
    computed:{
		originalData(){
            return this.$store.getters['order/all']
        },
    },
    created(){
        this.pullData()
    },
    methods:{
		pullData(){
			this.$store.dispatch('order/pullAll')
			.then(_=>{
				this.loading=false;
				this.data= this.$store.getters['order/all']//.filter(_=>_.Step >= 2)
			})

			//pull all items in order
			this.$store.dispatch('order/pullAllItems')
		},
    	async handleMark() {

			const porductSelected = this.rowSelected.filter(_=>_.ItemType.toLowerCase() == 'product')
			const componentSelected = this.rowSelected.filter(_=>_.ItemType.toLowerCase() == 'component')

			const [finalResult1,finalResult2] = await Promise.all([
				this.$store.dispatch('order/markToCompleteProduct',porductSelected),
				this.$store.dispatch('order/markToCompleteComponent',componentSelected)
			])
			
			//show message
			functions.$this = this
			functions.message.success()

			//clear selection
			this.rowSelected = []

			//reload data
			this.pullData()
		},
		handleSearch(args){
			this.loading=true

			let fromDate = new Date(args.dateRange == null || args.dateRange == ''? Date() :args.dateRange[0].setHours(0,0,0,999))
			let toDate = new Date(args.dateRange == null || args.dateRange == ''? Date() : args.dateRange[1].setHours(23,59,59,999))

			this.data = this.originalData.filter(function(item){				
				return (args.status == '' || item.Step == args.status || args.status == 0 ) 
				&& ( args.customer == '' || item.CustomerId == args.customer || args.customer == 0)
				&& (args.dateRange == null || args.dateRange == '' || new Date(item.OrderDate) >= fromDate && new Date(item.OrderDate) <= toDate );
			})

			setTimeout(_=>{				
				this.loading=false
			},100)
		  },
		handleExpandChange(row,rowChange){
			// if(rowChange.length > 0)
			// {
			// 	this.dataExpand = this.originalData.filter(function(item){
			// 		return item.Id == row.Id ;
			// 	})
			// }
		},
		handleSelectionChange(val,row){
			let rows = this.rowSelected.filter(function(item){
				return item.OrderId != row.OrderId
			})
			this.rowSelected = rows.concat(val)
			//console.log(this.rowSelected)
			this.isDisabledMark = this.rowSelected.length == 0;
		}
    }
}
</script>
