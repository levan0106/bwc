<template>
    <bwc-layout menu-id="purchase/list" title="Purchase Detail" 
    :bread-crumb="breadCrumb"
    back-to='/purchase/list'
    back-to-label="Purchase List" >
        <el-row :gutter="20">
            <el-col :span="16">
                <bwc-process :active="stepActive" :steps="stepList"/>
            </el-col>
            <el-col :span="8">
                <div class="purchase-total shadow-box">
                    <el-row>
                        <el-col :span="12">
                            <span>Estimate Amount</span>
                            <h3>{{purchaseInfo.TotalAmount|currency}}</h3>
                        </el-col>
                        <el-col :span="12">
                            <span>Delivery Amount</span>
                            <h3>{{purchaseInfo.TotalReceived|currency}}</h3>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <!-- <el-tabs :tab-position="'top'"> -->
            <!-- <el-tab-pane label="Purchase Information">  -->
                <bwc-title>Purchase Information</bwc-title>               
                <bwc-purchase-information :id="id" :data="purchaseInfo" :loading="loading"/>
            <!-- </el-tab-pane> -->
            <!-- <el-tab-pane label="Process Information"> -->
                <bwc-purchase-process-information 
                :purchase-id="id"                
                :purchase="purchaseInfo"/>
            <!-- </el-tab-pane> -->
            <!-- </el-tabs> -->
        </el-row>
        
        <bwc-title>Products</bwc-title>
        <bwc-purchase-product-list 
        :purchase-id="id"
        :purchase="purchaseInfo"
        :supplier-id="purchaseInfo.SupplierId"  
        @save-data="loadPurchaseInfo"
        ></bwc-purchase-product-list>

        <bwc-title>Other Items</bwc-title>
        <bwc-purchase-component-list 
        :purchase-id="id"
        :purchase="purchaseInfo"
        :supplier-id="purchaseInfo.SupplierId"   
        @save-data="loadPurchaseInfo"     
        ></bwc-purchase-component-list>
        <br/>
        <el-row class="pos-fixed-bottom">
            <el-button-group>
                <el-button v-if="purchaseInfo.Step == 1" type="success" @click="updateStep(2)" >
                    <i class="el-icon-check"></i> Submit
                </el-button> 
                <el-button v-if="purchaseInfo.Step == 2" type="success" @click="updateStep(3)" >
                    <i class="el-icon-check"></i> Accept Delivery
                </el-button> 
                <el-button v-if="purchaseInfo.Step == 3" type="success" @click="updateStep(4)" >
                    <i class="el-icon-check"></i> Accept Invoice
                </el-button> 
                <el-button v-if="purchaseInfo.Step == 5" type="success" @click="updateStep(6)" >
                    <i class="el-icon-check"></i> Close
                </el-button> 
                <el-button :type="purchaseInfo.Step == 4 || purchaseInfo.Step > 5 ? 'success':'primary'" @click="copyToNewPurchase" >
                    <i class="el-icon-check"></i> Copy To New Purchase
                </el-button>                
                <el-button type="primary" @click="printNow" >
                    <i class="el-icon-printer"></i> Print
                </el-button> 
            </el-button-group>
        </el-row>
    </bwc-layout>
</template>

<script>
import BwcProcess from '@/components/common/Process.vue'
import BwcPurchaseInformation from '@/components/purchase/PurchaseInformation.vue'
import BwcPurchaseProcessInformation from '@/components/purchase/PurchaseProcessInformation.vue'
import BwcPurchaseProductList from '@/components/purchase/PurchaseProductList.vue'
import BwcPurchaseComponentList from '@/components/purchase/PurchaseComponentList.vue'

export default {
    name:'PurchaseDetail',
    components:{
        BwcProcess,
        BwcPurchaseInformation,
        BwcPurchaseProcessInformation,
        BwcPurchaseProductList,
        BwcPurchaseComponentList
    },
    props:['id'],
    data(){
        return({
            loading:true,
            products:[],
            components:[],
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/purchase/list',name:'Purchase'},
                //{href:'',name:this.purchaseInfo.Id}
                ]
        })
    },
    computed:{
        stepList(){
            return this.$store.getters['purchase/steps']
        },
        stepActive(){
            return this.$store.getters['purchase/info'].Step
        },
        purchaseInfo(){
            return this.$store.getters['purchase/info']
        }
    },
    created(){
        this.loadPurchaseInfo()
    },
    methods:{
        loadPurchaseInfo(){
            this.$store.dispatch('purchase/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false;  
            })
        },
        updateStep(step){
            let sefl=this
            let purchase = {Step:step}
            this.$store.dispatch('purchase/update',{id:this.id,data:purchase})
            .then(response=>{
                sefl.$store.dispatch('purchase/pullInfo',sefl.id) 
                .then(()=>{                
                    sefl.loading=false;  
                })
            })
        },
        copyToNewPurchase(){
            let self = this
            let newId = Date.now();
            this.$store.dispatch('purchase/copyToNew',{id:this.id,newId:newId})
            .then(response=>{
                window.location.href = window.bwc.rootUrl + "/purchase/"+newId+"/detail";
                location.reload();
            })
        },
        printNow(value){
            this.print = value;
                
            this.$nextTick(() => {
                window.print();
            });
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
.purchase-total{
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

