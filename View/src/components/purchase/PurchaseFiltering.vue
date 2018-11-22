<template>
  <el-row class="filter-panel">
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
				<span class="demonstration">Purchase Status</span>
				<el-select v-model="filter.status" slot="prepend" placeholder="Select..">
					<el-option v-for="ste in steps" 
					:label="ste.Label" 
					:value="ste.Value" 
					:key="ste.Value"></el-option>
				</el-select>
			</div>
		</el-col>
		<el-col :span="9" class="block">
			<span class="demonstration">Purchase Date</span>
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
				<el-button type="primary" icon="el-icon-search" :disabled="isDisable" @click="doSearch">Search</el-button>
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
				status:0,
			}
        })
	},
	computed:{
		isDisable(){
			return false// this.filter.dateRange == '' && this.filter.supplier == '' && this.filter.status == '' ? true:false;
		},		
		suppliers(){
			let data = [{Id:0,Company:'All Suppliers'}]
			return data.concat(this.$store.getters['supplier/all'])
		},
		steps(){
			let data = [{Value:0,Label:'All Status'}]
            return data.concat(this.$store.getters['purchase/steps'])
        }
	},
	created(){
		this.$store.dispatch('supplier/pullAll') 
	},
    methods:{
        doSearch(){
			this.$emit('doSearch',this.filter);
		}
    }
}
</script>
<style lang="less">
	
	.block {
    text-align: center;
    -ms-flex: 1;
    flex: 1;
	}
	
	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.filter-panel{
		display: flex;
		.button-panel{
			    margin: auto auto 0;
		}
	}
</style>

