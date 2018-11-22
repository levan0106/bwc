<template>
<div>
		<grid-data
        :data="datas"
        :default-sort = "{prop: 'FirstName', order: 'descending'}"
        :loading="loading" 
        no-paging>
            <el-table-column
                type="index"
                width="30"                
                fixed
                :index="indexMethod"> 
            </el-table-column>

            <el-table-column
                prop="EmployeeName"
                label="Employee"
                width="100"               
                fixed>
                <template slot-scope="scope">
                    <span v-if="!scope.row.IsLabel">
                        {{ scope.row.EmployeeName}}
                    </span>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="TotalHoursInWork"
                label="Total Hours"
                width="160"               
                fixed>
                <template slot-scope="scope">
                    <template v-if="!scope.row.IsLabel">
                        <p style="margin: 0!important;line-height: 30px;">
                            <span style="color:red;width:80px;font-size:11px;display: inline-block;">Regular</span>  
                            <span>{{ scope.row.TotalHoursInWork|hour}}</span></p>
                        <p style="margin: 0!important;line-height: 30px;">
                            <span style="color:green;width:80px;font-size:11px;display: inline-block;">Pubish Holiday</span>
                            <span>{{ scope.row.TotalPublishHolidayHours|hour}}</span></p>
                        <p style="margin: 0!important;line-height: 30px;">
                            <span style="color:blue;width:80px;font-size:11px;display: inline-block;">Annual Leave</span> 
                            <span>{{ scope.row.TotalAnnualLeaveHours|hour}}</span></p>
                        <p style="margin: 0!important;line-height: 30px;">
                            <span style="color:purple;width:80px;font-size:11px;display: inline-block;">Sick Leave</span> 
                            <span>{{ scope.row.TotalSickLeaveHours|hour}}</span></p>                        
                    </template>
                </template>
            </el-table-column>

            <el-table-column
                :label="month"
                :width="widthOfMonthColumn"
                class-name="time-sheet"
                label-class-name="label-time-sheet" >
                <template slot-scope="scope">
                    <table class="el-table">
                        <tbody>
                            <tr>
                                <td v-for="day in daysInMonth" 
                                :key="day"
                                >
                                    <div v-if="scope.row.IsLabel" class="label-days"
                                    :class="disabledField(day)?'day-disable':''" >
                                        <p> {{getDayLabel(day)}} </p>
                                        <b>{{day}}</b>
                                    </div>
                                    <div v-else>                                        
                                    <bwc-time-sheet-column
                                    :data="getItem(scope.row.EmployeeId, day, regular,1)"
                                    @change="onRegularTimeChange">
                                    </bwc-time-sheet-column>

                                    <bwc-time-sheet-column
                                    :data="getItem(scope.row.EmployeeId, day, publishHoliday,4)"
                                    @change="onPublishHolidayTimeChange">
                                    </bwc-time-sheet-column>

                                    <bwc-time-sheet-column
                                    :data="getItem(scope.row.EmployeeId, day, annualLeave,2)"
                                    @change="onAnnualLeaveTimeChange">
                                    </bwc-time-sheet-column>

                                    <bwc-time-sheet-column
                                    :data="getItem(scope.row.EmployeeId, day, sickLeave,3)"
                                    @change="onSickLeaveTimeChange">
                                    </bwc-time-sheet-column>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </el-table-column>
        </grid-data>
        <el-row class="text-right">    
            <el-button icon="el-icon-check" type="success"
            :disabled="datas.length <= 1"
            @click="approveData"> 
                Approve
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>        
            <el-button icon="el-icon-edit-outline" type="primary"
            :disabled="datas.length <= 1"
            @click="saveData"> 
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </el-row>
    </div>
</template>

<script>
import GridData from '@/components/common/GridData.vue'
import BwcTimeSheetColumn from '@/components/workingtime/TimeSheetColumn.vue'
import functions from '@/plugin/function'
import formater from '@/plugin/formater'

