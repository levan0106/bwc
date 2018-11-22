<template>
    <bwc-layout menu-id="salarypayment" title="Salary Payment" :bread-crumb="breadCrumb">
        <bwc-title>Salary Payment</bwc-title>

        <bwc-salary-payment-filter @doSearch="doSearch"></bwc-salary-payment-filter>

        <bwc-salary-payment-list :data="data" :loading="loading"
        @change-less-payg-value="changeLessPAYGValue"
        @do-reload="reloadLessPAYGStatus"></bwc-salary-payment-list>

        <el-row class="text-right">  

            <el-button icon="el-icon-document" type="primary"
            v-if="data.length > 0" 
            @click="doExportPrices"
            :disabled="disableGeneratePayslip"> Generate Payslip</el-button>
            
            <el-button type="success"
            v-if="data.length > 0" 
            @click="updateLessPAYG"
            :disabled="disableLessPAYG">Save Less PAYG</el-button>
        </el-row>
        <bwc-pay-slip-export
            :is-export="isExport"
            :file-name="'payslip_'"
            :data="data"
            :filter-value="filterValue"
            @export-complete="isExport=false"></bwc-pay-slip-export>
    </bwc-layout>
</template>

<script>
import BwcSalaryPaymentList from '@/components/workingtime/SalaryPaymentList.vue'
import BwcSalaryPaymentFilter from '@/components/workingtime/SalaryPaymentFilter.vue'
import BwcPaySlipExport from '@/components/workingtime/PaySlipExport.vue'
import formater from '@/plugin/formater'
import functions from '@/plugin/function'

export default {
    name:"TimeSheet",
    components:{
        BwcSalaryPaymentList,
        BwcSalaryPaymentFilter,
        BwcPaySlipExport
    },
    data(){
        return({
            data:[],
            loading:false,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'',name:'Salary Payment'}
            ],
            isExport:false,
            filterValue:[Date(),Date()],
            listLessPAYG:[],
            disableLessPAYG:false,
            disableGeneratePayslip:false
        })
    },
    created(){
        this.doSearch([Date(),Date()],false)
    },
    methods:{
        doSearch(args,isPaid){   
            this.listLessPAYG = [];         
            this.filterValue = args;
            let dateRange = [formater.date(args[0]),formater.date(args[1])]

            //let date = formater.month(val[]).replace(new RegExp('/', 'g'),'')
            this.$store.dispatch('workingtime/pullAllTimeSheet',{dateRange,isPaid})
            .then(response=>{         
                this.data = response.data       
                this.loading = false
                const lessPAYG = response.data.filter(_=>_.LessPAYGStatus != 'Paid')
                //this.disableGeneratePayslip = lessPAYG.length == 0;
                this.disableLessPAYG = lessPAYG.length == 0;
            })
        },   
        doExportPrices(){
            this.isExport = true;

            this.doSearch(this.filterValue,true);
        },
        changeLessPAYGValue(value){
            this.listLessPAYG = this.listLessPAYG.filter(_=>_.EmployeeId != value.EmployeeId )
            this.listLessPAYG.push(value)
            //console.log(this.listLessPAYG)
        },
        reloadLessPAYGStatus(id,status){
            
            for (var i in this.data) {
                if (this.data[i].Id == id) {
                    this.data[i].LessPAYGStatus = status;
                    break; //Stop this loop, we found it!
                }
            }
        },
        updateLessPAYG(){
            
            let dateRange = [formater.date(this.filterValue[0]),formater.date(this.filterValue[1])]
            let data = {dateRange:dateRange,data:this.listLessPAYG}

            this.$store.dispatch('workingtime/updateLessPAYG',data)
            .then(()=>{
                this.doSearch(this.filterValue)
               
                //show message
                functions.$this = this
                functions.message.success()
            })
        }
    }
}
</script>

<style>

</style>
