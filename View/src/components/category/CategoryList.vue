<template>
    <el-row>
		<grid-data
		:data="data"
		:loading="loading"
		>
			<el-table-column
				type="index"
				prop="Id"
				width="50px">
			</el-table-column>

			<el-table-column
				prop="CategoryName"
				label="Category Name">
				<template slot-scope="scope">
					<router-link :to="{name:'categoryDetail',params:{id:scope.row.Id}}">
						{{ scope.row.CategoryName }}
					</router-link>	
				</template>
			</el-table-column>

			<el-table-column
				prop="Description"
				label="Description">
			</el-table-column>
			
			<el-table-column
				fixed="right"
				label="Operations"
				width="100">
				<template slot-scope="scope">						
					<router-link :to="{name:'categoryDetail',params:{id:scope.row.Id}}">
						<el-button type="text" class="el-icon-edit-outline">
						</el-button>
					</router-link>	
				</template>
			</el-table-column>
		</grid-data>
	</el-row>
</template>
<script>
import GridData from '@/components/common/GridData.vue'

export default {
    name:"CategoryList",
    components:{
        GridData
		},
		props:['data','loading'],
}
</script>
