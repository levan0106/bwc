<template>
    <bwc-export-button 
    :file-name="fileName"
    :start-export="startExport"
    :html="html"
    @export-complete="exportComplete">
    <!-- <div slot="content">  
        <div v-for="product in products" :key="product.Id">
            <table style="fontSize: '9px'">
                <tr>
                    <th>ID</th>
                    <th>Material</th>
                    <th>Width</th>
                    <th>Drop</th>
                    <th>Quantity</th>
                    <th>Color</th>
                    <th>Tube</th>
                    <th>Tube Type</th>
                    <th>BOTTOM RAIL</th>
                    <th>MATERIAL WIDTH</th>
                    <th>MATERIAL DROP</th>
                    <th>HOOD</th>
                </tr>
                <tr>
                    <th>{{product.Id}}</th>
                    <th>{{product.MaterialName}}</th>
                    <th>{{product.Width}}</th>
                    <th>{{product.Drop}}</th>
                    <th>{{product.Quantity}}</th>
                    <th>{{product.ColorName}}</th>
                    <th>{{product.TubeWidth}}</th>
                    <th>{{product.TubeType}}</th>
                    <th>{{product.BottomRailWidth}}</th>
                    <th>{{product.MaterialWidth}}</th>
                    <th>{{product.MaterialDrop}}</th>
                    <th>{{product.HoodWidth}}</th>
                </tr>
            </table>
        </div>      
    </div> -->
    </bwc-export-button>
</template>

<script>
import BwcExportButton from "@/components/controls/Export.vue"
import formater from "@/plugin/formater"
import exporter from "@/plugin/exporter" 

