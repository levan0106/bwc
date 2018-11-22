<template>
    <el-row>
        <!-- <el-button icon="el-icon-plus" type="primary"></el-button> -->
        
        <el-button icon="el-icon-plus" type="primary" 
        @click="openModal"
        :disabled="order.Step >= 3">Add Product</el-button>  
        <bwc-order-add-product-modal
        :data="productList"  
        :order-id="orderId"
        :order="order"
        :id="id"
        :open="isOpen"
        @close-modal="isOpen=false"
        @save-data="reloadProduct"/>

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
                type="index"
                width="40">
            </el-table-column>

            <el-table-column
                prop="ProductName"
                width="180"
                label="Product name">
            </el-table-column>
            
            <el-table-column
                prop="Drop"
                width="70"
                label="Drop">
            </el-table-column>

            <el-table-column
                prop="Width"
                width="70"
                label="Width">
            </el-table-column>
                            
            <el-table-column
                prop="MaterialName"
                width="180"
                label="Material">					  
            </el-table-column>   
            
            <el-table-column
                prop="ColorName"
                label="Color">					  
            </el-table-column>             
            
            <el-table-column
                prop="Quantity"
                width="90"
                label="Order Qty">
                <template slot-scope="scope">
                    {{scope.row.Quantity|number}}
                </template>
            </el-table-column>
            
            <!-- <el-table-column
                prop="Received"
                width="100"
                label="Qty Receive"
                v-if="from != 'quotation'">
                <template slot-scope="scope">
                    <bwc-input-action v-model="scope.row.Received" type="number" 
                        :id="scope.row.Id"
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
                prop="UnitPrice"
                label="Unit Price">
                <template slot-scope="scope">
                    {{scope.row.UnitPrice|currency}}
                </template>
            </el-table-column>

            <el-table-column
                prop="ExtendPrice"
                label="Ext Price">
                <template slot-scope="scope">
                    <bwc-input-action 
                        v-model="scope.row.ExtendPrice" 
                        type="currency" 
                        :id="scope.row.Id"
                        @save-data="updateExtendPrice"
                        v-if="order.Step < 6">
                    </bwc-input-action>
                    <span v-else>{{scope.row.ExtendPrice|currency}}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="Discount"
                label="Discount">
                <template slot-scope="scope">
                    {{scope.row.Discount|percent}}
                </template>
            </el-table-column>
            
            <el-table-column
                fixed="right"
                label="Operations"
                width="100"
                class-name="no-print">
                <template slot-scope="scope">
                    <el-button type="text" class="el-icon-edit-outline" 
                        @click="editItem(scope.row.Id)" :disabled="order.Step >= 6" ></el-button> | 
                    <bwc-delete-item :delete-id="scope.row.d" icon="el-icon-delete"
                        @do-delete="doDelete(scope.row.Id)" :disabled="order.Step >= 3"></bwc-delete-item>
                </template>
            </el-table-column>
        </bwc-grid-data>
    </el-row>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcOrderAddProductModal from '@/components/order/OrderAddProductModal.vue'
import BwcInputAction from '@/components/controls/InputAction.vue'
import functions from '@/plugin/function'

export default {
    name:"OrderProductList",
    components:{
        BwcOrderAddProductModal,
        BwcGridData,
        BwcInputAction
    },
    props:['orderId','supplierId','order','from'],
    data(){
        return({
            loading:true,
            isOpen:false,
            id:0
        })
    },
    computed:{
        data(){
            return this.$store.getters['order/allProduct']
        },
        productList(){
            return this.$store.getters['product/all']
        },
    },
    created(){ 
        // //get all products of order
        // this.$store.dispatch('order/pullAllProduct',this.orderId)
        // .then(_=>{
        //     this.loading=false
        // })
        
        //get all products
        this.$store.dispatch('product/pullAll')
        .then(_=>{
            this.loading=false
        })
    },
    methods:{
        handleSelectionChange(val){
            this.$emit('selection-change',val)
        },
        openModal(){
            this.isOpen=true
            this.id=0
        },
        reloadProduct(form){
            this.isOpen=false;
            this.$store.dispatch('order/pullAllProduct',this.orderId)
            this.$emit('save-data');
        },
        editItem(id){
            this.isOpen=true
            this.id=id
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('order/deleteProduct',id)
            .then(_=>{
                this.$emit('save-data')
                this.$store.dispatch('order/pullAllProduct',self.orderId)
            })
        },
        // updateQuantityReceived(id, number){
        //     let data = {Id:id,Received:number}
        //     this.$store.dispatch('order/updateProduct',{id:id,data:data})
        //     .then(_=>{
        //         this.$emit('save-data');
        //         //show message
        //         functions.$this = this
        //         functions.message.success()
        //     })
        // },
        updateExtendPrice(id, value){
            let data = {Id:id,ExtendPrice:value}
            this.$store.dispatch('order/updateProduct',{id:id,data:data})
            .then(_=>{
                this.$emit('save-data');
                //show message
                functions.$this = this
                functions.message.success()
            })
        },
    }
}
</script>

<style>
input.el-input__inner{
    padding: 0 7px;
}
</style>
