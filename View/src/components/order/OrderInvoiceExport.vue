<template>
    <bwc-export-button 
    :file-name="fileName"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    <div slot="content">        
        <div style="font-size:13px;">
            <div>
                <span class="label">INVOICE No: </span>  <b>{{filterValues.InvoiceNo}}</b>
            </div>        
            <div>
                <span class="label">INVOICE SALE: </span> <b>{{filterValues.InvoiceSale}}</b>
            </div>
            <div>
                <span class="label">DATE: </span> <b>{{filterValues.InvoiceDate|date}}</b>
            </div>
            <div>
                <span class="label">PAYMENT TERM: <b>Cash</b> </span>
            </div>
            <div>
                <span class="label">ABN: </span> <b>{{filterValues.ABN}}</b>
            </div> 
            <div>
                <span class="label">REF: </span> <b>{{filterValues.Ref}}</b>
            </div>        
        </div>
    </div>
    <div slot="footer">
        <div style="font-size:12px;">
            <p style="margin-left:450px;">
                Subtotal:       {{filterValues.Subtotal|currency}}
            </p>
            <p style="margin-left:450px;">
                GST:            {{filterValues.GST|percent}}
            </p>
            <p style="margin-left:450px;">
                TOTAL INC GST:  {{filterValues.TotalIncGST|currency}}
            </p>
            <p style="margin-left:450px;">
               AMOUNT APPLIED:  {{filterValues.AmountApplied|currency}}
            </p>
            <p style="margin-left:485px;">
                <b class="label">BALANCE DUE: {{filterValues.BalanceDue|currency}} </b>
            </p>
        </div>
        <p>PAYMENT TO BE MAKE BY</p>
        <p style="font-size:12px;">
            <span>CHEQUE OR BANK TRANSFER TO</span> 
            <br>
           <span>B WINDOW COVERS</span>  
            <br>
            <span>COMMONWEALTH BANK</span> 
            <br>
            <span>BSB: 063 - 171</span> 
            <br>
            <span>ACCOUNT NUMBER: 1095 3748</span>
        </p>
    </div>
    </bwc-export-button>
</template>

<script>
import BwcExportButton from "@/components/controls/Export.vue"
import formater from "@/plugin/formater"
import exporter from "@/plugin/exporter" 

export default {
    name:'OrderInvoiceExport',
    components:{
        BwcExportButton
    },
    props:{
        isExport:{
            type:Boolean,
            default:false
        },
        products:{
            type:Array
        },
        components:{
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
                this.generateHtml().then(()=>{                        
                    setTimeout(()=>{
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
            //let self = this
            let div =  exporter.element.div.cloneNode(true);
            //let span =  exporter.element.span.cloneNode(true);
            //let table = exporter.element.table.cloneNode(true);
            let ehtml = exporter.element.html.cloneNode(true);
            let body = exporter.element.body.cloneNode(true);
            let header = exporter.element.header.cloneNode(true);

            //create container
            let divContainer = div.cloneNode(true)

            // read data here
           
            let styles = {
                fontSize: "9px",
                width: "100%"
            }

            // render product info 
            if(this.products.length > 0){
                let productTitle = div.cloneNode(true) 
                productTitle.style.cssText = "margin-top:30px"
                productTitle.innerHTML = 'Products'         
                divContainer.appendChild(productTitle)

                var porductHeader = [
                    ['Name','ProductName'],
                    ['Color','ColorName'],
                    ['Quantity','Quantity',formater.number],
                    ['Price','UnitPrice',this.caculatePrice]
                ]
                let productHtml = await exporter.readData(this.products,porductHeader,styles)
                divContainer.appendChild(productHtml)
            } 
        
            // render component data  
            if(this.components.length > 0){
                let componentTitle = div.cloneNode(true)                
                componentTitle.innerHTML = 'Other Items'        
                divContainer.appendChild(componentTitle)

                var componentHeaders = [
                    ['Name','ComponentCode'],
                    ['Color','ColorName'],
                    ['Quantity','Quantity',formater.number],
                    ['Price','Price',this.caculatePrice]
                ]
                let componentTable = await exporter.readData(this.components,componentHeaders,styles)
                divContainer.appendChild(componentTable)
            }

            // //create container
            // let divFooter = div.cloneNode(true)

            // let subtotal = span.cloneNode(true)
            // subtotal.innerHTML = "Subtotal:"
            // divFooter.appendChild(subtotal)

            // let subtotalValue = span.cloneNode(true)
            // subtotalValue.style.cssText = "margin-left:100px"
            // subtotalValue.innerHTML = this.filterValues.Subtotal            
            // divFooter.appendChild(subtotalValue)

            // divContainer.appendChild(divFooter)

            // append conent
            body.appendChild(divContainer)
            //append header
            ehtml.appendChild(header);
            //append body
            ehtml.appendChild(body)
            //set container to object html
            this.html = ehtml
        },
        caculatePrice(unitPrice){
            return formater.currency(unitPrice)
        },
    }
}
</script>

<style>
.label{
    color: red;
    width: 100px;
}
</style>
