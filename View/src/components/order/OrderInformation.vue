<template>
<div id="Order-information">
    <bwc-loading :loading="loading">
        <!-- <bwc-title no-padding>Informations</bwc-title> -->
        <el-row>
            <el-col :span="8">
                <bwc-form-control label="Order No">{{data.Id|nullValue}}</bwc-form-control>
                <bwc-form-control label="Employee">{{data.EmployeeName|nullValue}}</bwc-form-control>
                <bwc-form-control label="Order Date">{{data.OrderDate|nullValue}}</bwc-form-control>    
            </el-col>
            <el-col :span="8">            
                <bwc-form-control label="Customer Name">{{data.CustomerName|nullValue}}</bwc-form-control> 
                <bwc-form-control label="Order Ref No">{{data.OrderRefNo|nullValue}}</bwc-form-control>                                 
                <bwc-form-control label="Taxes (GST)">{{data.Taxes|percent|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="8">           
                <!-- <bwc-form-control label="Delivery Date">{{data.DeliveryDate|date|nullValue}}</bwc-form-control>
                <bwc-form-control label="Delivery No">{{data.DeliveryNo|nullValue}}</bwc-form-control>             
                <bwc-form-control label="AMT Exc GST">{{data.AMTExcGST|currency|nullValue}}</bwc-form-control>
                <bwc-form-control label="GST">{{data.GST|currency|nullValue}}</bwc-form-control>
                <bwc-form-control label="AMT Inc GST">{{data.AMTIncGST|currency|nullValue}}</bwc-form-control> -->
                <bwc-form-control label="Complete Date">{{data.CompleteDateForOrderOnly|date|nullValue}}</bwc-form-control>
                <bwc-form-control label="Invoice No.">{{data.InvoiceNoForOrderOnly|nullValue}}</bwc-form-control>
                <bwc-form-control label="Invoice Date">{{data.InvoiceDateForOrderOnly|date|nullValue}}</bwc-form-control>
                <bwc-form-control label="Pickup Date">{{data.PickupDateForOrderOnly|date|nullValue}}</bwc-form-control>
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
                        <el-button type="primary" @click="isOpen = true" >
                            <i class="el-icon-edit"></i> Edit
                        </el-button>
                    </el-button-group>		
                </el-row>
            </el-col> 
        </el-row>
    </bwc-loading>
    <el-dialog title="Edit Order" :visible.sync="isOpen" fullscreen>
        <bwc-Order-form-create 
        type="edit" 
        :data="data" 
        :id="id" 
        @close-modal="isOpen=false" />
    </el-dialog>
</div>
</template>

<script>
import BwcOrderFormCreate from '@/components/order/OrderFormCreate.vue'

export default {
    name: "OrderInformation",
    components:{
        BwcOrderFormCreate
    },
    props:['id','data','loading'],
    data(){
        return({      
            isOpen:false,
        })
    },
    computed:{
        steps(){
            return this.$store.getters['order/steps'].filter(_=>_.Value >= this.form.Step)
        },
        stepActive(){
            return this.$store.getters['order/info'].Step
        }
    },
    watch:{
        stepActive(step){
            this.$store.dispatch('order/stepActive',step)
        }
    },
    methods:{
        
    }
}
</script>

<style lang="less">
</style>
