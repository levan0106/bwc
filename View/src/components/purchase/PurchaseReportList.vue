<template>
    <bwc-grid-data
	highlight-current-row
	:data="data"
	:loading="loading"
	:show-summary="true"
	:index-text-summary="5"
	:index-show-summary="[6,7,8,9]"
	:value-null-summary="''"
	:pageSize="50"
	:default-sort = "{prop: 'Id', order: 'descending'}">	
		<el-table-column
		type="index"
		width="50">

		</el-table-column>			
		<el-table-column
			prop="Id"
			label="Order Id"
			width="130">
			<template slot-scope="scope">
					<router-link 
					:to="{name:'purchaseDetail',params:{id:scope.row.Id}}">
						{{ scope.row.Id }}
					</router-link>	
			</template>
		</el-table-column>

		<el-table-column
			prop="SupplierName"
			width="140"
			label="Supplier">
			<template slot-scope="scope">
				{{ scope.row.SupplierName|nullValue }}
			</template>
		</el-table-column>
		
		<el-table-column
			prop="OrderDate"
			width="160"
			label="Order Date">
			<template slot-scope="scope">
				{{ scope.row.OrderDate|datetime|nullValue }}
			</template>
		</el-table-column>

		<el-table-column
			prop="OrderRefNo"
			width="130"
			label="Order Ref No">
			<template slot-scope="scope">
				{{ scope.row.OrderRefNo|nullValue }}
			</template>
		</el-table-column>

		<el-table-column
			prop="DeliveryDate"
			width="160"
			label="Invoice Date">
			<template slot-scope="scope">
				{{ scope.row.DeliveryDate|date|nullValue }}
			</template>
		</el-table-column>
		
		<el-table-column
			prop="TotalReceived"
			label="Invoice Amount"
			width="110">
			<template slot-scope="scope">
				{{ scope.row.TotalReceived|currency }}
			</template>
		</el-table-column>

		<el-table-column
			prop="DatePaid"
			width="120"
			label="Paid Date">
			<template slot-scope="scope">
				{{ scope.row.DatePaid|date|nullValue }}
			</template>
		</el-table-column>

		<el-table-column
			prop="TotalPaid"
			label="Paid"
			width="120"	>
			<template slot-scope="scope">
				{{ scope.row.TotalPaid|currency }}
			</template>
		</el-table-column>

		<el-table-column
			prop="Balance"
			label="Balance">
			<template slot-scope="scope">
				{{ scope.row.Balance|currency }}
			</template>
		</el-table-column>
	</bwc-grid-data>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
export default {
	name:"PurchaseReportList",	
    components:{
		BwcGridData,
	},
	props:['loading','data']
}
</script>

<style>

</style>
