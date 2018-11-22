<template>
    <bwc-export-button 
    :file-name="fileName"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    <div slot="content">
        <div>
            Supplier: <b>{{filterValues.supplierName}}</b>
        </div>
        <div>
            Report Type: <b>{{filterValues.typeName}}</b>
        </div>
        <div v-if="filterValues.dateRange == null || filterValues.dateRange == ''">
            Date Range: <b>All Days</b>
        </div>
        <div v-else>
            Date Range: <b>{{filterValues.dateRange[0]|date}} - {{filterValues.dateRange[1]|date}}</b>
        </div>
    </div>
    </bwc-export-button>
</template>

<script>
import BwcExportButton from "@/components/controls/Export.vue"
import formater from "@/plugin/formater"

export default {
    name:'PurchaseReportExport',
    components:{
        BwcExportButton
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
        filterValues:{
            type:Object
        }
    },
    data(){
        return({
            startExport:false,
            html:null,
        })
    },
    watch:{
        isExport(val){
            if(val){
                this.generateHtml().then(_=>{                        
                    setTimeout(_=>{
                        this.startExport = true
                    },200)  
                })   
            }
        }
    },
    methods:{
        exportComplete(){
            this.startExport=false
            this.$emit('export-complete') //raise event when export complete
        },
        async generateHtml(){
            //return true
            let self = this
            let div =  document.createElement("DIV");
            let table = document.createElement("TABLE");
            let ehtml = document.createElement("HTML");
            let body = document.createElement("BODY");
            let header = document.createElement("HEADER");
            let h2 = document.createElement("H2");
            let h3 = document.createElement("H3");
            let h4 = document.createElement("H4");
            let h5 = document.createElement("H5");
            

            //create container
            let divContainer = div.cloneNode(true)

            // product info
            let divHeader = div.cloneNode(true)            
            divContainer.appendChild(divHeader)

            // read data here
            // get total row
            let totalRow = this.data.length
            let totalReceived = 0
            let totalPaid = 0
            let totalBalance = 0

            if(totalRow > 0){
                
                //list prices
                let tablePrices = table.cloneNode(true)
                tablePrices.style.fontSize = "8px";
                // creat table header
                var headerNames = ['#','Order Id','Supplier','Order Date','Order Ref No','Invoice Date','Invoice','Paid Date','Paid','Balance']
                
                // Create an empty <tr> element and add it to the 1st position of the table:
                let rowTable = tablePrices.insertRow();  
                headerNames.forEach(element => {   
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    let cell = rowTable.insertCell(); 
                    cell.innerHTML = element
                });
                
                // loop row
                for (let row = 0; row <  totalRow; row++) { 
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    let rrowTable = tablePrices.insertRow();
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    let ccell = rrowTable.insertCell();
                    ccell.innerHTML = row + 1
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = this.data[row].Id
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = this.data[row].SupplierName
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.datetime(this.data[row].OrderDate)
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = this.data[row].OrderRefNo
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.date(this.data[row].DeliveryDate)
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.currency(this.data[row].TotalReceived)
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.date(this.data[row].DatePaid)
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.currency(this.data[row].TotalPaid)
                    ccell = rrowTable.insertCell();
                    ccell.innerHTML = formater.currency(this.data[row].Balance)

                    totalReceived += this.data[row].TotalReceived
                    totalPaid += this.data[row].TotalPaid
                    totalBalance += this.data[row].Balance
                    
                }

                    // add total amount
                    let trowTable = tablePrices.insertRow();
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    let tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = 'Total'
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = '<b>'+formater.currency(totalReceived)+'</b>' 
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = ''
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = '<b>'+formater.currency(totalPaid)+'</b>'
                    tcell = trowTable.insertCell();
                    tcell.innerHTML = '<b>'+formater.currency(totalBalance)+'</b>'
                
                divContainer.appendChild(tablePrices)

            }
            
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