export default {
    name:'MakerSheetExport',
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
        productComponents:{
            type:Array
        },
        components:{
            type:Array
        },
        fileName:{
            type:String
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
                    },2000)  
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
            let span =  exporter.element.span.cloneNode(true);
            //let table = exporter.element.table.cloneNode(true);
            let ehtml = exporter.element.html.cloneNode(true);
            let body = exporter.element.body.cloneNode(true);
            let header = exporter.element.header.cloneNode(true);

            //create container
            let divContainer = div.cloneNode(true)

            // read data here
           
            const rowTotal = this.products.length + this.components.length
            let rowIndex = 0

            let styles = {
                fontSize: "6px",
                width: "100%"
            }
            // render product info  
            var columns = [
                ['Material','MaterialName','static'],
                ['Width','Width','static'],
                ['Drop','Drop','static'],
                ['Quantity','Quantity','static','40px'],
                ['Color','ColorName','static'],

                ['Tube','TubeWidth'],
                ['Tube Type','TubeType'],
                ['Bottom Rail','BottomRailWidth'],
                ['Material Width','MaterialWidth'],
                ['Material Drop','MaterialDrop'],
                ['Hood','HoodWidth'],
                ['Outer Track','OuterTrackDrop'],
                ['Inner Track','InnerTrackDrop'],
                ['Frame Width','FrameWidth'],
                ['Frame Drop','FrameDrop'],
                ['Mesh Width','MeshWidth'],
                ['Mesh Drop','MeshDrop'],
                ['Keder width','MaterialKederWidth'],
                ['Box Type','BoxTypeDrop'],
                ['Box Length','BoxLength'],
                ['BottomBar Heigh','BottomBarHeight'],
                ['BottomBar Length','BottomBarLength'],
                ['Slat Height','SlatHeight'],
                ['Slat Amount','SlatAmount'],
                ['Slat Length','SlatLenght'],
                ['Axle Length','AxleLenght'],
                ['Guide Length','GuideLenght']
            ]
            var columnsPC = [
                ['No','Id'],
                ['Component','ComponentCode'],
                ['Name','ComponentName'],
                ['Color','ColorName'],
                ['Quantity','Quantity']
            ]
            let tableElement = document.createElement("TABLE");
            tableElement.style.fontSize = styles.fontSize
            tableElement.style.width = styles.width
            // Product
            this.products.forEach((row, index)=>{ 
                rowIndex += 1

                let productTitle = div.cloneNode(true) 
                productTitle.innerHTML = row['ProductName'] 
                + " (" + rowIndex +" of " + rowTotal + " in order)"  
                divContainer.appendChild(productTitle)

                //create table
                let table = tableElement.cloneNode(true)
 
                //render header table
                let rowHeader = table.insertRow();
                let rowContent = table.insertRow();

                columns.forEach((cell, i)=>{ // go to through all cells  
                    
                    // item index  
                    let value=i  

                    for(var property in row){
                        if(cell[1] === property)
                        {
                            let func = cell[2]
                            if(typeof func === "function"){
                                value = func(row[property])
                            }else{                                
                                value = row[property]
                            }

                            break;
                        }
                    }      
                    if(value != 0 || cell[2] === 'static'){
                        let cellHeader = rowHeader.insertCell(); 
                        cellHeader.innerHTML = cell[0] 

                        let cellContent = rowContent.insertCell();
                        cellContent.innerHTML = value 
                        
                        if(cell[3] != undefined){
                            cellHeader.style.width = cell[3]
                            cellContent.style.width = cell[3]
                        }
                    }  

                })                
            
                divContainer.appendChild(table)

                //Product component
                let tablePC = tableElement.cloneNode(true) 
                //render header table
                let rowHeaderPC = tablePC.insertRow();
                columnsPC.forEach((cell, i)=>{ 
                        let cellHeaderPC = rowHeaderPC.insertCell(); 
                        cellHeaderPC.innerHTML = cell[0] 
                    }) 
                const productComponents = this.productComponents.filter(_=>_.ProductId == row['ProductId'])
                productComponents.forEach((row, index)=>{     
                   
                    let rowContentPC = tablePC.insertRow();

                    columnsPC.forEach((cell, i)=>{                        
                        // item index  
                        let value=i  

                        for(var property in row){
                            if(cell[1] === property)
                            {      
                                if(property === 'Id')  {
                                    value = index + 1
                                }    
                                else{
                                    value = row[property]
                                }                
                                break;
                            }
                        }      
                        let cellContentPC = rowContentPC.insertCell();
                        cellContentPC.innerHTML = value 
                    }) 
                })
                divContainer.appendChild(tablePC)
                //End product component

                if(row['CategoryCode'] == 'SECURITY'){
                    let image = document.createElement("IMG")                    

                    let  width = span.cloneNode(true)
                    width.style.display = 'block'
                    width.style.marginLeft = '90px'
                    width.innerHTML  = row['Width']
                    divContainer.appendChild(width)

                    let  height = span.cloneNode(true)
                    height.style.display = 'block'
                    height.style.marginTop = '110px'
                    height.innerHTML  = row['Drop']
                    divContainer.appendChild(height)

                    image.style.display = 'block'
                    image.style.marginLeft = '15px'
                    image.style.marginTop = '-130px'
                    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACqCAYAAABoFzfcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAbiSURBVHja7J1PbBxXHYC/3R3v1l7Ha3td1aUKKICE0hRFonAoXMuBY9xCOSQ9VVxauFRVUeBalDpVL9De27TiTG/0TBG9UBHgkLjqgRAEau3NrmPvP89OD/PGO97uJk6E4qj7fdKTZza7zvg33/7e7719s1NIkgSRUYqGQBRDFEMUQxRDFEOOlCjbKBQKt3tuASgDM6FVQovCfhl4IPycA+aBhVyrhcf2gP8CfwcuAzv547gP3ijV8LeO+/sBOqEVjvhYC0AvHPO3gO8Bq8As0AWawDZwM2y3Qqz7oXXD68fu38kJKYUTnp3kZWAxnOxsvxbkmM3JUQWOhX/rAZ8ASTjIHtAOv/soA52EVgEeCaImE7Lrp8BmOOajph/i9nXgK0GMb4TzshvE2A1y3Ayx7obYN4Ab4TnN3H4LaEV3EcA4Z1gnBCwKmSJ7R2X27eUs3AstEyLOPR4fcYCTnAi7E8TIxM2Cez+IkR3jTmid8LOUE2Mn13bDc3Zz++2R8zUAkkI28zmuKzl9+jTffuwxut3u7fNaeP0f3nsve37WpVRzGWQZWAoH9wlwZe3MGcrlMnEcI3fGA5UKGx9/zF8+/HAJOAU8GGLbyEmRlyA5efIk3338cTqdzuFqjHE8tbbGr8+fZ3Nz8/adczHNtA+vrnLl6lWCgb2Qnsay+tBD/OaVV5idnWVvb88zfYfMz8/z5w8+4OLrrzeAPx3mNefOnuWptTW2t7dv/Ua/Vcb41fnzvPTii2xtbZGrI7J0M9HiYulwWXYwGNzWXLlFP5IkRFFEpVI59Gt6vR79fn/SYKMQuqHOYWuMCPgR8JPQJ/UnFYvdXs8zdq+GJYUCcRzTbrfvSKYJUiRBijLw72ik6s5GB6NZoQx8BzhzmP9Y7n3m+D9zLT/BNROGosth+0DWvw9GDnLvaBdHuotJYjBm+CZfXgbjMsbiBDFkiohGxMhmKBVjyhntSo6RTkAphmIcyBg1oM5welsUg5lQXyiGHBCjHIrPul2JjGaMqsWnjIpRYbiWomRoFCNjLrQKLvlTjNx2lXTF1ZwZQ/JiLAQx5q0xJC9GjXSCaz50J6IYEKTIskbV0ChGPmNUGa7uFsXYLz73SBeRznH/XOshR0D+5HdJV25fJ12YUyW93kCmXIz/MZzc+ixkD1EM/km6yHcG2CC9DkEUg3+QrutcIL0Ez6V8Fp/A8AKhPre4bkSmT4xirhUMjWKIKIYohiiGKIYohiiGKIYohiiGKIYohiiGiGKIYohiiGKIYohiiGKIYohiiGKIYohiiCiGKIYohiiGKIYohiiGKIYohiiGKIYohiiGIRDFkLsWI8FvBJYRMUqkdzaaNZNIXoAB6a0pOviV0VNP/kvmW8BV0js2twA6nQ6Fgt8ePe1idEID4Pjx45w4cYJ+v2+ULD6H/Oy553j27FlarZZRUoyU+vIy9XqdwcBSQzFy/PLll/nx00/TaDSMkGKklMtl6vU6lXLZjKEYKaVSifULF/jhk0+y1Wg4IlEMqFarXHz1VX76zDMUi0XiODY6Dlfh9+++y6lHH2UwGDh/IcOM8f0nniCKItrttlLIMGNk8xVKIROHqyL7YiwuLhJFEUnip+6SE2P94kWazSa1hQXlkKEYF9bXWX/tNbZu3KBWqymHxeeQS++8Q7FY5BcvvMDq6irdbtcIWXymvPX22/z1o4+o1+tmDcU4yOXLl9nY2KBcLhshxRjy2zfe4I/vv8/KyopZQzEOcu3aNa5fv04URUZJMYb87s03eevSJWq1mlGa8lFJKeyXgG4cx7HrPRUDoAZ8EzgG/A34rFQqGSG7EiJgDlgAZgyNYmQkpBcaxXjBkWKMeczxqfixuyiGKIYohiiGKIYohiiGKIYohiiGKIYohohiiGKIYohiiGKIYohiiGKIYohiiGKIYogohiiGKIYohiiGKIYohiiGKIYohiiGKIaIYohiyN2LkeSaKMYXxCjgNwMrRm77EeBhYBVYCoLIlJK/+8APgK+SfsH8f4B/AR1DpBgngK8Be8AKUFEMuxKA2SDGKaCsFGaMjB6wDNSBNuBNVxUDgAawHTLHTUOjGBnboc0Bu4bGGiOjCbSAHesLmSSGt09UjH1aoSvZwZlPxcht3wy1RZv0hnmiGBDqinb4qRiKsU8vZI0W6eynKAYEGVqk8xkWn4qxTz8Un1she8gUE42I0ST9dNWMoRgHxGiFLKIYivGFrgTFkGhM8dm3xpBxXUnbjCGj6zGa+Rqj1+tRKOwv/XQN6BSNVvNiDMh9qrq0tMSDKyvEcZxJERmvqaE88WT//PnnefbcOZrNZlZ/fApsks5z9PFipS8bCVAiXY9z5fMBAGV01RJkZKR9AAAAAElFTkSuQmCC'
                    
                    divContainer.appendChild(image)

                    let br = document.createElement("br")
                    divContainer.appendChild(br)
                    
                }
            })
            //End Product

            // Component
            var columnsC = [
                ['Component','ComponentCode'],
                ['Name','ComponentName'],
                ['Color','ColorName'],
                ['Size','Size'],
                ['Quantity','Quantity']
            ]
            this.components.forEach((row, index)=>{ 
                rowIndex += 1

                let componentTitle = div.cloneNode(true) 
                componentTitle.innerHTML = row['ComponentName'] 
                + " (" + rowIndex +" of " + rowTotal + " in order)"  
                divContainer.appendChild(componentTitle)

                //create table
                let tableC = tableElement.cloneNode(true)
 
                //render header table
                let rowHeaderC = tableC.insertRow();
                let rowContentC = tableC.insertRow();

                columnsC.forEach((cell, i)=>{ // go to through all cells  
                    
                    // item index  
                    let value=i  

                    for(var property in row){
                        if(cell[1] === property)
                        {                              
                            value = row[property]
                            break;
                        }
                    }      
                    let cellHeaderC = rowHeaderC.insertCell(); 
                    cellHeaderC.innerHTML = cell[0] 

                    let cellContentC = rowContentC.insertCell();
                    cellContentC.innerHTML = value                     

                })                
            
                divContainer.appendChild(tableC)

            })
            //End Component

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
