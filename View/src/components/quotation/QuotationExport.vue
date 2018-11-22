<template>
    <bwc-export-button 
    :file-name="fileName"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    </bwc-export-button>
</template>

<script>
import BwcExportButton from "@/components/controls/Export.vue"
import formater from "@/plugin/formater"
import exporter from "@/plugin/exporter" 

export default {
    name:'QuotationExport',
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
                this.generateHtml()
                .then(()=>{                        
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
            //let table = exporter.element.table.cloneNode(true);
            let ehtml = exporter.element.html.cloneNode(true);
            let body = exporter.element.body.cloneNode(true);
            let header = exporter.element.header.cloneNode(true);
            

            //create container
            let divContainer = div.cloneNode(true)


            // read data here
           
            const showIndex = true

            let styles = {
                fontSize: "7px",
                width: "100%"
            }

            // render product info  
            let productTitle = div.cloneNode(true) 
            productTitle.innerHTML = 'Products'         
            divContainer.appendChild(productTitle)

            var porductHeader = [
                ['Name','ProductName'],
                ['Width','Width'],
                ['Drop','Drop'],
                ['Material','MaterialName'],
                ['Location','LocationName'],
                ['Ctl Side','ControlSideName'],
                ['Color','ColorName'],
                ['Quantity','Quantity',formater.number],
                ['Unit Price','UnitPrice',this.caculatePrice],
                ['Discount','Discount',formater.percent,'Grand Total:'],
                ['Total Price','TotalAmount',formater.currency,'sum']
            ]
            let productHtml = await exporter.readData(this.products,porductHeader,styles,showIndex)
            divContainer.appendChild(productHtml)
        
            // render component data  
            let componentTitle = div.cloneNode(true)                
            componentTitle.innerHTML = 'Other Items'        
            divContainer.appendChild(componentTitle)

            var componentHeaders = [
                ['Code','ComponentCode'],
                ['Description','Description'],
                ['Size','Size'],
                ['Color','ColorName'],
                ['Quantity','Quantity',formater.number],
                ['Unit','UnitName'],
                ['Unit Price','Price',this.caculatePrice],
                ['Discount','Discount',formater.percent,'Grand Total:'],
                ['Total Price','TotalAmount',formater.currency,'sum']
            ]
            let componentTable = await exporter.readData(this.components,componentHeaders,styles,showIndex)
            divContainer.appendChild(componentTable)

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

</style>
