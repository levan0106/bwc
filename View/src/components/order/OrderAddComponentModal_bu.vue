<template>
    <div id="order-product-modal">       
    <el-dialog title="Add component " :visible.sync="open"  class="modal modal-lg-x">        
        <el-form :model="form" ref="form" status-icon> 
            <bwc-loading :loading="loading">                
                <bwc-grid-data
                :data="components"
                :loading="loading"
                no-paging
                :default-sort = "{prop: 'Id', order: 'descending'}">
                    <el-table-column
                    prop="Id"
                    type="index">
                    </el-table-column>

                    <el-table-column
                        prop="ComponentCode"
                        label="Code">
                    </el-table-column>
                    
                    <el-table-column
                        prop="Description"
                        label="Description">
                        <template slot-scope="scope">
                            {{scope.row.Description|nullValue}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        prop="Color"
                        label="Color">					  
                    </el-table-column>

                    <el-table-column
                        prop="Unit"
                        label="Unit">
                        <template slot-scope="scope">
                            {{scope.row.Unit|nullValue}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="Price"
                        label="Unit Price Excl GST">
                        <template slot-scope="scope">
                            {{scope.row.Price|currency}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        prop="Size"
                        fixed="right"
                        label="Size">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.Size" 
                            controls-position="right" 
                            class="input-number-fs"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="Quantity"
                        fixed="right"
                        label="Ord Qty">
                        <template slot-scope="scope">
                            <bwc-input-number v-model="scope.row.Quantity" 
                            controls-position="right" 
                            class="input-number-fs"></bwc-input-number>
                        </template>
                    </el-table-column>
                </bwc-grid-data>  
            </bwc-loading> 
        </el-form>
        <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>   
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcInputNumber from '@/components/controls/InputNumber.vue'
//import ValidattionRules from '@/plugin/rule'

export default {
    name:"OrderAddComponentModal",
    components:{
        BwcGridData,
        BwcInputNumber
    },
    props:['open','data','orderId','id','componentList'],
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth:'150px',
            form:{
                OrderId:this.orderId,
                Quantity:1,
                UnitId:1,
                Step:1
            }
        })
    }, 
    computed:{
        colors(){
            return this.$store.getters['color/all']
        },
        units(){
            return this.$store.getters.units
        },
        components(){
            let self = this
            let data =[]
            this.componentList.forEach(function(item){
                //debugger
                let newItem = item
                //get component value
                let component = self.data.filter(_=>_.ComponentId == item.Id)
                //set quantity selected
                if( component.length > 0){
                    newItem.Quantity = component[0].Quantity
                newItem.Size = component[0].Size
                }else{
                    newItem.Quantity = 0
                newItem.Size = ''
                }
                
                //add coponent into list
                data.push(newItem)
            })

            return data

        }
    },
    watch:{
        id:function (){
            this.loading=true            
        }
    },
    methods:{
        closeModal(){
            this.$emit('close-modal')
        },
        saveData(){
            //debugger
            let self = this
            const data = this.components.filter(_ => _.Quantity > 0)
            this.$store.dispatch('order/updateListComponent',{id:this.orderId,data:data})
            .then(()=>{       
                this.$emit('save-data');
                self.processing=false
            })
            .catch(()=>{
                self.processing=false
            })
        }
    }
}
</script>

<style>

</style>
