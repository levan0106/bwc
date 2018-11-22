<template>
    <div id="payment">
		<bwc-layout menu-id="purchase/list"
		title="Payment Gateway"
		:bread-crumb="breadCrumb">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-row class="filter-panel" :gutter="20">
						<el-col :span="24" class="filter-item">
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
						<!-- </el-col>
						<el-col :span="7" class="filter-item button-panel"> -->
							<div class="button-panel text-right">
								<el-button type="primary" icon="el-icon-search" @click="doSearch">Search</el-button>
							</div>
						</el-col>
					</el-row>					
                </el-col>
                <el-col :span="12">
					<el-row  class="filter-panel" :gutter="20">
						<el-col :span="8" class="filter-item">
							<div>
								<span class="demonstration">Total Amount</span>
								<bwc-input-currency  v-model="totalPay"
								:disabled="data.length == 0 || paying"
								controls-position="right" class="textbox-fs"></bwc-input-currency>
							</div>
						</el-col>
						<el-col :span="8" class="filter-item">
							<div>
								<span class="demonstration">Payment Type</span>
								<el-select v-model="filter.paymentType" placeholder="Select" 
								class="textbox-fs"
								:disabled="data.length == 0 || paying">
									<el-option
									v-for="item in PaymentTypes"
									:key="item.Id"
									:label="item.PaymentTypeName"
									:value="item.PaymentTypeName">
									</el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :span="8" class="filter-item">
							<div>
								<span class="demonstration">Date Paid</span>
								 <el-date-picker
									v-model="filter.datePaid"
									type="date"
									format="dd/MM/yyyy"
									value-format="yyyy-MM-dd"
									placeholder="Pick a day"
									:disabled="data.length == 0 || paying"></el-date-picker>
							</div>
							<div class="button-panel text-right">
								<el-button type="success"
								@click="doPay"
								:disabled="data.length == 0 || paying || totalPay <= 0">
									<i v-if="paying" class="el-icon-loading"></i>
									<i v-else class="el-icon-tickets"></i>
									Pay
								</el-button>
							</div>
						</el-col>
					</el-row>
				</el-col>
            </el-row>

            <bwc-grid-data
			highlight-current-row
			:data="data"
			:loading="loading"
			:default-sort = "{prop: 'Id', order: 'descending'}"
			no-paging
			>
                <el-table-column
                    type="index">
                </el-table-column>
				<el-table-column
					prop="Id"
					label="Purchase Id">
					<template slot-scope="scope">
						<router-link 
						:to="{name:'purchaseDetail',params:{id:scope.row.Id}}">
							{{ scope.row.Id }}
						</router-link>	
					</template>
				</el-table-column>
				
				<el-table-column
					prop="OrderDate"
					label="Purchase Date">
					<template slot-scope="scope">
						{{ scope.row.OrderDate|date|nullValue }}
					</template>
				</el-table-column>

				<el-table-column
					prop="TotalReceived"
					label="Invoice Amount">
					<template slot-scope="scope">
						{{ scope.row.TotalReceived|currency }}
					</template>
				</el-table-column>

				<el-table-column
					prop="TotalPaid"
					label="Paid Amount">
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

				<el-table-column
					prop="AutoPay"
					label="Auto Pay">
					<template slot-scope="scope">
						<bwc-color :show="scope.row.AutoPay > 0">
						{{ scope.row.AutoPay|currency }}
						</bwc-color>
					</template>
				</el-table-column>

		  </bwc-grid-data>	
		</bwc-layout>
    </div>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcColor from '@/components/controls/Color.vue'
import formater from "@/plugin/formater"

export default {
    name:"PurchasePayment",
    components:{
		BwcGridData,
		BwcColor
    },
    data(){
        return({
			loading:false,
			paying:false,
            breadCrumb:[
                    {href:'/',name:'Home'},
                    {href:'/purchase/list',name:'Purchase'},
                    {href:'',name:'Payment'}
                    ],
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
				dateRange:'',
				amount:0,
				paymentType:'Cash',
				datePaid: new Date()
            },
            data:[],
			totalPay:0
        })
	},
	watch:{
		totalPay(val){
			this.filter.amount = val
			this.autoPay()
		}
	},
	computed:{
		originalData(){
            return this.$store.getters['purchase/all'].filter(_=>_.Step == 4)
        },
		PaymentTypes(){
            return this.$store.getters.paymentType
        }
	},
	methods:{
		doSearch(){
			this.totalPay = 0
			//console.log(this.filter.dateRange)
			const dateRange = [formater.date(this.filter.dateRange[0]),formater.date(this.filter.dateRange[1])]
			//console.log(dateRange)
			this.$store.dispatch('purchase/pullAllByDateRange',dateRange)
			.then(_=>{
				this.loading=false;
				this.data= this.$store.getters['purchase/all'].filter(_=>_.Step == 4) //Invoiced
			}) 
		},
		doPay(){
			let self = this
			this.paying = true
			this.processPaying()
			.then(response=>{					
					self.payDone(response) 
			})
			
		},
		async processPaying(){
			let count = 0
			let self= this		
			await this.data.some(function(item, index, array){
				if(item.AutoPay != undefined && item.AutoPay > 0)
				{
					let itemPay = {
						PaymentType: self.filter.paymentType,
						AmountPaid: item.AutoPay,
						OrderId: item.Id,
						DatePaid: self.filter.datePaid
					}
					self.$store.dispatch('purchase/addPayment',itemPay)
                    .then(resolve=>{  
                    })
                    .catch(error=>{
					})
					item.TotalPaid += item.AutoPay
					array[index] = item
					 
					count ++  
				}
			})
			return count
		},
		payDone(count){
			let message = count + ' orders have been paid.'
			//show message
			//functions.$this = this
			//functions.message.success('Congrats, '+message)
			
			this.paying = false
			//refill to auto refresh data
			this.doSearch()  
		},
		autoPay(){
			let self = this
			let data = this.data
			this.data.some(function(item, index, array){
				//console.log(item)
				//let balance = item.TotalReceived - item.TotalPaid
				if(self.filter.amount > 0 && self.filter.amount >= item.Balance){
					self.filter.amount = self.filter.amount - item.Balance
					item.AutoPay =  item.Balance
					array[index] = item
					//console.log(balance)
				}else{ 
					item.AutoPay = self.filter.amount
					array[index] = item
					//console.log(self.filter.amount)
					self.filter.amount = 0
					//return true
				}
			})
			
			//refill to auto refresh data
			this.data = this.data.filter(function(i){
				return true
			})
		}
	}
}
</script>

<style lang="less">
#payment{
    .filter-panel{
        margin: 20px;
        border: 1px solid #c0c4cc;
        padding: 20px !important;
        .filter-item{
            text-align: center;
        }
	}
	.no-border{
		border: none !important;
	}
	.button-panel{
		margin-top: 10px
	}
}
</style>
