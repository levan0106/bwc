<template>
<div id="purchase-information">
    <bwc-loading :loading="loading">
        <!-- <bwc-title no-padding>Informations</bwc-title> -->
        <el-row>
            <el-col :span="8">
                <bwc-form-control label="Purchase No">{{data.Id|nullValue}}</bwc-form-control>
                <bwc-form-control label="Employee">{{data.EmployeeName|nullValue}}</bwc-form-control>
                <bwc-form-control label="Purchase Date">{{data.OrderDate|datetime|nullValue}}</bwc-form-control>    
            </el-col>
            <el-col :span="8">            
                <bwc-form-control label="Supplier Name">{{data.SupplierName|nullValue}}</bwc-form-control> 
                <!-- <bwc-form-control label="Firt Receive Date">{{data.FirtReceiveDate|nullValue}}</bwc-form-control> -->
                <!-- <bwc-form-control label="Delivery Date">{{data.DeliveryDate|nullValue}}</bwc-form-control> -->
                <bwc-form-control label="Order Ref No">{{data.OrderRefNo|nullValue}}</bwc-form-control>            
                <!-- <bwc-form-control label="Surcharge">{{data.Surcharge|currency|nullValue}}</bwc-form-control> -->                       
                <bwc-form-control label="Taxes (GST)">{{data.Taxes|percent|nullValue}}</bwc-form-control>
                <!-- <bwc-form-control label="Discount">{{data.Discount|percent|nullValue}}</bwc-form-control> -->
            </el-col>
            <el-col :span="8">                
                <bwc-form-control label="Delivery Date">{{data.DeliveryDate|date|nullValue}}</bwc-form-control>
                <bwc-form-control label="Delivery No">{{data.DeliveryNo|nullValue}}</bwc-form-control>
                <!-- <bwc-form-control label="AMT Exc GST">{{data.AMTExcGST|currency|nullValue}}</bwc-form-control>
                <bwc-form-control label="GST">{{data.GST|currency|nullValue}}</bwc-form-control>
                <bwc-form-control label="AMT Inc GST">{{data.AMTIncGST|currency|nullValue}}</bwc-form-control> -->
            </el-col>
        </el-row>
    
        <el-row>
            <el-col :span="24">
                <bwc-form-control label="Notes" border>{{data.Notes|nullValue}}</bwc-form-control>
            </el-col>   
        </el-row>
        <el-row>
            
            <el-col :span="24">
                <el-row class="text-right">		
                    <el-button-group>
                        <!-- <el-button v-if="data.Step == 1" type="success" @click="updateStep(2)" >
                            <i class="el-icon-check"></i> Submit
                        </el-button> 
                        <el-button v-if="data.Step == 2" type="success" @click="updateStep(3)" >
                            <i class="el-icon-check"></i> Accept Delivery
                        </el-button> 
                        <el-button v-if="data.Step == 3" type="success" @click="updateStep(4)" >
                            <i class="el-icon-check"></i> Get Invoice
                        </el-button> 
                        <el-button :type="data.Step > 3? 'success':'primary'" @click="copyToNewPurchase" >
                            <i class="el-icon-check"></i> Copy To New Purchase
                        </el-button>                
                        <el-button type="primary" @click="printNow" >
                            <i class="el-icon-printer"></i> Print
                        </el-button>     -->
                        <el-button type="primary" @click="isOpen = true" :disabled="data.Step >= 6" >
                            <i class="el-icon-edit"></i> Edit
                        </el-button>
                    </el-button-group>		
                </el-row>
            </el-col> 
        </el-row>
    </bwc-loading>
    <el-dialog title="Edit purchase" :visible.sync="isOpen" fullscreen>

        <bwc-purchase-form-create 
        type="edit" 
        :data="data" 
        :id="id" 
        @close-modal="isOpen=false" />

    </el-dialog>
</div>
</template>

<script>
import BwcPurchaseFormCreate from '@/components/purchase/PurchaseFormCreate.vue'

export default {
    name: "PurchaseInformation",
    components:{
        BwcPurchaseFormCreate
    },
    props:['id','data','loading'],
    data(){
        return({
            //loading:false,        
            isOpen:false,
        })
    },
    computed:{
        // data(){
        //     return this.$store.getters['purchase/info']
        // },
        steps(){
            return this.$store.getters['purchase/steps'].filter(_=>_.Value >= this.form.Step)
        },
        stepActive(){
            return this.$store.getters['purchase/info'].Step
        }
    },
    watch:{
        stepActive(step){
            this.$store.dispatch('purchase/stepActive',step)
        }
    },
    created(){
        // this.$store.dispatch('purchase/clearInfo')
        //     this.$store.dispatch('purchase/pullInfo',this.id) 
        //     .then(()=>{                
        //         this.loading=false;  
        //     }) 
        //this.$store.dispatch('purchase/stepActive',this.$store.getters['purchase/info'].Step)
    },
    methods:{
        // updateStep(step){
        //     let sefl=this
        //     let purchase = {Step:step}
        //     this.$store.dispatch('purchase/update',{id:this.id,data:purchase})
        //     .then(response=>{
        //         sefl.$store.dispatch('purchase/pullInfo',sefl.id) 
        //         .then(()=>{                
        //             sefl.loading=false;  
        //         })
        //     })
        // },
        // copyToNewPurchase(){
        //     let self = this
        //     let newId = Date.now();
        //     this.$store.dispatch('purchase/copyToNew',{id:this.id,newId:newId})
        //     .then(response=>{
        //         window.location.href = window.bwc.rootUrl + "/purchase/"+newId+"/detail";
        //         location.reload();
        //     })
        // },
        // printNow(value){
        //     this.print = value;
                
        //     this.$nextTick(() => {
        //         window.print();
        //     });
        // }
    }
}
</script>

<style lang="less">
</style>
