<template>
    <el-row>
        <el-button icon="el-icon-plus" type="primary" @click="openModal"
        :disabled="order.Step >= 3"> Order Item</el-button> 
        <bwc-order-add-component-modal 
        :data="data"  
        :component-list="componentList"
        :order-id="orderId"
        :order="order"
        :component-id="componentId"
        :open="isOpen"
        @close-modal="isOpen=false"
        @save-data="reloadComponent"/>

        <bwc-grid-data
        :data="data"
        :loading="loading"
        no-paging
        :default-sort = "{prop: 'Id', order: 'descending'}"
        @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="35"
            v-if="from == 'order' && order.Step == 2">
            </el-table-column>

            <el-table-column
            prop="Id"
            width="40"
            type="index"
            >
            </el-table-column>

            <el-table-column
                prop="ComponentCode"
                width="120"
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
                prop="Size"
                width="120"
                label="Size">					  
            </el-table-column>
            
            <el-table-column
                prop="Color"
                width="140"
                label="Color">					  
            </el-table-column>
            
            <el-table-column
                prop="Quantity"
                width="100"
                label="Order Qty">
            </el-table-column>

           <!-- <el-table-column
                prop="Received"
                width="120"
                label="Qty Receive"
                v-if="from != 'quotation'">
                <template slot-scope="scope">
                    <bwc-input-action v-model="scope.row.Received" type="number" :id="scope.row.Id"
                        @save-data="updateQuantityReceived"
                        v-if="order.Step < 6">
                    </bwc-input-action>
                    <span v-else>{{scope.row.Received}}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="BackOrder"
                width="100"
                label="Qty Back Order">
                <template slot-scope="scope">
                    {{(scope.row.Quantity - scope.row.Received)|number}}
                </template>
            </el-table-column> -->

            <el-table-column
                prop="UnitName"
                width="120"
                label="Unit">
                <template slot-scope="scope">
                    {{scope.row.UnitName|nullValue}}
                </template>
            </el-table-column>

            <el-table-column
                prop="UnitPrice"
                width="120"
                label="Unit Price">
                <template slot-scope="scope">
                    {{scope.row.Price|currency}}
                </template>
            </el-table-column>

            <el-table-column
                prop="Discount"
                width="100"
                label="Discount">
                <template slot-scope="scope">
                    {{scope.row.Discount|percent}}
                </template>
            </el-table-column>

            <!-- <el-table-column
                prop="TotalAmount"
                width="100"
                label="Total">
                <template slot-scope="scope">
                    {{scope.row.TotalAmount|currency}}
                </template>
            </el-table-column> -->

            <el-table-column
                fixed="right"
                label="Operations"
                width="100"
                class-name="no-print">
                <template slot-scope="scope">
                    <el-button type="text" class="el-icon-edit-outline" 
                    @click="editItem(scope.row.Id)" ></el-button> | 
                    <bwc-delete-item :delete-id="scope.row.Id" icon="el-icon-delete"
                        @do-delete="doDelete(scope.row.Id)"
                        :disabled="order.Step >= 3"
                    ></bwc-delete-item>
                </template>
            </el-table-column>
        </bwc-grid-data>  
    </el-row>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcOrderAddComponentModal from '@/components/order/OrderAddComponentModal.vue'
import BwcInputAction from '@/components/controls/InputAction.vue'
import functions from '@/plugin/function'

export default {
    name:"OrderComponentList",
    components:{
        BwcOrderAddComponentModal,
        BwcGridData,
        BwcInputAction
    },
    props:['orderId','supplierId','order','from'],
    data(){
        return({
            isOpen:false,
            loading:false,
            componentId:0
        })
    },
    computed:{
        data(){
            return this.$store.getters['order/allComponent']
        },
        componentList(){
            return this.$store.getters['component/all']
        },
    },
    watch:{
        supplierId(val){
            this.getComponentList(val)
        },
    },
    mounted(){   
        // //get all components by order      
        // this.$store.dispatch('order/pullAllComponent',this.orderId)
        // .then(_=>{
        //     this.loading=false
        // })
    },
    methods:{
        handleSelectionChange(val){
            this.$emit('selection-change',val)
        },
        getComponentList(){            
            //get component list by supplier
            this.$store.dispatch('component/pullAllBySupplier',0)
            .then(()=>{
                this.loading=false
            })
        },
        openModal(){
            //force reload page
            this.$store.dispatch('forceReloadPage')

            this.isOpen=true
            this.componentId=0
             this.getComponentList(this.supplierId)
        },
        reloadComponent(){
            this.isOpen=false;
            this.$store.dispatch('order/pullAllComponent',this.orderId)
            //this.$emit('save-data');
        },
        editItem(id){
            //force reload page
            this.$store.dispatch('forceReloadPage')

            this.isOpen=true
            this.componentId=id
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('order/deleteComponent',id)
            .then(()=>{
                this.$emit('save-data')
                this.$store.dispatch('order/pullAllComponent',self.orderId)
            })
        },
        // updateQuantityReceived(id,number){
        //     let data = {Id:id,Received:number}
        //     this.$store.dispatch('order/updateComponent',{id:id,data:data})
        //     .then(()=>{
        //         this.$emit('save-data');
               
        //         //show message
        //         functions.$this = this
        //         functions.message.success()
        //     })
        // }
    }
}
</script>

<style>

</style>
