<template>
    <el-row>
		<bwc-layout menu-id="purchase/list"
		title="Purchase List"
		:bread-crumb="breadCrumb">
			<el-row>
				<el-button-group>
					<router-link to="/purchase/create">
						<el-button type="primary" icon="el-icon-plus">Create</el-button>
					</router-link>
					<!-- <el-button type="success" :disabled="isDisabledMark" @click="handleMark">
						<i class="el-icon-check"></i> Mark to complete
					</el-button> -->
				</el-button-group>
			</el-row>
			<bwc-filtering v-on:doSearch="handleSearch"></bwc-filtering>
			<purchase-list 
				:loading="loading"
				:data="data" >
			</purchase-list>
		</bwc-layout>
    </el-row>  
</template>

<script>
import PurchaseList from '@/components/purchase/PurchaseList.vue'
import BwcFiltering from '@/components/purchase/PurchaseFiltering.vue'

export default {
    name:'PurchaseMain',
    components:{
				PurchaseList,
				BwcFiltering
    },
    data(){
        return({
				loading:true,
				data:[],
				breadCrumb:[
						{href:'/',name:'Home'},
						{href:'/purchase/list',name:'Purchase'},
						{href:'',name:'List'}
					]
				})
		},
		
    computed:{
		originalData(){
            return this.$store.getters['purchase/all']
        }
    },
    created(){
        this.$store.dispatch('purchase/pullAll')
        .then(_=>{
			this.loading=false;
			this.data= this.$store.getters['purchase/all']
        })   
    },
    methods:{
		handleSearch(args){
			this.loading=true
			
			let fromDate = new Date(args.dateRange == null || args.dateRange == ''? Date() :args.dateRange[0].setHours(0,0,0,999))
			let toDate = new Date(args.dateRange == null || args.dateRange == ''? Date() : args.dateRange[1].setHours(23,59,59,999))

			this.data = this.originalData.filter(function(item){
				return (args.status == '' || item.Step == args.status || args.status == 0 ) 
				&& ( args.supplier == '' || item.SupplierId == args.supplier || args.supplier == 0)
				&& (args.dateRange == null || args.dateRange == '' || new Date(item.OrderDate) >= fromDate && new Date(item.OrderDate) <= toDate );
			})

			setTimeout(_=>{				
				this.loading=false
			},100)
		  },
    }
}
</script>
