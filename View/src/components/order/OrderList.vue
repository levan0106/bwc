<template>
    <el-row>
		  <bwc-grid-data
			highlight-current-row
			:data="data"
			:loading="loading"
			:default-sort = "{prop: 'Id', order: 'descending'}"
			@expand-change="doExpandChange">
				<el-table-column
					type="expand"
					width="50"
					prop="Id"
					v-if="from != 'quotation'"	>
					<template slot-scope="scope">
						<div :class-name="scope.row.Id" class="panel-container">
							<bwc-grid-data
								:data="orderItems.filter(function(item){return item.OrderId == scope.row.Id })"
								:no-paging="true"
								@select="doSelect"
								@select-all="doSelectAll"
								@header-click="doHeaderClick">
								<el-table-column
									width="50"
									type="index">
								</el-table-column>
								<el-table-column
									type="selection"
									width="70"
									:prop="scope.row.Id.toString()"
									reserve-selection
									:selectable="selectAble">
								</el-table-column>	

								<el-table-column
									prop="ItemType"
									label="Item Type">
									<template slot-scope="scope">
										{{ scope.row.ItemType }}
									</template>
								</el-table-column>

								<el-table-column
									prop="ItemName"
									label="Item Name">
									<template slot-scope="scope">
										{{ scope.row.ItemName|nullValue }}
									</template>
								</el-table-column>
															
								<el-table-column
									prop="Quantity"
									label="Quantity">
									<template slot-scope="scope">
										{{ scope.row.Quantity|number }}
									</template>
								</el-table-column>
								
								<el-table-column
									prop="Price"
									label="Price">
									<template slot-scope="scope">
									{{ scope.row.Price|currency }}
									</template>
								</el-table-column>

								<el-table-column
									prop="UnitId"
									label="Unit">
									<template slot-scope="scope">
										{{ getUnit(scope.row.UnitId)|nullValue  }}
									</template>
								</el-table-column>

								<el-table-column
									prop="TotalAmount"
									label="Total Amount">
									<template slot-scope="scope">
										{{ scope.row.TotalAmount|currency  }}
									</template>
								</el-table-column>

								<!-- <el-table-column
									prop="Step"
									label="Step">
								</el-table-column>								 -->
							</bwc-grid-data>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Id"
					label="Order Id"
					sortable
					width="140">
					<template slot-scope="scope">
							<router-link 
								:to="{name:'quotationDetail',params:{id:scope.row.Id}}"
								v-if="from == 'quotation'">
								<bwc-color :show="scope.row.NeedToReview">
									{{ scope.row.Id }}
								</bwc-color>
							</router-link>	
							<router-link 
								:to="{name:'orderDetail',params:{id:scope.row.Id}}"
								v-else>
								<bwc-color :show="scope.row.NeedToReview">
									{{ scope.row.Id }}
								</bwc-color>
							</router-link>	
					</template>
				</el-table-column>

				<el-table-column
					prop="CustomerName"
					sortable
					label="Customer Name">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.CustomerName|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="OrderDate"
					sortable
					width="180"
					label="Order Date">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.OrderDate|date|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Taxes"
					label="GST"
					width="100"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{scope.row.Taxes | percent}}
						</bwc-color>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="InvoiceAmount"
					label="Delivery Amount"
					width="160"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.InvoiceAmount|currency }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="TotalPaid"
					label="Paid Amount"
					width="160"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.TotalPaid|currency }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="Balance"
					label="Balance"
					width="160"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.Balance|currency }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="Step"
					width="100"
					label="Status"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{getStep(scope.row.Step)}}
						</bwc-color>
					</template>
				</el-table-column>
		  </bwc-grid-data>		  
		 </el-row>
</template>
<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcColor from '@/components/controls/Color.vue'

export default {
    name:"OrderList",
    components:{
		BwcGridData,
		BwcColor
	},
	props:['data','dataExpand','loading','from'],
	data(){
		return({
			expandId:0,
			rowSelected:{}
		})
	},
	computed:{
		orderItems(){
			return this.$store.getters['order/orderItems']
		}
	},
	created(){
		//this.$store.dispatch('order/pullAllItems')
	},
	methods:{
		selectAble(row,index){
			return row.Step < 3 // 1: new; 2: in-process; 3: complete
		},
		doExpandChange(row,expandedRows){
			if(!expandedRows.includes(row)){				
			//debugger
				//remove all seleted items				
				this.rowSelected = {
					OrderId:row.Id
				}
				this.$emit('selection-change',[],this.rowSelected);
			}
		},
		doSelect(val,row){
			//debugger
			this.$emit('selection-change',val,row);
		},
		doSelectAll(val){
			//debugger
			this.$emit('selection-change',val,this.rowSelected);
		},
		doHeaderClick(column, event){
			this.rowSelected = {
				OrderId:column.property
			}
		},
		getStep(id){
			return this.$store.getters['order/steps'].filter(item=>item.Value==id)[0].Label
		},
		getUnit(id){
			let unit = this.$store.getters.units.filter(item=>item.Id==id)
			return unit.length > 0 ? unit[0].UnitName :''
		},
	}
}
</script>
