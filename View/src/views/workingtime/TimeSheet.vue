<template>
    <bwc-layout menu-id="timesheet" title="Time Sheets" :bread-crumb="breadCrumb">
        <bwc-title>Time Sheets</bwc-title>

        <el-button icon="el-icon-plus" type="primary" @click="modal.isOpen=true"> Add Time Sheet</el-button>
        <el-dialog title="Add Time Sheet" :visible.sync="modal.isOpen" class="modal modal-md">
                <bwc-time-sheet-modal
                :data="employeeList"
                :date="monthSelected"
                @close-modal="modal.isOpen=false"
                @save-data="saveData"></bwc-time-sheet-modal>
        </el-dialog>

        <bwc-time-sheet-filter  @doSearch="doSearch"></bwc-time-sheet-filter>
        
        <bwc-time-sheet-list :data="data" :data-detail="dataDetail" :loading="loading" 
        :month="monthSelected"
        @approve-time-sheet="saveData"></bwc-time-sheet-list>
    </bwc-layout>
</template>

<script>
import BwcTimeSheetList from '@/components/workingtime/TimeSheetList.vue'
import BwcTimeSheetFilter from '@/components/workingtime/TimeSheetFilter.vue'
import BwcTimeSheetModal from '@/components/workingtime/TimeSheetAddEmployeeModal.vue'
import formater from '@/plugin/formater'

export default {
    name:"TimeSheet",
    components:{
        BwcTimeSheetFilter,
        BwcTimeSheetList,
        BwcTimeSheetModal
    },
    data(){
        return({
            data:[],
            dataDetail:{
                regular:[],
                annualLeave:[],
                sickLeave:[],
                publishHoliday:[]
            },
            loading:false,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'',name:'Time Sheet'}
            ],
            monthSelected:'',
            modal:{
                isOpen:false
            }
        })
    },
    computed:{
        employeeList(){
            const data = this.$store.getters['employee/all'].filter(function(item){

                return item.HireDate != null
                && new Date(item.HireDate) < new Date() 
                && (item.LastWorkingDate == null || new Date(item.LastWorkingDate) >= new Date())
            })
            
            //debugger;
            return data;
        }
    },
    created(){
        this.doSearch(Date())
        this.$store.dispatch('employee/pullAll')
    },
    methods:{
        saveData(val){
            this.doSearch(this.monthSelected)
        },
        doSearch(val){
            let self = this 
            this.loading = true
            this.monthSelected = formater.month(val)
            let month = formater.month(val).replace(new RegExp('/', 'g'),'')

            this.$store.dispatch('workingtime/pullTimeSheetDetail',month)
            .then(response=>{  
                if(response.data !=null){
                self.dataDetail.regular = response.data.filter(item=>item.Type == 1) // Regular
                self.dataDetail.annualLeave = response.data.filter(item=>item.Type == 2) // Annual Leave
                self.dataDetail.sickLeave = response.data.filter(item=>item.Type == 3) //Sick Leave
                self.dataDetail.publishHoliday = response.data.filter(item=>item.Type == 4) //Publish Holiday

                }  

                const y = this.monthSelected.substring(this.monthSelected.length - 4, this.monthSelected.length);
                const m = this.monthSelected.substring(0,2);
                const firstDay = new Date(y, parseInt(m) -1 , 1);
                const lastDay = new Date(y, parseInt(m), 0);
                const dateRange = [formater.date(firstDay),formater.date(lastDay)]
                this.$store.dispatch('workingtime/pullAllEmployeeTimeSheet',dateRange)
                .then(response=>{         
                    self.data = response.data       
                    self.loading = false
                    
                    //force reload page
                    this.$store.dispatch('forceReloadPage')
                })
            })

            
        }
    }
}
</script>

<style>

</style>