export default {
    name:"TimeSheetList",
    components:{
        GridData,
        BwcTimeSheetColumn
    },
    props:['data','dataDetail','loading','month'],
    data(){
        return({
            processing:false,
            regular:this.dataDetail.regular.slice(),
            annualLeave:this.dataDetail.annualLeave.slice(),
            sickLeave:this.dataDetail.sickLeave.slice(),
            publishHoliday:this.dataDetail.publishHoliday.slice(),
            datas:this.data
         })
    },
    computed:{
        widthOfMonthColumn(){
            return this.daysInMonth * 45
        },
        allDayOfMonth(){
            let month = '<span>'+this.month+'</span>'
            return month
        },
        daysInMonth(){
            let year = this.month.substring(4,4)
            let month = this.month.substring(1,2)
            return new Date(year, month, 0).getDate();
        },
        forceReloadPage(){
            return this.$store.getters.forceReloadPage
        }
    },
    watch:{        
        data(val){
            if(val != null){
                let daysInMonthLabel = {IsLabel:true}
                let data = val.slice()
                data.unshift(daysInMonthLabel) // add month item
                this.datas =  data
            }
            //caculate total hours of employee
            this.caculateTotalHours()
        },
        forceReloadPage(){
            this.init()
        }
    },
    methods:{
        init(){
        this.regular = this.dataDetail.regular.slice()
        this.annualLeave = this.dataDetail.annualLeave.slice()
        this.sickLeave = this.dataDetail.sickLeave.slice()
        this.publishHoliday = this.dataDetail.publishHoliday.slice()
        
        //caculate total hours of employee
        this.caculateTotalHours()
        //this.getDayLabel(1)
        },
        getDayLabel(date){
            const month = this.month.substring(0,2)
            const year = this.month.substring(3,7)
            let newDate = new Date(month+'/'+date+'/'+year)
            let day = newDate.getDay()
            
            var weekday = new Array(7);
            weekday[0]=  "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";
            return  weekday[day]
        },
        saveData(){
            this.processing = true
            this.$store.dispatch('workingtime/updateTimeSheet',{
                date:this.month,
                data:this.regular
                })
            .then(()=>{
                this.$store.dispatch('workingtime/updateTimeSheet',{
                date:this.month,
                data:this.annualLeave
                })
                .then(()=>{
                    this.$store.dispatch('workingtime/updateTimeSheet',{
                    date:this.month,
                    data:this.sickLeave
                    })
                    .then(()=>{
                        this.$store.dispatch('workingtime/updateTimeSheet',{
                        date:this.month,
                        data:this.publishHoliday
                        })
                        .then(()=>{
                            this.processing = false                
                        
                            //show message
                            functions.$this = this
                            functions.message.success()
                        })
                    })
                })
            })
        },
        getItem(employeeId,day,dataSource,type){
            let time = dataSource.filter(function(item){
                return item.EmployeeId == employeeId && item.Day == day
            })
            if(time[0] == undefined)
			{
                return {
                    EmployeeId:employeeId,
                    Day:day,
                    Value:'',
                    Month:this.month,
                    Type:type
                }
            }
            return time[0]
        },
        
        disabledField(day){
            var dayText = this.getDayLabel(day)
            return dayText == 'Sun' || dayText == 'Sat'
        },
        onRegularTimeChange(val){
            this.regular = this.regular.filter(i=> i.Day != val.Day || i.EmployeeId != val.EmployeeId)
            this.regular.push(val)

            //caculate total hours of employee
            this.caculateTotalHours()
        },
        onAnnualLeaveTimeChange(val){
            this.annualLeave = this.annualLeave.filter(i=> i.Day != val.Day || i.EmployeeId != val.EmployeeId)
            this.annualLeave.push(val)

            //caculate total hours of employee
            this.caculateTotalHours()
        },
        onSickLeaveTimeChange(val){
            this.sickLeave = this.sickLeave.filter(i=> i.Day != val.Day || i.EmployeeId != val.EmployeeId)
            this.sickLeave.push(val)

            //caculate total hours of employee
            this.caculateTotalHours()
        },
        onPublishHolidayTimeChange(val){
            this.publishHoliday = this.publishHoliday.filter(i=> i.Day != val.Day || i.EmployeeId != val.EmployeeId)
            this.publishHoliday.push(val)

            //caculate total hours of employee
            this.caculateTotalHours()
        },
        indexMethod(index) {
            return index == 0 ? '' : index;
        },
        doCaculate(source,item){            
            const values = source.filter(i => item.EmployeeId == i.EmployeeId).map(j=> Number(j['Value']));
            return values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                }, 0)
        },
        caculateTotalHours(){
			let self = this
			this.datas.some(function(item){
                if(item.IsLabel)
                    return false;
                
                item.TotalHoursInWork = self.doCaculate(self.regular,item)
                item.TotalAnnualLeaveHours = self.doCaculate(self.annualLeave,item)
                item.TotalSickLeaveHours = self.doCaculate(self.sickLeave,item)
                item.TotalPublishHolidayHours = self.doCaculate(self.publishHoliday,item)
			})
        },
        approveData(){
            this.processing = true;
            const y = this.month.substring(this.month.length - 4, this.month.length);
            const m = this.month.substring(0,2);
            const firstDay = new Date(y, parseInt(m) -1 , 1);
            const lastDay = new Date(y, parseInt(m), 0);
            const dateRange = [formater.date(firstDay),formater.date(lastDay)]

            this.$store.dispatch('workingtime/approveTimeSheet',dateRange)
            .then(()=>{
                this.processing = false;
                this.$emit('approve-time-sheet');
            })
        }
    }
    
}
</script>

<style lang="less">
.el-table--enable-row-transition .el-table__body td{
    border: none;
}
.label-time-sheet{
    position: absolute!important;
    width: 100%;
    height: 47px;
}
.time-sheet{
    .el-table td, .el-table th{
        padding: 0!important;
    }
    .input-number {
        width: 40px !important;
        display: flex !important;
        margin: 7px 0;
    }
    .input-number .input__inner {
        padding: 5px 10px;
        width: 100%;
        border: 1px solid #dcdfe6;
    }
    .label-days{
        width: 40px;
        text-align: center;
        display: block;
        p{
            margin:0px
        }
    }
    .day-disable{
        background: darkgray !important;
        & input{
            background: darkgray!important;
            border: none!important;
        }
    }
}
</style>
