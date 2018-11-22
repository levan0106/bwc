<template>
    <el-row>
        <!-- <bwc-purchase-add-component-modal/> -->
        <el-button icon="el-icon-plus" type="primary" 
        @click="openModal" :disabled="purchase.Step >= 2"> Purchase Item</el-button> 

        <bwc-purchase-add-component-modal 
        :data="data"  
        :component-list="componentList"
        :purchase-id="purchaseId"
        :purchase="purchase"
        :id="id"
        :open="isOpen"
        @close-modal="isOpen=false"
        @save-data="reloadComponent"/>

        <bwc-grid-data
        :data="data"
        :loading="loading"
        no-paging
        :default-sort = "{prop: 'Id', order: 'descending'}">
            <el-table-column
            prop="Id"
            type="index"
            >
            </el-table-column>

            <!-- <el-table-column
            type="selection"
            width="55"
            class-name="no-print"
            label-class-name="no-print">
            </el-table-column> -->

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
                prop="ColorName"
                label="Color">					  
            </el-table-column>
            
            <el-table-column
                prop="Quantity"
                width="100"
                label="Order Qty">
            </el-table-column>

           <el-table-column
                prop="Received"
                width="120"
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
                width="130"
                label="Qty Back Order">
                <template slot-scope="scope">
                    {{(scope.row.Quantity - scope.row.Received)|number}}
                </template>
            </el-table-column>

            <el-table-column
                prop="UnitName"
                width="120"
                label="Unit">
                <template slot-scope="scope">
                    {{scope.row.UnitName|nullValue}}
                </template>
            </el-table-column>

            <el-table-column
                prop="Price"
                label=" Unit Price excl GST">
                <template slot-scope="scope">
                    {{scope.row.Price|currency}}
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
                        @save-data="updateExtPrice"                    
                        v-if="purchase.Step < 6">
                    </bwc-input-action>
                    <span v-else>{{scope.row.ExtendPrice}}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="Discount"
                label="Discount">
                <template slot-scope="scope">
                    {{scope.row.Discount|percent}}
                </template>
            </el-table-column>

            <!-- <el-table-column
                prop="TotalAmount"
                width="120"
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
                    <!-- <el-button type="text" class="el-icon-edit-outline" 
                        @click="editItem(scope.row.Id)" ></el-button> |  -->
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
import BwcPurchaseAddComponentModal from '@/components/purchase/PurchaseAddComponentModal.vue'
import BwcInputAction from '@/components/controls/InputAction.vue'
import functions from '@/plugin/function'

export default {
    name:"PurchaseComponentList",
    components:{
        BwcPurchaseAddComponentModal,
        BwcGridData,
        BwcInputAction
    },
    props:['purchaseId','supplierId','purchase'],
    data(){
        return({
            isOpen:false,
            loading:true,
            id:0
        })
    },
    computed:{
        data(){
            return this.$store.getters['purchase/allComponent']
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
    created(){   
        //get all components by purchase      
        this.$store.dispatch('purchase/pullAllComponent',this.purchaseId)
        .then(_=>{
            this.loading=false
        })
    },
    methods:{
        getComponentList(val){            
            //get component list by supplier
            this.$store.dispatch('component/pullAllBySupplier',val)
            .then(response=>{
                this.loading=false
            })
        },
        openModal(){
            this.isOpen=true
            this.id=0
             this.getComponentList(this.supplierId)
        },
        reloadComponent(form){
            this.isOpen=false;
            this.$store.dispatch('purchase/pullAllComponent',this.purchaseId)
            this.$emit('save-data');
        },
        editItem(id){
            this.isOpen=true
            this.id=id
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('purchase/deleteComponent',id)
            .then(_=>{
                this.$emit('save-data')
                this.$store.dispatch('purchase/pullAllComponent',self.purchaseId)
            })
        },
        updateQuantityReceived(id,number){
            let data = {Id:id,Received:number}
            this.$store.dispatch('purchase/updateComponent',{id:id,data:data})
            .then(_=>{
                this.$emit('save-data');
                
                //show message
                functions.$this = this
                functions.message.success()
            })
        },
        updateExtPrice(id, value){
            let data = {Id:id,ExtendPrice:value}
            this.$store.dispatch('purchase/updateComponent',{id:id,data:data})
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
