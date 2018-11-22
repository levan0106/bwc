<template>
<bwc-layout menu-id="order/list" title="Order Detail" 
    :bread-crumb="breadCrumb"
    back-to='/order/list'
    back-to-label="Order List" >
    <el-row :gutter="20">
        <el-col :span="19">
            <bwc-process :active="stepActive" :steps="stepList"/>
        </el-col>
        <el-col :span="5">
            <div class="order-total shadow-box">
                <span>Total Amount</span>
                <h3>{{orderInfo.TotalAmount|currency}}</h3>
            </div>
        </el-col>
    </el-row>
        <el-row>
            <bwc-order-information :id="id" :data="orderInfo" :loading="loading"/>
            <bwc-order-payment-information :order-id="id"/>
        </el-row>
        
        <bwc-title>Products</bwc-title>
        <bwc-order-product-list 
        from="order"
        :order-id="id"
        :order="orderInfo"
        :supplier-id="orderInfo.SupplierId"  
        @save-data="loadOrderInfo"
        @selection-change="handleSelectProduct"
        ></bwc-order-product-list>

        <bwc-title>Other items</bwc-title>
        <bwc-order-component-list 
        from="order"
        :order-id="id"
        :order="orderInfo"
        :supplier-id="orderInfo.SupplierId"   
        @save-data="loadOrderInfo"   
        @selection-change="handleSelectComponent"  
        ></bwc-order-component-list>
        <br/>
        <el-row class="pos-fixed-bottom">
            <el-button-group>
                <el-button v-if="orderInfo.Step == 1" type="success" @click="updateStep(2)" >
                    <i class="el-icon-check"></i> In-progress
                </el-button> 
                <el-button v-if="orderInfo.Step == 2" type="success" @click="updateStep(3)" >
                    <i class="el-icon-check"></i> Deliver
                </el-button> 
                <el-button v-if="orderInfo.Step == 3" type="success" @click="updateStep(4)" >
                    <i class="el-icon-check"></i> Installed
                </el-button> 
                <el-button v-if="orderInfo.Step == 4" :type="'success'" @click="updateStep(5)" >
                    <i class="el-icon-check"></i> Invoiced
                </el-button>  
                <el-button v-if="orderInfo.Step == 5" :type="'success'" @click="updateStep(6)" >
                    <i class="el-icon-check"></i> Close
                </el-button>     
                <el-button type="primary" 
                    :icon="isMakerSheetExport?'el-icon-loading':'el-icon-printer'" 
                    v-if="orderInfo.Step <= 2"
                    @click="printMakerSheet" >
                    Print Maker Sheet
                </el-button>
                <el-button type="primary" icon="el-icon-plus"
                v-if="orderInfo.Step <= 2"
                :disabled=" componentSelected.length == 0 && productSelected.length == 0"
                @click="addToPurchase">
                    <router-link :to="{name:'purchaseCreateFrom',params:{from:'order'}}">
                        Add to Purchase
                    </router-link>
                </el-button>
                <el-button type="primary" 
                icon="el-icon-plus"
                v-if="orderInfo.Step == 4"
                @click="createInvoice">
                    Create Invoice
                </el-button>                
                <el-button type="primary" icon="el-icon-view">
                    <router-link :to="{name:'serviceList'}">
                        Services
                    </router-link>
                </el-button>
            </el-button-group>
        </el-row>
        
        <bwc-maker-sheet-export
            :is-export="isMakerSheetExport"
            :file-name="'MakerSheet_' + id "
            :products="makerSheetProducts"
            :product-components="makerSheetProductComponents"
            :components="makerSheetComponents"
            @export-complete="isMakerSheetExport=false">
        </bwc-maker-sheet-export>

        <bwc-order-invoice-export
                :is-export="isExport"
                :file-name="'Invoice_' + id"
                :products="products"
                :components="components"
				:filter-values="filterValues"
                @export-complete="isExport=false"></bwc-order-invoice-export>
    </bwc-layout>
    
</template>

