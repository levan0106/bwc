<template>
    <div id="export-container" style="display:none;">
        <div id="export-header">
            <slot name="header"></slot>
        </div>
        <div id="export-content">                
            <slot name="content"></slot>
        </div>
        <div id="export-footer">                
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
//import jsPDF from '@/plugin/jspdf.debug.js'

window.html2canvas = html2canvas

export default {
    name:"Export",
    props:{
        fileName:{
            type: String,
            default:'bwc'
        },
        startExport:{
            type:Boolean
        },
        html:{
            type:String|Object
        }
        
    },
    watch:{
        startExport(val){
            if(val){
                this.writeFile()
            }
        }
    },
    methods:{
        writeFile(){
            let self = this
            const config={
                margin:{
                    top:30,
                    left:10,
                    bottom:45,
                    width: '100%'
                },
                top:30,
                fontSize:10,
                fontSizeLarge:14,
                lineHeight: 15
            }
            const doc = new jsPDF('p', 'pt', 'letter');
            doc.setFontSize(config.fontSize)

            // add date time
            var date =new Date(Date());
            let dataTime = date.getDate() + "/" + (date.getMonth()+1)  + "/" + date.getFullYear();
            doc.text(dataTime,config.margin.left,config.top)
            
            // add page number
            var pageCount = doc.internal.getNumberOfPages();
            for(let i = 0; i < pageCount; i++) { 
                doc.setPage(i); 
                doc.text(300,config.top, doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            }

            // add logo
            var myImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABQCAYAAAD7sIxLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RERFRjNBN0FGNERDMTFFNUExREI4MzhCQTIyMTJBRkYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RERFRjNBN0JGNERDMTFFNUExREI4MzhCQTIyMTJBRkYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEREVGM0E3OEY0REMxMUU1QTFEQjgzOEJBMjIxMkFGRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEREVGM0E3OUY0REMxMUU1QTFEQjgzOEJBMjIxMkFGRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqVzw8AABz1SURBVHja7F0JmFTV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'
            
            doc.addImage(myImage, 'png', config.margin.left, config.margin.top, 150, 76);

            //add client information
            doc.setFontSize(config.fontSizeLarge)
            doc.text(200,config.top +(config.lineHeight*2), this.$store.getters.systemInfo.Company)
            doc.setFontSize(config.fontSize)
            doc.text(200,config.top +(config.lineHeight*3), this.$store.getters.systemInfo.Address)
            doc.text(200,config.top +(config.lineHeight*4), 'Tel: '+this.$store.getters.systemInfo.BusinessPhone)
            doc.text(200,config.top +(config.lineHeight*5), this.$store.getters.systemInfo.WebPage)
            doc.text(200,config.top +(config.lineHeight*6), 'Email: '+this.$store.getters.systemInfo.Email)
            doc.setFontSize(config.fontSizeLarge)
            doc.text(200,config.top +(config.lineHeight*7), this.$store.getters.systemInfo.ABN)
            doc.setFontSize(config.fontSize)

            
            let fileName = "BWC_" + this.fileName+"_" + dataTime.replace(new RegExp('/', 'g'), '_').trim() +".pdf"
            const call = () => {
                doc.save(fileName); // download file

                self.$emit('export-complete') //raise event when export complete
            };


            //apend filter values
            let contentExtend = document.getElementById("export-content").cloneNode(true)
            this.html.insertBefore(contentExtend,this.html.firstChild)

            //apend header
            let headerExtend = document.getElementById("export-header").cloneNode(true)
            this.html.insertBefore(headerExtend,this.html.firstChild)
            
            //apend footer
            let footerExtend = document.getElementById("export-footer").cloneNode(true)
            this.html.appendChild(footerExtend)

            doc.fromHTML(
                this.html, 
                config.margin.left, 
                config.top +(config.lineHeight*8), 
                { 
                   'width': config.margin.width, // max width of content on PDF
                   pagesplit: true
                }, 
                call);
         },
    }
}

</script>

<style>

</style>
