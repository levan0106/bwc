<template>
    <bwc-export-core
    :file-name="file"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    <div slot="header">
        <h3>PAYSLIP</h3>
        <br><br>
        <!-- <span>Employee Name: </span>
        <span style="margin-left:120px;display:inline-block;margin-top:-20px">{{ dataExport.EmployeeName}}</span>
        <br>
        <span>Job Title: </span>
        <span style="margin-left:120px;display:inline-block;">{{ dataExport.JobTitle}}</span>
        <br>
        <span>Address: </span> 
        <span style="margin-left:120px;display:inline-block;">{{ dataExport.EmployeeAddress}}</span>
        <br>
        <span>Pay Period: </span> 
        <span style="margin-left:120px;display:inline-block;">{{ filterValue[0]|date}} - {{ filterValue[1]|date}}</span>
        <br>
        <span>Pay On: </span> 
        <span style="margin-left:120px;display:inline-block;">{{ dataExport.SalaryPaidDate|date}}</span> -->
        <table style="fontSize:8px">
            <tr>
                <th>Employee Name</th>
                <th>Job Title</th>
                <th>Address</th>
                <th>Pay Period</th>
                <th>Pay On</th>
            </tr>
            <tr>
                <td>{{ dataExport.EmployeeName}}</td>
                <td>{{ dataExport.JobTitle}}</td>
                <td>{{ dataExport.EmployeeAddress}}</td>
                <td>{{ filterValue[0]|date}} - {{ filterValue[1]|date}}</td>
                <td>{{ dataExport.SalaryPaidDate|date}}</td>
            </tr>
        </table>
    </div>   
    <div slot="content">
        <br><br>
        <table style="fontSize:8px">
            <tr>
                <th>Earning</th>
                <th>Rate</th>
                <th>Hours</th>
                <th>Amount</th>
                <th>YTD</th>
            </tr>
            <tr>
                <td>Normal (Hrs)</td>
                <td>{{ dataExport.Rate|currency}}</td>
                <td>{{ dataExport.TotalHoursInWork|hour}}</td>
                <td>{{ dataExport.NormalAmount|currency}}</td>
                <td>{{ dataExport.NormalAmountYTD|currency}}</td>
            </tr>
            <tr>
                <td>Public Holiday (Hrs)</td>
                <td>{{ dataExport.Rate|currency}}</td>
                <td>{{ dataExport.TotalPublishHolidayHours|hour}}</td>
                <td>{{ dataExport.PublicHolidayAmount|currency}}</td>
                <td>{{ dataExport.PublicHolidayAmountYTD|currency}}</td>
            </tr>
            <tr>
                <td>Sick Leave (Hrs)</td>
                <td>{{ dataExport.Rate|currency}}</td>
                <td>{{ dataExport.TotalSickLeaveHours|hour}}</td>
                <td>{{ dataExport.SickLeaveAmount|currency}}</td>
                <td>{{ dataExport.SickLeaveAmountYTD|currency}}</td>
            </tr>
            <tr>
                <td>Annual Leave (Hrs)</td>
                <td>{{ dataExport.Rate|currency}}</td>
                <td>{{ dataExport.TotalAnnualLeaveHours|hour}}</td>
                <td>{{ dataExport.AnnualLeaveAmount|currency}}</td>
                <td>{{ dataExport.AnnualLeaveAmountYTD|currency}}</td>
            </tr>
        </table>
        
        <table style="fontSize:8px">
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>YTD</th>
            </tr>
            <tr>
                <td>Taxable Income</td>
                <td>{{ dataExport.TaxableIncome|currency}}</td>
                <td>{{ dataExport.TaxableIncomeYTD|currency}}</td>
            </tr>
            <tr>
                <td>Less PAYG</td>
                <td>{{ dataExport.LessPAYG|currency}}</td>
                <td>{{ dataExport.LessPAYGYTD|currency}}</td>
            </tr>
            <tr>
                <td>Net Paid</td>
                <td>{{ dataExport.NetPaidAmount|currency}}</td>
                <td>{{ dataExport.NetPaidAmountYTD|currency}}</td>
            </tr>
        </table>
    </div>
    
    <div slot="footer">
        <span>
            Sick Leave Accumulation: {{ dataExport.SickLeaveYTD|hour}}
        </span>  
        <br>
        <span>
            Annual Leave Accumulation: {{ dataExport.AnnualLeaveYTD|hour}}
        </span> 
        <br>
        <br>
        <h3>
            Employer Super Guarantee
        </h3>  
        <br>
        <span>
            {{ dataExport.SuperannuationName}}
        </span> 
        <br>
        <span>
            Member #: {{ dataExport.SuperannuationMemberNumber}}
        </span> 
        <br>
        <span>Contribution:</span> 
        <span style="margin-left:120px;display:block;">
            <b>This pay: </b> {{ dataExport.Contribution|currency}}
        </span>
        <span style="margin-left:120px;display:block;">
            <b>YTD:      </b> {{ dataExport.ContributionYTD|currency}}
        </span>
    </div>
    </bwc-export-core>
