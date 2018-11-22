<template>
    <el-row>
        <el-table
			:data="dataSource"
			v-loading="isLoading"
			:default-sort = "defaultSort"
            :show-summary="showSummary"
            :summary-method="getSummaries"
            header-row-class-name="text-center"
            stripe
			style="width: 100%"
            @expand-change="doExpandChange"
            @sort-change="handleSortChange"
            @selection-change="doSelectionChange"
            @select="doSelect"
            @select-all="doSelectAll"
            @current-change="doCurrentChange"
            @header-click="headerClick"
            :max-height="height"
            :row-key="rowKey"
            :expand-row-keys="expandRowKeys"
            :ref="gridRef"
            :highlight-current-row="highlightCurrentRow"
            >
			<slot></slot>
		</el-table>
        <el-pagination v-if="!noPaging && totalRow > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes=[10,20,50,100]
            :page-size="pageSize"
            layout="sizes, prev, pager, next, jumper"
            :total="totalRow">
        </el-pagination>
    </el-row>
</template>

<script>
export default {
    name:'Grid',
    //props:['data',"defaultSort","noPaging","showSummary","textSummary","valueNullSummary","loading"],
    props:{
        data:{
            type:Array
        },
        height:{
            type:String,
            default:null
        },
        defaultSort:{
            type:Object
        },
        pageSize:{
            type:Number,
            default:20
        },
        noPaging:{
            type:Boolean,
            default:false
        },
        showSummary:{
            type:Boolean,
            default:false
        },
        textSummary:{
            type:String,
            default:'Total'
        },
        indexTextSummary:{
            type:Number,
            default:0
        },
        indexShowSummary:{
            type:Array,
            default:function(){return []}
        },
        valueNullSummary:{
            type:String,
            default:'-'
        },
        loading:{
            type:Boolean,
            default:false
        },
        rowKey:{
            type:Function|String
        },
        expandRowKeys:{
            type:Array
        },
        gridRef:{
            type:String
        },
        highlightCurrentRow:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return({
            currentPageSize:this.pageSize,
            currentPage:1,
            localLoading:false
        })
    },
    computed:{
        isLoading(){
            return this.localLoading || this.loading
        },
        totalRow(){
           return this.data != undefined ? this.data.length:0
        },
        dataSource(){
                if( this.data == undefined || this.data.length == undefined || this.data.length  == 0)
                {
                    return []
                }
                this.localLoading =true;            
                if(this.noPaging)
                {
                    setTimeout(() => {          
                        this.localLoading =false;
                    }, 300);
                    return this.data;
                }
                var start = this.currentPage * this.currentPageSize - this.currentPageSize;
                var self = this;
                var data = this.data.filter(function(item){
                        return self.selectStatus != '' && self.selectStatus != undefined? item.status ==  self.selectStatus:true
                    }).sort(function(a, b) { 
                        return a.Variable1 < b.Variable1 ? 1 : -1; 
                    }).slice(start, start+this.currentPageSize);

                //setTimeout(() => {          
                    this.localLoading =false;
                //}, 300);

                return data;
        }
    },    
    methods:{
         handleSizeChange(val) {
			this.currentPageSize=val;
		  },
		  handleCurrentChange(val) {
			this.currentPage=val;			
          },
          handleSelectionChange(){
              this.localLoading=false;
          },
          handleSortChange(){
              var self = this;
              self.localLoading=true;
              setTimeout(function(){
                  self.localLoading=false;
              },300);
          },
          doExpandChange(row,expandedRows){
              this.$emit('expand-change',row,expandedRows);
          },
          doSelectionChange(val){
              this.$emit('selection-change',val);
          },
          doSelect(val,row){
              this.$emit('select',val,row);
          },
          doSelectAll(val,row){
              this.$emit('select-all',val,row);
          },
          doCurrentChange(currentRow, oldCurrentRow){
              this.$emit('current-change',currentRow, oldCurrentRow);
          },
          headerClick(column, event){
              this.$emit('header-click',column, column);
          },
          getSummaries(param) {
            let self = this
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === this.indexTextSummary) {
                    sums[index] = this.textSummary;
                    return;
                }
                
                const values = data.map(item => Number(item[column.property]));
                const checkShowSummary = this.indexShowSummary.filter(_=>_ === index)
                const isShowSummary = this.indexShowSummary.length == 0 || (checkShowSummary != null && checkShowSummary.length > 0)

                if (!values.every(value => isNaN(value) || value == '') && isShowSummary ) {
                    sums[index] = '$'+ values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                } else {
                    sums[index] = this.valueNullSummary;
                }
            });

            return sums;
        }
    }
}
</script>

<style lang="less">
    .el-pagination{
        margin-top:10px;
    }
    
    .el-table th>.cell {
        word-break: break-word !important;
    }   
    .el-table .cell {
        word-break: break-word !important;
    }
</style>