<script>
import BwcProcess from '@/components/common/Process.vue'
import BwcOrderInformation from '@/components/order/OrderInformation.vue'
import BwcOrderPaymentInformation from '@/components/order/OrderPaymentInformation.vue'
import BwcOrderProductList from '@/components/order/OrderProductList.vue'
import BwcOrderComponentList from '@/components/order/OrderComponentList.vue'
import functions from '@/plugin/function'
import BwcOrderInvoiceExport from '@/components/order/OrderInvoiceExport.vue'
import BwcMakerSheetExport from '@/components/order/MakerSheetExport.vue'

export default {
    name:'OrderDetail',
    components:{
        BwcProcess,
        BwcOrderInformation,
        BwcOrderPaymentInformation,
        BwcOrderProductList,
        BwcOrderComponentList,
        BwcOrderInvoiceExport,
        BwcMakerSheetExport
    },
    props:['id'],
    data(){
        return({
            loading:true,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/order/list',name:'Order'}
            ],
            productSelected:[],
            componentSelected:[],
            
            isExport:false,
            isMakerSheetExport:false,
            filterValues:{},
            makerSheetProducts:[],
            makerSheetComponents:[],
            makerSheetProductComponents:[]
        })
    },
    computed:{
        stepList(){
            return this.$store.getters['order/steps']
        },
        stepActive(){
            return this.$store.getters['order/info'].Step
        },
        orderInfo(){
            return this.$store.getters['order/info']
        },
        products(){
            return this.$store.getters['order/allProduct']
        },        
        components(){
            return this.$store.getters['order/allComponent']
        }
    },
    created(){
        this.loadOrderInfo()
    },
    methods:{
        handleSelectProduct(val){
            this.productSelected = val
        },
        handleSelectComponent(val){
            this.componentSelected = val
        },
        addToPurchase(){
            this.$store.dispatch('order/componentSelected',this.componentSelected)
            this.$store.dispatch('order/productSelected',this.productSelected)

            window.location.href = this.$store.getters.rootUrl + "purchase/create/order"
        },
        loadOrderInfo(){
            this.$store.dispatch('order/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false;  
            })
            //get all products of order
            this.$store.dispatch('order/pullAllProduct',this.id)
            .then(_=>{
            })
            //get all components by order      
            this.$store.dispatch('order/pullAllComponent',this.id)
            .then(_=>{
            })
        },
        printMakerSheet(){
            this.$store.dispatch('order/pullMakerSheet',this.id)
            .then(response=>{
                //console.log(response.data)
                this.makerSheetProducts = response.data.p
                this.makerSheetProductComponents = response.data.pc
                this.makerSheetComponents = response.data.c
                this.isMakerSheetExport = true
            })
                
        },
        updateStep(step){
            let sefl=this
            let Order = {Step:step}
            this.$store.dispatch('order/update',{id:this.id,data:Order})
            .then(response=>{
                sefl.$store.dispatch('order/pullInfo',sefl.id) 
                .then(()=>{                
                    sefl.loading=false;  
                    
                    //show message
                    functions.$this = this
                    functions.message.success()
                })
            })
        },
        createInvoice(){
            this.filterValues={
                InvoiceNo:this.orderInfo.Id,
                InvoiceSale:this.orderInfo.EmployeeName,
                InvoiceDate:Date(),
                ABN:this.orderInfo.CustomerABN,
                Ref:this.orderInfo.OrderRefNo,

                Subtotal:this.orderInfo.TotalAmountExcGST,
                GST:this.orderInfo.Taxes,
                TotalIncGST:this.orderInfo.TotalAmount,
                AmountApplied:this.orderInfo.TotalPaid,
                BalanceDue:this.orderInfo.TotalAmount - this.orderInfo.TotalPaid
            }
            this.isExport = true
        }
    }
}
</script>

<style lang="less">
.el-tabs__active-bar{
        height: 5px!important;
}
.el-tabs__item{
    font-weight: bold;
}
.order-total{
    padding: 10px;
    background: #e9e9e9;
    text-align: center;
    border-radius: 5px;
}
.pos-fixed-bottom{
    position: fixed !important;
    bottom: 0;
    z-index: 999;
    right: 0;
}
</style>