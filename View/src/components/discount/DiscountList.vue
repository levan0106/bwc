<template>
	<grid-data
	:data="data"
	:loading="loading"
	>
		<el-table-column
			type="index"
			prop="Id"
			width="70px">
		</el-table-column>
		
		<el-table-column
			prop="ObjectName"
			sortable
			label="Name">
			<template slot-scope="scope">
				<a @click="doUpdate(scope.row.Id)">
					{{ scope.row.ObjectName}}
				</a>	
			</template>
		</el-table-column>

		<el-table-column
			prop="ProductName"
			sortable
			label="Product Name">
		</el-table-column>

		<el-table-column
			prop="DiscountValue"
			label="Discount (%)">
		</el-table-column>

		<el-table-column
			fixed="right"
			label="Operations"
			width="120"
			>
			<template slot-scope="scope">					
				<el-button type="text" class="el-icon-edit-outline"  
				@click="doUpdate(scope.row.Id)">
				</el-button> | 
				<bwc-delete-item :delete-id="scope.row.Id" 
				icon="el-icon-delete" 
				@do-delete="doDelete"></bwc-delete-item>
			</template>
		</el-table-column>
	</grid-data>
</template>
<script>
import GridData from '@/components/common/GridData.vue'

export default {
    name:"DiscountList",
    components:{
        GridData
	},
	props:['data','loading','discountType'],
    methods:{
        init(){
			
        },
        doDelete(id){
            this.$store.dispatch('discount/delete',id)
            .then(_=>{
				this.$emit('do-delete',id)
            })
        },
		doUpdate(id){
			this.$emit('do-update',id)
		}
    }

}
</script>

<style>

</style>
