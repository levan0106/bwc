<template>
    <el-row>
        <!-- <el-button icon="el-icon-plus" type="primary"></el-button> -->
        
        <el-button icon="el-icon-plus" type="primary" 
        @click="openModal"        
        :disabled="purchase.Step >= 2">Add Product</el-button>  

        <bwc-purchase-add-product-modal
        :data="productList"  
        :purchase-id="purchaseId"
        :purchase="purchase"
        :id="id"
        :open="isOpen"
        @close-modal="isOpen=false"
        @save-data="reloadProduct"/>

        <bwc-grid-data
        :data="data"
        :loading="loading"
        no-paging
        :default-sort = "{prop: 'Id', order: 'descending'}">
            <el-table-column
                prop="Id"
                type="index"
                width="40">
            </el-table-column>

            <el-table-column
                prop="ProductName"
                width="160"
                label="Product name">
            </el-table-column>
            
            <el-table-column
                prop="Drop"
                width="60"
                label="Drop">
            </el-table-column>

            <el-table-column
                prop="Width"
                width="60"
                label="Width">
            </el-table-column>
                            
            <el-table-column
                prop="MaterialName"
                width="170"
                label="Material">					  
            </el-table-column>   
            
            <el-table-column
                prop="ColorName"
                width="100"
                label="Color">	
                <template slot-scope="scope">
                    {{scope.row.ColorName|nullValue}}
                </template>				  
            </el-table-column>             
            
            <el-table-column
                prop="Quantity"
                width="60"
                label="Order Qty">
                <template slot-scope="scope">
                    {{scope.row.Quantity|number}}
                </template>
            </el-table-column>
            
            <el-table-column
                prop="Received"
                width="110"
                label="Qty Receive">
                <template slot-scope="scope">
                    <bwc-input-action 
                        v-model="scope.row.Received" 
                        type="number" 
                        :id="scope.row.Id"
                        @save-data="updateQuantityReceived"
                        v-if="purchase.Step < 6">
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
            </el-table-column>

            <el-table-column
                prop="UnitPrice"
                width="110"
                label="Unit Price">
                <template slot-scope="scope">
                    {{scope.row.UnitPrice|currency}}
                </template>
            </el-table-column>

            <el-table-column
                prop="ExtendPrice"
                width="120"
                label="Ext Price">
                <template slot-scope="scope">
                    <bwc-input-action 
                        v-model="scope.row.ExtendPrice" 
                        type="currency" 
                        :id="scope.row.Id"
                        @save-data="updateExtendPrice"
                        v-if="purchase.Step < 6">
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
                        @click="editItem(scope.row.Id)" :disabled="purchase.Step >= 5"></el-button> | 
                    <bwc-delete-item :delete-id="scope.row.d" icon="el-icon-delete"
                        @do-delete="doDelete(scope.row.Id)" :disabled="purchase.Step >= 2"
                    ></bwc-delete-item>
                </template>
            </el-table-column>
        </bwc-grid-data>
    </el-row>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcPurchaseAddProductModal from '@/components/purchase/PurchaseAddProductModal.vue'
import BwcInputAction from '@/components/controls/InputAction.vue'
import functions from '@/plugin/function'

export default {
    name:"PurchaseProductList",
    components:{
        BwcPurchaseAddProductModal,
        BwcGridData,
        BwcInputAction
    },
    props:['purchaseId','supplierId','purchase'],
    data(){
        return({
            loading:true,
            isOpen:false,
            id:0
        })
    },
    computed:{
        data(){
            return this.$store.getters['purchase/allProduct']
        },
        productList(){
            return this.$store.getters['product/all']
        },
    },
    watch:{
        //get products by supplier
        supplierId(val){
            // this.$store.dispatch('product/pullAllBySupplier',val)
            // .then(response=>{
            //     this.loading=false
            // })
        }
    },
    created(){ 
        //get all products of purchase
        this.$store.dispatch('purchase/pullAllProduct',this.purchaseId)
        .then(_=>{
            this.loading=false
        })
        //get all products
        this.$store.dispatch('product/pullAll')
        .then(_=>{
            this.loading=false
        })
    },
    methods:{
        openModal(){
            this.isOpen=true
            this.id=0
        },
        reloadProduct(form){
            this.isOpen=false;
            this.$store.dispatch('purchase/pullAllProduct',this.purchaseId)
            this.$emit('save-data');
        },
        editItem(id){
            this.isOpen=true
            this.id=id
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('purchase/deleteProduct',id)
            .then(_=>{
                this.$emit('save-data')
                this.$store.dispatch('purchase/pullAllProduct',self.purchaseId)
            })
        },
        updateQuantityReceived(id, number){
            let data = {Id:id,Received:number}
            this.$store.dispatch('purchase/updateProduct',{id:id,data:data})
            .then(_=>{
                this.$emit('save-data');
                //show message
                functions.$this = this
                functions.message.success()
            })
        },
        updateExtendPrice(id, value){
            let data = {Id:id,ExtendPrice:value}
            this.$store.dispatch('purchase/updateProduct',{id:id,data:data})
            .then(_=>{
                this.$emit('save-data');
                //show message
                functions.$this = this
                functions.message.success()
            })
        }
    }
}
</script>

<style>

</style>
