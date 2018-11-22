<template>
    <el-row>
		  <grid-data
			:data="data"
			:loading="loading"
			:default-sort = "{prop: 'Id', order: 'descending'}"
			>
				<el-table-column
					type="index"
					prop="Id"
					width="70">
				</el-table-column>

				<el-table-column
					prop="ProductCode"
					sortable
					label="Product Code">
					<template slot-scope="scope">
						<router-link :to="{name:'productDetail',params:{id:scope.row.Id}}">
							{{ scope.row.ProductCode }}
						</router-link>	
					</template>
				</el-table-column>
				
				<el-table-column
					prop="ProductName"
					sortable
					label="Product Name">
				</el-table-column>
				
				<el-table-column
					prop="CategoryName"
					label="CategoryName">
				</el-table-column>
				
				<el-table-column
					prop="Notes"
					label="Notes">
				</el-table-column>
				<el-table-column
					prop="ActiveStatus"
					label="Status"
					width="80">
					<template slot-scope="scope">
						{{scope.row.ActiveStatus|status}}
					</template>
				</el-table-column>
				<el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                    <template slot-scope="scope">
						
					<router-link :to="{name:'productDetail',params:{id:scope.row.Id}}">
						<el-button type="text" class="el-icon-edit-outline">
						</el-button>
					</router-link>	 | 
                    <bwc-delete-item :delete-id="scope.row.Id" 
                    icon="el-icon-delete" 
                    @do-delete="doDelete"></bwc-delete-item>
                    </template>
                </el-table-column>
		  </grid-data>
		 </el-row>
</template>
<script>
import GridData from '@/components/common/GridData.vue'

export default {
    name:"ProductList",
    components:{
        GridData
	},
	props:['data','loading'],
	methods:{
		doDelete(id){
			this.$emit('do-delete',id)
		}
	}
}
</script>
