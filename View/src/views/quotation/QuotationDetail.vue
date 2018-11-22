<template>
<bwc-layout menu-id="quotation/list" title="Quotation Detail" 
    :bread-crumb="breadCrumb"
    back-to='/quotation/list'
    back-to-label="Quotation List" >
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
        </el-row>
        
        <bwc-title>Products</bwc-title>
        <bwc-order-product-list 
        :order-id="id"
        :order="orderInfo"
        :supplier-id="orderInfo.SupplierId"  
        @save-data="getOrderInfo"
        from="quotation"
        ></bwc-order-product-list>

        <bwc-title>Other items</bwc-title>
        <bwc-order-component-list 
        :order-id="id"
        :order="orderInfo"
        :supplier-id="orderInfo.SupplierId"   
        @save-data="getOrderInfo"   
        from="quotation"  
        ></bwc-order-component-list>
        <br/>
        <el-row class="pos-fixed-bottom">
            <el-button-group>
                <el-button type="success" @click="updateStep(2)" >
                    <i class="el-icon-check"></i> Create Order
                </el-button>  
                <el-button type="primary" icon="el-icon-printer" @click="printNow" >Print</el-button>
            </el-button-group>
        </el-row>
        <bwc-quotation-export
                :is-export="isExport"
                :file-name="'quotation_'+ id"
				:products="products"
                :components="components"
                @export-complete="isExport=false"></bwc-quotation-export>
    </bwc-layout>
    
</template>

<script>
import BwcProcess from '@/components/common/Process.vue'
import BwcOrderInformation from '@/components/order/OrderInformation.vue'
import BwcOrderProductList from '@/components/order/OrderProductList.vue'
import BwcOrderComponentList from '@/components/order/OrderComponentList.vue'
import BwcQuotationExport from '@/components/quotation/QuotationExport.vue'

export default {
    name:'OrderDetail',
    components:{
        BwcProcess,
        BwcOrderInformation,
        BwcOrderProductList,
        BwcOrderComponentList,
        BwcQuotationExport
    },
    props:['id'],
    data(){
        return({
            loading:true,
            isExport:false,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/quotation/list',name:'Quotation'}
            ]
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
        },
    },
    created(){
        this.initData()
    },
    methods:{
        initData(){
            this.getOrderInfo()
            //init data
            this.getProducts()
            this.getComponents()
        },
        getOrderInfo(){
            this.$store.dispatch('order/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false;  
            })
        },
        getProducts(){
            //get all products by order      
            this.$store.dispatch('order/pullAllProduct',this.id)
        },
        getComponents(){
            //get all components by order      
            this.$store.dispatch('order/pullAllComponent',this.id)
        },
        printNow(){

            //init data
            //this.getProducts()
            //this.getComponents()

            //start export
            this.isExport = true;
                
        },
        updateStep(step){
            let self = this
            let Order = {Step:step}
            this.$store.dispatch('order/update',{id:this.id,data:Order})
            .then(()=>{
                window.location.href = window.bwc.rootUrl + "/order/"+self.id+"/detail";
            })
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