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
					width="70px">
				</el-table-column>
				
				<el-table-column
					prop="MaterialName"
					sortable
					label="Material Name">
					<template slot-scope="scope">
						<router-link :to="{name:'materialDetail',params:{id:scope.row.Id}}">{{ scope.row.MaterialName }}</router-link>	
					</template>
				</el-table-column>

				<el-table-column
					prop="SupplierName"
					sortable
					label="Supplier">
				</el-table-column>
				
				<el-table-column
					prop="Description"
					sortable
					label="Description">
				</el-table-column>

				<el-table-column
					prop="Color"
					sortable
					label="Color">
                    <template slot-scope="scope">
						{{scope.row.Color|nullValue}}
                    </template>
				</el-table-column>
				
				<el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                    <template slot-scope="scope">
						
					<router-link :to="{name:'materialDetail',params:{id:scope.row.Id}}">
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
    name:"MaterialtList",
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
