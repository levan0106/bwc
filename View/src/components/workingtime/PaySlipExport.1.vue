<template>
    <bwc-export-core
    :file-name="file"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    <div slot="footer">
            <span>
                EMPLOYMENT INCOME: 
                <br/>
                <b>{{ dataExport.SalaryInGrossBased|currency}}</b>
            </span>            
            <span style="margin-left:350px;display:block;">
                INCOME FOR TAX CALCULATION: 
                <br/>
                <b>{{ dataExport.IncomeForTaxCalculation|currency}}</b>
            </span>
            <br/>
            <span>
                DEDUCTION FOR TAX CALCULATION: 
                <br/>
                <b>{{ dataExport.SocialInsurance|currency}}</b>
                <br/>
                <b>{{ dataExport.HealthInsurance|currency}}</b>
                <br/>
                <b>{{ dataExport.UnEmployementInsurance|currency}}</b>
            </span>
            <span style="margin-left:350px;display:block;">
                    NET INCOME:
                    <br>
                    <b>{{ dataExport.NetIncome|currency}}</b>
                </span>
            <br/>
            <span>                
                PIT:
                <br>
                <b>{{ dataExport.PaidByEmployee|currency}}</b>
                <br>
                <b>{{ dataExport.PaidByEmployer|currency}}</b>
            </span>
                
            <span style="margin-left:350px;display:block;" >
                ADDITION/DEDUCTION: 
                <br/>
                <b>{{ dataExport.AdditionDeduction|currency}}</b>
            </span>
            <br>
            <span>
                NET TAKE HOME: 
                <br/>
                <b>{{ dataExport.NetIncome - dataExport.AdditionDeduction|currency}}</b>
            </span>
        </div>
    </bwc-export-core>
</template>

<script>
import BwcExportCore from "@/components/controls/Export.vue"
import formater from "@/plugin/formater"
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
            this.file = this.fileName + this.dataExport.EmployeeId 

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
            let title = exporter.element.h3.cloneNode(true);
            

            //create container
            let divContainer = div.cloneNode(true)
            title.style.cssText = "text-align:center"
            title.innerHTML = 'PAYSLIP'
            divContainer.appendChild(title)

            let styles = {
                fontSize: "8px",
                width: "100%"
            }
             var payslipHeader = [
                    ['Employee ID','EmployeeId'],
                    ['Full Name','EmployeeName'],
                    ['Hours In Work','TotalHoursInWork',formater.hour],
                    ['Annual Leave','TotalAnnualLeaveHours',formater.hour],
                    ['Sick Leave','TotalSickLeaveHours',formater.hour],
                    ['Month','Month',formater.month],
                    ['Job Title','JobTitle'],
                    ['Contact Salary/Hours','SalaryPerHours',formater.currency]
                ]
            let payslipHtml = await exporter.readData(dataExport,payslipHeader,styles)
            divContainer.appendChild(payslipHtml)

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
