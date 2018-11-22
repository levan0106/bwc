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

export default {
    name:"ProductExportPrices",
    components:{
        BwcExportButton
    },
    props:{
        isExport:{
            type:Boolean,
            default:false
        },
        productInfo:{
            type:Object
        },
        fileName:{
            type:String
        }
    },
    data(){
        return({
            startExport:false,
            html:null,
            row:{
                min:5,
                max:20
            },
            column:{
                min:5,
                max:20
            },
            price: {
                    total:{
                        row:5,
                        column:5
                    },
                    items:[]		
            },
            groups:[]
        })
    },
    watch:{
        isExport(val){
            if(val){
               this.getAllPrice(this.productInfo.Id)
                .then(response =>{ 
                    this.generateHtml().then(_=>{                        
                        setTimeout(_=>{
                            this.startExport = true
                        },200)  
                    })    
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
            const config={
                fontSizeXL:'9px',
                fontSizeMD:'7px',
                fontSizeSM:'6px',
                fontSizeSSM:'4px',
                width:'100%'
            }

            //create container
            let divContainer = div.cloneNode(true)

            // product info
            let divHeader = div.cloneNode(true)            
            //divHeader.style.textAlign = "center"; 

            // let divSiteName = div.cloneNode(true)
            // divSiteName.innerHTML = 'BWC System'
            // divHeader.appendChild(divSiteName)
            
            let productCode = h3.cloneNode(true)
            productCode.innerHTML=self.productInfo.ProductCode   
            divHeader.appendChild(productCode)

            let productName = h4.cloneNode(true)
            productName.innerHTML = self.productInfo.ProductName
            divHeader.appendChild(productName)

            divContainer.appendChild(divHeader)

            //add list group
            this.groups.forEach(function(item,index){
                let row=0, column=0
                //group name
                let divGroup = div.cloneNode(true)
                divGroup.innerHTML='Group '+ (index+1) +': '+ item.MaterialName
                divContainer.appendChild(divGroup)

                //get prices by group
                let prices = self.price.items.filter(function(i){
                    return i.ProductId == item.ProductId && i.MaterialId == item.MaterialId
                })
                // get total row
                let rows = prices.filter(function(item){
                    return item.Column == 1
                })
                let totalRow = rows.length

                // get total column
                let columns = prices.filter(function(item){
                    return item.Row == 1
                })
                let totalColumn = columns.length

                if(totalRow > 0 & totalColumn > 0){
                    
                    //list prices
                    let tablePrices = table.cloneNode(true)
                    tablePrices.style.fontSize = totalColumn > 25 ? config.fontSizeSSM : totalColumn > 20 ? config.fontSizeSM : config.fontSizeMD
                    tablePrices.style.width = config.width;
                
                    // loop row
                    for (row = 1; row <=  totalRow; row++) { 
                        // Create an empty <tr> element and add it to the 1st position of the table:
                        let rowTable = tablePrices.insertRow();
                        //loop column
                        for (column = 1; column <= totalColumn; column++) { 
                            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                            let cell = rowTable.insertCell();
                            if(column == 1){
                                cell.style.width = "80px"
                            }
                            if(row == 1 && column == 1){
                                //debugger
                                cell.innerHTML = 'Drop/Width'
                                //cell.style.fontSize = "5px!important"
                            }else{
                                // Add some text to the new cells:
                                let item =  prices.filter(function(item){
                                    return item.Row == row && item.Column == column;
                                });
                                cell.innerHTML = item[0] == undefined ? '' : item[0].Value
                            }
                        }  
                        
                    }
                    
                    divContainer.appendChild(tablePrices)
                }else{
                    //no data found
                    let divNodataFound = div.cloneNode(true)
                    divNodataFound.innerHTML='<i>No data found.</i><br/>'

                    divContainer.appendChild(divNodataFound)
                }
            })

            // add product notes
            let divNote = div.cloneNode(true)
            //divNote.style.width = "300px";
            divNote.innerHTML='<b>Notes:</b> <br/>'+ this.spiltText(this.productInfo.Notes,90)
            divContainer.appendChild(divNote)
            
            // append conent
            body.appendChild(divContainer)
            //append header
            ehtml.appendChild(header);
            //append body
            ehtml.appendChild(body)
            //set container to object html
            this.html = ehtml
            //this.html = body
            //return true
        },
        spiltText(value,number){
            let length = value.length
            let loop = Math.ceil(length/number)
            let val = ''
            let start = 0
            let end = number

            for (var i = 1; i <= loop; ++i) {  
                end  = number * i  
                start = end - number + 1

                val += value.substring(start, end) + '<br/>'
            }
            return val
        },
        async getAllPrice(id){
            let self = this
            
            await self.$store.dispatch('product/pullAllMaterial',id)
            .then(response=>{
                this.groups = this.$store.getters['product/allMaterial']
            })
            await self.$store.dispatch('product/pullAllPrice',id)
            .then(_=>{
                self.price.items = self.$store.getters['product/allPrice']
            })
        },       
    }
}
</script>

<style>

</style>
