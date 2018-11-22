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
					width="50px">
				</el-table-column>
				
				<el-table-column
					prop="ComponentCode"
					label="Component Code">
					<template slot-scope="scope">
						<router-link :to="{name:'componentDetail',params:{id:scope.row.Id}}">
							{{ scope.row.ComponentCode }}
						</router-link>	
					</template>
				</el-table-column>

				<el-table-column
					prop="SupplierName"
					label="Supplier">
				</el-table-column>

				<el-table-column
					prop="ComponentName"
					label="Component Name">
				</el-table-column>
				
				<el-table-column
					prop="Unit"
					width="100"
					label="Unit">
				</el-table-column>
				
				<el-table-column
					prop="Description"
					label="Description">
				</el-table-column>

				<el-table-column
					prop="Price"
					label="Unit Price (Exc GST)">
					<template slot-scope="scope">
						{{scope.row.Price|currency}}
					</template>
				</el-table-column>

				<el-table-column
					prop="PurchasePrice"
					label="Purchase Unit Price (Exc GST)">
					<template slot-scope="scope">
						{{scope.row.PurchasePrice|currency}}
					</template>
				</el-table-column>

				<el-table-column
					prop="Discount"
					label="Discount (%)">
					<template slot-scope="scope">
						{{scope.row.Discount|percent}}
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Color"
					label="Color">
				</el-table-column>
				
				<el-table-column
                    fixed="right"
                    label="Operations"
                    width="100">
                    <template slot-scope="scope">						
						<router-link :to="{name:'componentDetail',params:{id:scope.row.Id}}">
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
    name:"ComponentList",
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
