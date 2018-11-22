<template>
  <el-row id="purchase-report-filtering">
		<el-col :span="6" class="block">
			<div>
				<span class="demonstration">Supplier</span>
				<el-select v-model="filter.supplier" slot="prepend" placeholder="Select..">
					<el-option v-for="item in suppliers" 
					:label="item.Company" 
					:value="item.Id"
					:key="item.Id"></el-option>
				</el-select>
			</div>
		</el-col>
		<el-col :span="6" class="block">
			<div>
				<span class="demonstration">Report Type</span>
				<el-select v-model="filter.type" slot="prepend" placeholder="Select..">
					<el-option v-for="ste in types" 
					:label="ste.Label" 
					:value="ste.Value" 
					:key="ste.Value"></el-option>
				</el-select>
			</div>
		</el-col>
		<el-col :span="9" class="block">
			<span class="demonstration">Order Date</span>
			<el-date-picker
			  v-model="filter.dateRange"
			  type="daterange"
			  align="right"
			  unlink-panels
			  range-separator="To"
			  start-placeholder="Start date"
			  end-placeholder="End date"
			  format="dd/MM/yyyy"
			  :picker-options="pickerOptions">
			</el-date-picker>
		</el-col>
		<el-col :span="3" class="block button-panel">
				<el-button type="primary" icon="el-icon-search"  @click="doSearch">Search</el-button>
		</el-col>
	</el-row>
</template>

<script>
export default {
    name:"PurchaseFiltering",
    data(){
        return({
          	pickerOptions: {
				shortcuts: [{
					text: 'Last week',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
					}, {
					text: 'Last month',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
					}, {
					text: 'Last 3 months',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
			filter:{
				dateRange:[],
				supplier:0,
				type:2,
			}
        })
	},
	computed:{	
		suppliers(){
			let data = [{Id:0,Company:'All Suppliers'}]
			return data.concat(this.$store.getters['supplier/all'])
		},
		types(){
			let data = [
				// {Value:0,Label:'All Types'},
				{Value:1,Label:'Paid Date'},
				{Value:2,Label:'Order Date'},
				{Value:3,Label:'Invoice Date'}
				]
            return data
        }
	},
	created(){
		this.$store.dispatch('supplier/pullAll') 
	},
    methods:{
        doSearch(){
			let supplier = this.suppliers.filter(_=>_.Id == this.filter.supplier)[0]
			let type = this.types.filter(_=>_.Value == this.filter.type)[0]

			let filterValues = {
				dateRange: this.filter.dateRange,
				supplier: this.filter.supplier,
				supplierName: supplier.Company,
				type: this.filter.type,
				typeName: type.Label,
			}
			this.$emit('doSearch',filterValues);
		}
    }
}
</script>
<style lang="less">
#purchase-report-filtering{
	display: flex;
    padding: 20px !important;
    border: 1px solid #c0c4cc;
	.button-panel{
		margin: auto auto 0;
		text-align: right!important;
	}
	.block {
		text-align: center;
		-ms-flex: 1;
		flex: none;
	}
	
	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}
}
</style>

