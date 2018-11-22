<template>
    <el-row id="salary-payment">
		<grid-data
        :data="data"
        :default-sort = "{prop: 'FirstName', order: 'descending'}"
        :loading="loading"
        no-paging >
            <el-table-column
                type="index"
                prop="Id"
                width="50px">
            </el-table-column>

            <el-table-column
                prop="EmployeeName"
                label="Employee Name"
                width="120">
                <template slot-scope="scope">
                    {{ scope.row.EmployeeName|nullValue}}
                </template>
            </el-table-column>

            <el-table-column
                prop="Rate"
                label="Rate">
                <template slot-scope="scope">
                    {{ scope.row.Rate|currency}}
                </template>
            </el-table-column>
            
            <el-table-column
                prop="TotalHoursInWork"
                label="Normal (Hrs)">
                <template slot-scope="scope">
                    {{ scope.row.TotalHoursInWork|hour}}
                </template>
            </el-table-column>

            <el-table-column
                prop="TotalPublishHolidayHours"
                label="Publish Holiday (Hrs)">
                <template slot-scope="scope">
                    {{ scope.row.TotalPublishHolidayHours|hour}}
                </template>
            </el-table-column>

            <el-table-column
                prop="TotalAnnualLeaveHours"
                label="Annual Leave (Hrs)">
                <template slot-scope="scope">
                    {{ scope.row.TotalAnnualLeaveHours|hour}}
                </template>
            </el-table-column>

            <el-table-column
                prop="TotalSickLeaveHours"
                label="Sick Leave (Hrs)">
                <template slot-scope="scope">
                    {{ scope.row.TotalSickLeaveHours|hour}}
                </template>
            </el-table-column>

            <el-table-column
                prop="NormalAmount"
                label="Normal Amount">
                <template slot-scope="scope">
                    {{ scope.row.NormalAmount|currency}}
                </template>
            </el-table-column>
                <el-table-column
                    prop="PublicHolidayAmount"
                    label="Public Holiday Amount">
                    <template slot-scope="scope">
                        {{ scope.row.PublicHolidayAmount|currency}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SickLeaveAmount"
                    label="Sick Leave Amount">
                    <template slot-scope="scope">
                        {{ scope.row.SickLeaveAmount|currency}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AnnualLeaveAmount"
                    label="Annual Leave Amount">
                    <template slot-scope="scope">
                        {{ scope.row.AnnualLeaveAmount|currency}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="TaxableIncome"
                    label="Taxable Income">
                    <template slot-scope="scope">
                        {{ scope.row.TaxableIncome|currency}}
                    </template>
                </el-table-column>
            <el-table-column
                prop="NetPaidAmount"
                label="Net Paid Amount">
                <template slot-scope="scope">
                    {{ scope.row.NetPaidAmount|currency}}
                </template>
            </el-table-column>
            <el-table-column
                prop="SickLeaveYTD"
                label="Sick Leave YTD">
                <template slot-scope="scope">
                    {{ scope.row.SickLeaveYTD|hour}}
                </template>
            </el-table-column>
            <el-table-column
                prop="AnnualLeaveYTD"
                label="Annual Leave YTD">
                <template slot-scope="scope">
                    {{ scope.row.AnnualLeaveYTD|hour}}
                </template>
            </el-table-column>
            <el-table-column
                prop="Contribution"
                label="Contribution"
                width="110">
                <template slot-scope="scope">
                    {{ scope.row.Contribution|currency}}
                </template>
            </el-table-column>
            <el-table-column
                prop="SalaryPaidDate"
                label="Salary Paid Date"
                width="100">
                <template slot-scope="scope">
                    {{ scope.row.SalaryPaidDate|date|nullValue}}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                prop="LessPAYG"
                label="Less PAYG"
                width="100">
                <template slot-scope="scope">
                    <bwc-input-action v-model="scope.row.LessPAYG" 
                    type="currency" 
                    :id="scope.row.EmployeeId"
                    @change="changeLessPAYG"
                    :showButton="false"
                    v-if="scope.row.LessPAYGStatus != 'Paid'">
                    </bwc-input-action>
                    <span v-else>{{scope.row.LessPAYG|currency}}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                prop="LessPAYGStatus"
                label="Less PAYG Status"
                width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.LessPAYGStatus != 'Paid'">
                    Unpaid
                    </span>  
                    <span v-else>
                    {{ scope.row.LessPAYGStatus|nullValue}}
                    </span>  
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label=""
                width="80">
                <template slot-scope="scope">                    
                    <el-button type="success"
                        :disabled="scope.row.LessPAYGStatus == 'Paid'" 
                        @click="updateLessPAYGStatus(scope.row.Id)">Pay</el-button>
                </template>
            </el-table-column>
        </grid-data>
    </el-row>
</template>

<script>
import GridData from '@/components/common/GridData.vue'
import BwcInputAction from '@/components/controls/InputAction.vue'
import functions from '@/plugin/function'

export default {
    name:"SalaryPaymentList",
    components:{
        GridData,
        BwcInputAction
    },
    props:['data','loading'],
    methods:{
        changeLessPAYG(id,amount){
            let data = {EmployeeId:id,LessPAYG:amount}
            this.$emit('change-less-payg-value',data)
        },
        updateLessPAYGStatus(id){

            this.$store.dispatch('workingtime/updateLessPAYGStatus',{id:id,value:'Paid'})
            .then(response=>{
                this.$emit('do-reload',id,'Paid')
                //show message
                functions.$this = this
                functions.message.success()
            })
        }
    }
}
</script>

<style lang="less">
#salary-payment{
    .el-table__header-wrapper{
        th {
            .cell{
                text-align: center;
            }
        }
    }

}
</style>
