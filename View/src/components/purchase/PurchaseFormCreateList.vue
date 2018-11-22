<template>
    <el-row>
		<grid-data
			:data="data"
			:loading="loading"
			highlight-current-row
			@current-change="handleCurrentChange"
			:default-sort = "{prop: 'Id', order: 'descending'}"	>
				<el-table-column
				label="Purchase Id"
				sortable>
					<template slot-scope="scope">
						<el-radio v-model="purchaseId" :label="scope.row.Id"></el-radio>
					</template>
				</el-table-column>
				<!-- <el-table-column
					prop="Id"
					label="Purchase Id"
					sortable>
				</el-table-column> -->
				
				<el-table-column
					prop="SupplierName"
					sortable
					label="Supplier Name">
				</el-table-column>
				
				<el-table-column
					prop="OrderDate"
					sortable
					label="Created Date">
					<template slot-scope="scope">
						{{ scope.row.OrderDate|date|nullValue }}
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Step"
					label="Status"
					width="100">
					<template slot-scope="scope">
						{{getStep(scope.row.Step)}}
					</template>
				</el-table-column>
			</grid-data>
          	<el-row class="text-right">			  
                <el-button type="primary" :disabled="isDisabled" @click="saveData">
                    Continue <i class="el-icon-d-arrow-right"></i>
                </el-button>
            </el-row>
		 </el-row>
</template>
<script>
import GridData from '@/components/common/GridData.vue'

export default {
    name:"PurchaseFormCreateList",
    components:{
        GridData
	},
	data(){
		return({
			loading:true,
			purchaseId:0,
			data:[]
		})
	},
	computed:{
		isDisabled(){
			if(this.purchaseId != '' && this.purchaseId > 0)
				return false;
			return true;
		}
	},
	created(){
		this.$store.dispatch('purchase/pullAll')
        .then(_=>{
			this.loading=false;
			this.data= this.$store.getters['purchase/all'].filter(_=>_.Step == 1)
        })
	},
	methods:{			
		doSelectionChange(val){
			this.$emit('selection-change',val);
		},
		getStep(id){
			return this.$store.getters['purchase/steps'].filter(item=>item.Value==id)[0].Label
		},
		async saveData(){
			let self = this
			let productSelected = this.$store.getters['order/productSelected']
			let componentSelected = this.$store.getters['order/componentSelected']
			
			const [finalResult1,finalResult2] = await Promise.all([
				self.$store.dispatch('purchase/addProductFromOrder',{
					purchaseId:self.purchaseId,
					data:productSelected
					}), 
				self.$store.dispatch('purchase/addComponentFromOrder',{
					purchaseId:self.purchaseId,
					data:componentSelected
					})
			]);
						
			window.location.href = window.bwc.rootUrl + '/purchase/'+this.purchaseId+'/detail'
			
		},
		handleCurrentChange(row){
			this.setCurrent(row.Id)
		},
		setCurrent(id){			
			this.purchaseId = id
		}
	}
}
</script>
