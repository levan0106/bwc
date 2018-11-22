<template>
    <el-row>
		<bwc-layout menu-id="purchase/report"
		title="Purchase Report"
		:bread-crumb="breadCrumb">
			<bwc-filtering v-on:doSearch="handleSearch"></bwc-filtering>			
            <el-row v-if="isSearch" class="grid-title">
				<el-col :span="20">
					<h3>
						{{filterValues.supplierName}} - {{filterValues.typeName}}
					</h3>
					<div>
						<div v-if="filterValues.dateRange == null || filterValues.dateRange == ''">
							Date Range: All Days
						</div>
						<div v-else>
							Date Range: {{filterValues.dateRange[0]|date}} - {{filterValues.dateRange[1]|date}}
						</div>
					</div>
				</el-col>
				<el-col :span="4"  class="text-right export-button"  v-if="data.length > 0">
					<el-button-group>
						<el-button type="default" @click="doExportPrices">
							<i class="el-icon-download"></i> Export
						</el-button>
					</el-button-group>
				</el-col>                
                <bwc-purchase-report-export 
                :is-export="isExport"
                :file-name="'purchase_report'"
                :data="data"
				:filter-values="filterValues"
                @export-complete="isExport=false"></bwc-purchase-report-export>
            </el-row>
            <bwc-purchase-report-list
			:data="data"
			:loading="loading">
			</bwc-purchase-report-list>
				
		</bwc-layout>
    </el-row>  
</template>

<script>
import BwcFiltering from '@/components/purchase/PurchaseReportFiltering.vue'
import BwcPurchaseReportExport from '@/components/purchase/PurchaseReportExport.vue'
import BwcPurchaseReportList from '@/components/purchase/PurchaseReportList.vue'

export default {
    name:'PurchaseMain',
    components:{
		BwcFiltering,
		BwcPurchaseReportExport,
		BwcPurchaseReportList
    },
    data(){
        return({
				loading:false,
				data:[],
				breadCrumb:[
					{href:'/',name:'Home'},
					{href:'/purchase/list',name:'Purchase'},
					{href:'',name:'Report'}
				],
                isExport:false,
				filterValues:{},
				isSearch:false
				})
		},
		
    computed:{
		originalData(){
            return this.$store.getters['purchase/all']
        }
    },
    created(){
        // this.$store.dispatch('purchase/pullAll')
        // .then(_=>{
		// 	this.loading=false;
		// 	//this.data= this.$store.getters['purchase/all']
        // })   
    },
    methods:{
		handleSearch(args){
			this.loading = true
			this.isSearch = true

			this.$store.dispatch('purchase/pullAll')
			.then(_=>{
				this.loading=false;
			}) 
			//set filter values
			this.filterValues = args
			this.data = this.originalData.filter(function(item){
			//console.log(item.OrderDate)
				let condition = ( args.supplier == '' || args.supplier == 0 || item.SupplierId == args.supplier )
				if(args.dateRange == null || args.dateRange == ''){				
					return condition
				}
				
				let fromDate = new Date(args.dateRange[0].setHours(0,0,0,999))
				let toDate = new Date(args.dateRange[1].setHours(23,59,59,999))

				if(args.type == 0 || args.type == '' ){ //all Date
					return condition 
					&& ( new Date(item.DatePaid) >= fromDate && new Date(item.DatePaid) <= toDate
					|| new Date(item.OrderDate) >= fromDate && new Date(item.OrderDate) <= toDate
					|| new Date(item.DeliveryDate) >= fromDate && new Date(item.DeliveryDate) <= toDate )
				}else if(args.type == 1){ //Paid Date
					return condition && new Date(item.DatePaid) >= fromDate && new Date(item.DatePaid) <= toDate 
				}else if(args.type == 2){//Order Date
					return condition && new Date(item.OrderDate) >= fromDate && new Date(item.OrderDate) <= toDate 
				}else if(args.type == 3){//Invoice Date
					return condition &&  new Date(item.DeliveryDate) >= fromDate && new Date(item.DeliveryDate) <= toDate
				}
				return condition
			})

			setTimeout(_=>{				
				this.loading=false
			},200)
        },
        
        getStep(id){
            return this.$store.getters['purchase/steps'].filter(item=>item.Value==id)[0].Label
        },
        getUnit(id){
            let unit = this.$store.getters.units.filter(item=>item.Id==id)
            return unit.length > 0 ? unit[0].UnitName :''
        },        
        doExportPrices(){
            this.isExport = true
        },
    }
}
</script>
<style lang="less">
	.grid-title{
		display: flex;
    	flex: 1;
	}
	.export-button{
		margin: auto auto 0;
	}
</style>