</template>

<script>
import BwcExportCore from "@/components/controls/Export.vue"
import exporter from "@/plugin/exporter" 

export default {
    name:'PaySlipExport',
    components:{
        BwcExportCore
    },
    props:{
        isExport:{
            type:Boolean,
            default:false
        },
        data:{
            type:Array
        },
        filterValue:{
            type:Array
        },
        fileName:{
            type:String
        },
    },
    data(){
        return({
            startExport:false,
            html:null,
            file:this.fileName,
            indexCompleted:0,
            dataExport:{}
        })
    },
    watch:{
        isExport(val){
            if(val){
                this.exportIndex(this.indexCompleted)
            }
        }
    },
    methods:{
        exportComplete(){
            this.startExport=false
            if( this.indexCompleted < this.data.length){ // loop through to export each item          
                this.exportIndex(this.indexCompleted)
            }else{    
                this.indexCompleted = 0            
                this.$emit('export-complete') //raise event when export complete
            }
        },
        exportIndex(index){
            this.dataExport = this.data[index]
            this.file = this.fileName + this.dataExport.EmployeeName 

            this.generateHtml(this.dataExport)
            .then(()=>{                     
                setTimeout(()=>{
                    this.startExport = true                    
                    this.indexCompleted += 1
                },200)  
            })  
        },
        async generateHtml(data){
            let dataExport = []
            dataExport.push(data)

            //return true
            //let self = this
            let div =  exporter.element.div.cloneNode(true);
            //let span =  exporter.element.span.cloneNode(true);
            //let table = exporter.element.table.cloneNode(true);
            let ehtml = exporter.element.html.cloneNode(true);
            let body = exporter.element.body.cloneNode(true);
            let header = exporter.element.header.cloneNode(true);
            //let title = exporter.element.h3.cloneNode(true);
            

            //create container
             let divContainer = div.cloneNode(true)
            // title.style.cssText = "text-align:center"
            // title.innerHTML = 'PAYSLIP'
            // divContainer.appendChild(title)

            // let styles = {
            //     fontSize: "8px",
            //     width: "100%"
            // }
            //  var payslipHeader = [
            //         ['Employee ID','EmployeeId'],
            //         ['Full Name','EmployeeName'],
            //         ['Hours In Work','TotalHoursInWork',formater.hour],
            //         ['Annual Leave','TotalAnnualLeaveHours',formater.hour],
            //         ['Sick Leave','TotalSickLeaveHours',formater.hour],
            //         ['Month','Month',formater.month],
            //         ['Job Title','JobTitle'],
            //         ['Contact Salary/Hours','SalaryPerHours',formater.currency]
            //     ]
            // let payslipHtml = await exporter.readData(dataExport,payslipHeader,styles)
            // divContainer.appendChild(payslipHtml)

            // append conent
            body.appendChild(divContainer)
            //append header
            ehtml.appendChild(header);
            //append body
            ehtml.appendChild(body)
            //set container to object html
            this.html = ehtml
        }
    }
}
</script>

<style>

</style>
