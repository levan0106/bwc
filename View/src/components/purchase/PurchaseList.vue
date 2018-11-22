<template>
    <el-row>
		  <bwc-grid-data
			highlight-current-row
			:data="data"
			:loading="loading"
			:default-sort = "{prop: 'Id', order: 'descending'}"
			@expand-change="doExpandChange"			
			>
				<el-table-column
					type="expand"
					width="50"
					prop="Id"	>
					<template slot-scope="scope">
						<div :class-name="scope.row.Id" class="panel-container">
							<bwc-grid-data
								:data="purchaseItems.filter(function(item){return item.OrderId == scope.row.Id })"
								:no-paging="true"
								@select="doSelect"
								@select-all="doSelectAll"
								@header-click="doHeaderClick"
								>
								<el-table-column
									width="50"
									type="index"
									>
								</el-table-column>
								<!-- <el-table-column
									type="selection"
									width="70"
									:prop="scope.row.Id.toString()"
									reserve-selection
									:selectable="selectAble"
									>
								</el-table-column>	 -->

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

								<!-- <el-table-column
									prop="UnitId"
									label="Unit">
									<template slot-scope="scope">
										{{ getUnit(scope.row.UnitId)|nullValue  }}
									</template>
								</el-table-column> -->
								<el-table-column
									prop="Discount"
									label="Discount (%)">
									<template slot-scope="scope">
										{{ scope.row.Discount|percent  }}
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
									label="Status"
									width="100">								
									<template slot-scope="scope">
										{{getStep(scope.row.Step)}}
									</template>
								</el-table-column> -->
							</bwc-grid-data>
						</div>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="Id"
					label="Purchase Id"
					sortable
					width="140">
					<template slot-scope="scope">
							<router-link 
							:to="{name:'purchaseDetail',params:{id:scope.row.Id}}">
							<bwc-color :show="scope.row.NeedToReview">
								{{ scope.row.Id }}
							</bwc-color>
							</router-link>	
					</template>
				</el-table-column>

				<el-table-column
					prop="SupplierName"
					sortable
					width="150"
					label="Supplier">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.SupplierName|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="OrderDate"
					sortable
					width="180"
					label="Purchase Date">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.OrderDate|datetime|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="OrderRefNo"
					width="140"
					sortable
					label="Order Ref No">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.OrderRefNo|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>
				
				
				<!-- <el-table-column
					prop="FirtReceiveDate"
					label="Firt Receive Date"
					width="180"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.FirtReceiveDate|date|nullValue }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="UpdateDTS"
					label="Last Update"
					width="180"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.UpdateDTS|date|nullValue }}
						</bwc-color>
					</template>
				</el-table-column> -->

				<!-- <el-table-column
					prop="DeliveryDate"
					label="Delivery Date"
					width="180"
					sortable>
					<template slot-scope="scope">
					{{ scope.row.DeliveryDate|date|nullValue }}
					</template>
				</el-table-column> -->
				
				<el-table-column
					prop="Taxes"
					label="GST (%)"
					width="100"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{scope.row.Taxes | percent}}
						</bwc-color>
					</template>
				</el-table-column>
				
				<el-table-column
					prop="TotalReceived"
					label="Delivery Amount"
					width="160"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.TotalReceived|currency }}
						</bwc-color>
					</template>
				</el-table-column>

				<!-- <el-table-column
					prop="TotalAmount"
					label="Purchase Amount"
					width="170"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.TotalAmount|currency }}
						</bwc-color>
					</template>
				</el-table-column> -->

				<el-table-column
					prop="TotalPaid"
					label="Paid Amount"
					width="140"
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
					width="130"
					sortable>
					<template slot-scope="scope">
						<bwc-color :show="scope.row.NeedToReview">
							{{ scope.row.Balance|currency }}
						</bwc-color>
					</template>
				</el-table-column>

				<el-table-column
					prop="Step"
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
    name:"PurchaseList",
    components:{
		BwcGridData,
		BwcColor
	},
	props:['data','dataExpand','loading'],
	data(){
		return({
			expandId:0,
			rowSelected:{}
		})
	},
	computed:{
		purchaseItems(){
			return this.$store.getters['purchase/purchaseItems']
		}
	},
	created(){
		this.$store.dispatch('purchase/pullAllItems')
	},
	methods:{
		selectAble(row,index){
			return row.Step < 6;
		},
		doExpandChange(row,expandedRows){
			// if(!expandedRows.includes(row)){				
			// //debugger
			// 	//remove all seleted items				
			// 	this.rowSelected = {
			// 		OrderId:row.Id
			// 	}
			// 	this.$emit('selection-change',[],this.rowSelected);
			// }
		},
		doSelect(val,row){
			//debugger
			//this.$emit('selection-change',val,row);
		},
		doSelectAll(val){
			//debugger
			//this.$emit('selection-change',val,this.rowSelected);
		},
		doHeaderClick(column, event){
			// this.rowSelected = {
			// 	OrderId:column.property
			// }
		},
		getStep(id){
			return this.$store.getters['purchase/steps'].filter(item=>item.Value==id)[0].Label
		},
		getUnit(id){
			let unit = this.$store.getters.units.filter(item=>item.Id==id)
			return unit.length > 0 ? unit[0].UnitName :''
		},
		// getRowKey(){
		// 	setTimeout(_=>{				
		// 		let key = Date.now().toString()
		// 		console.log(key)
		// 		return key
		// 	},100)
		// }
	}
}
</script>
