<template>
    <el-row>
		  <grid-data
			:data="data"
			:default-sort = "{prop: 'Id', order: 'descending'}"
			:loading="loading"
			>
				<el-table-column
					type="index"
					prop="Id"
					width="70px">
				</el-table-column>
				
				<el-table-column
					prop="Company"
					sortable
					label="Company">
					<template slot-scope="scope">
						<router-link :to="{name:'supplierDetail',params:{id:scope.row.Id}}">
							{{ scope.row.Company}}
						</router-link>	
					</template>
				</el-table-column>
				
				<!-- <el-table-column
					prop="Company"
					sortable
					width="150"
					label="Company">
				</el-table-column> -->

				<el-table-column
					prop="Address"
					sortable
					label="Address">
				</el-table-column>

				<el-table-column
					prop="Email"
					sortable
					label="Email">
				</el-table-column>

				<el-table-column
					prop="BusinessPhone"
					sortable
					label="Business Phone">
					<template slot-scope="scope">
						{{ scope.row.BusinessPhone|nullValue}}
					</template>
				</el-table-column>
				<el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                    <template slot-scope="scope">					
						<router-link :to="{name:'supplierDetail',params:{id:scope.row.Id}}">
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
    name:"SuppliertList",
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
