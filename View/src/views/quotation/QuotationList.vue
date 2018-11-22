<template>
    <el-row>
		<bwc-layout menu-id="quotation/list"
		title="Quotation List"
		:bread-crumb="breadCrumb">
			<el-row>
				<router-link to="/quotation/create">
					<el-button type="primary" icon="el-icon-plus">Create</el-button>
				</router-link>
			</el-row>
			<order-filtering v-on:doSearch="handleSearch"></order-filtering>
			<order-list 
				:loading="loading"
				:data="data" 
				from="quotation">
			</order-list>
		</bwc-layout>
    </el-row>  
</template>

<script>
import OrderList from '@/components/order/OrderList.vue'
import OrderFiltering from '@/components/quotation/QuotationFiltering.vue'

export default {
    name:'PurchaseMain',
    components:{
		OrderList,
		OrderFiltering
    },
    data(){
        return({
			loading:true,
			data:[],
			breadCrumb:[
						{href:'/',name:'Home'},
						{href:'/quotation/list',name:'Quotation'},
						{href:'',name:'List'}
					]
			})
		},		
    computed:{
			originalData(){
					return this.$store.getters['quotation/all']//.filter(_=>_.Step == 1)//quotation
				}
    },
    created(){
        this.$store.dispatch('quotation/pullAll')
        .then(_=>{
			this.loading=false;
			this.data= this.originalData
        })   
    },
    methods:{
		handleSearch(args){
			this.loading=true

			this.data = this.originalData.filter(function(item){				
				return ( args.customer == '' || item.CustomerId == args.customer || args.customer == 0)
				&& (args.dateRange == null || args.dateRange == '' || new Date(item.OrderDate) >= args.dateRange[0] && new Date(item.OrderDate) <= args.dateRange[1] )
				
			})

			setTimeout(_=>{				
				this.loading=false
			},200)
		  },
    }
}
</script>
