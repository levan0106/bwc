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
					prop="FullName"
					sortable
					label="Name">
					<template slot-scope="scope">
						<router-link :to="{name:'employeeDetail',params:{id:scope.row.Id}}">
							{{ scope.row.FirstName +' '+ scope.row.LastName}}
						</router-link>	
					</template>
				</el-table-column>

				<el-table-column
					prop="Email"
					sortable
					label="Email">
					<template slot-scope="scope">
							{{ scope.row.Email|nullValue}}
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Company"
					sortable
					label="Company">
					<template slot-scope="scope">
						{{ scope.row.Company|nullValue}}
					</template>
				</el-table-column>

				<el-table-column
					prop="Address"
					sortable
					label="Address">
				</el-table-column>

				<el-table-column
					prop="MobilePhone"
					sortable
					label="Mobile Phone">
					<template slot-scope="scope">
						{{ scope.row.MobilePhone|nullValue}}
					</template>
				</el-table-column>

				<el-table-column
					prop="HireDate"
					label="Hire Date">
					<template slot-scope="scope">
						{{ scope.row.HireDate|date|nullValue}}
					</template>
				</el-table-column>

				<el-table-column
					prop="LastWorkingDate"
					label="Last Working Date">
					<template slot-scope="scope">
						{{ scope.row.LastWorkingDate|date|nullValue}}
					</template>
				</el-table-column>
				<el-table-column
                    fixed="right"
                    label="Operations"
                    width="120">
                    <template slot-scope="scope">					
						<router-link :to="{name:'employeeDetail',params:{id:scope.row.Id}}">
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
    name:"EmployeeList",
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
