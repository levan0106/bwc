<template>
<el-form>
  <el-row style="display:flex">	
    <el-col :span="5"></el-col>	
    <el-col :span="14">
        <el-row :gutter="20" class="filter-panel">	
            <el-col :span="18">
				<el-col :span="12">
					<el-form-item label="From" >
						<el-date-picker
						v-model="filter.from"
						type="date"
						format="dd/MM/yyyy"
						@change="dateChange">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="To" >
						<el-date-picker
						v-model="filter.to"
						type="date"
						format="dd/MM/yyyy"
						@change="dateChange">
						</el-date-picker>
					</el-form-item>
				</el-col>
            </el-col>
            <el-col :span="6" class="button-panel">
                    <el-button type="primary" icon="el-icon-search" :disabled="isDisable" @click="doSearch">Search</el-button>
            </el-col>
        </el-row>
    </el-col>	
    <el-col :span="5"></el-col>	
		
	</el-row>
</el-form>
</template>

<script>
const currentDate = new Date()
export default {
    name:"SalaryPaymentFiltering",
    data(){
        return({ 			       	
			filter:{
				from:currentDate,
				to:currentDate
			}
        })
	},
	computed:{
		isDisable(){
			return this.filter.from == '' 
			|| this.filter.from == null 
			|| this.filter.to == '' 
			|| this.filter.to == null? true:false
		}
	},
	created(){
		this.dateChange(new Date());
	},
    methods:{
        doSearch(){
			this.$emit('doSearch',[this.filter.from,this.filter.to]);
		},
		dateChange(val){
			const week = 2;
			const days = 7 * week;
			let day = val.getDay();
			let date = val.getDate();
			let month = val.getMonth();
			let year = val.getFullYear();
			let weekNumber = this.getWeekNumber(val)[1];
			
			if(weekNumber % 2 == 0){
				day = day + 7;
			}

			let fromDate =  new Date(year,month,date - day);
			let toDate =  new Date(year,month,date - day + days - 1); // - 1 it means current day
			this.filter.from = fromDate;
			this.filter.to = toDate;
		},
		getWeekNumber(d) {
			// Copy date so don't modify original
			d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
			// Set to nearest Thursday: current date + 4 - current day number
			// Make Sunday's day number 7
			d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
			// Get first day of year
			var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
			// Calculate full weeks to nearest Thursday
			var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
			// Return array of year and week number
			return [d.getUTCFullYear(), weekNo];
		}
    }
}
</script>
<style lang="less">
	.filter-panel{
        display: flex;
        padding: 20px !important;
        border: 1px solid #c0c4cc;
		.button-panel{
			margin: auto auto 0;
			padding: 5px;
		}
	}
</style>

