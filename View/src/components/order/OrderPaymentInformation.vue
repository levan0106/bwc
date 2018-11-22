<template>
<div id="purchase-process-info">
    <bwc-title>Process Payment</bwc-title>  
    <el-button type="primary" @click="openPaymentModal" >
        <i class="el-icon-plus"></i> Add payment
    </el-button>	
    <grid-data
    :data="dataPayment"
    :no-paging="true"
    :show-summary="true"
    :text-summary="'Total'"
    :value-null-summary="''"
    :loading="loadingPayment" >
        <el-table-column
            prop="DatePaid"
            label="Date Paid">
        </el-table-column>
        <el-table-column
            prop="PaymentType"
            label="Payment Type">
        </el-table-column>
        <el-table-column
            prop="AmountPaid"
            label="Amount Paid">
            <template slot-scope="scope">
                {{scope.row.AmountPaid|currency}}
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="100"
            class-name="no-print">
            <template slot-scope="scope">
                <el-button type="text" class="el-icon-edit-outline"
                @click="editPayment(scope.row)" ></el-button> | 
                <bwc-delete-item :delete-id="scope.row.id" 
                icon="el-icon-delete" 
                @do-delete="doDeletePayment(scope.row.Id)"></bwc-delete-item>
            </template>
        </el-table-column>
    </grid-data>

    <el-dialog title="Process Payment" 
    :visible.sync="processPaymentModal.isOpen"
    class="modal modal-md" >
        <bwc-process-payment-modal 
        :id="processPaymentModal.data.Id"
        :data="processPaymentModal.data"
        @close-modal="processPaymentModal.isOpen = false"
        @save-data="savePayment"/>
    </el-dialog>
</div>
</template>

<script>
import GridData from '@/components/common/GridData.vue'
import BwcProcessPaymentModal from '@/components/order/ProcessPaymentModal.vue'

export default {
    name: "OrderProcessInformation",
    components:{
        GridData,
        BwcProcessPaymentModal,
    },
    props:['orderId'],
    data(){
        return({
            formLabelWidth:"150px",
            loadingPayment:true,
            processPaymentModal:{
                isOpen:false,
                data:{
                    OrderId:this.orderId
                }
            }
        })
    },
    computed:{
        dataPayment(){
            return this.$store.getters['order/allPayment']
        },
    },
    created(){
        //get all payments by order      
        this.$store.dispatch('order/pullAllPayment',this.orderId)
        .then(_=>{
            this.loadingPayment=false
        })
    },
    methods:{
        openPaymentModal(){
            this.processPaymentModal.isOpen=true
            this.processPaymentModal.data = {
                Id:0,
                OrderId:this.orderId
                }
        },
        editPayment(data){
            this.processPaymentModal.isOpen=true
            this.processPaymentModal.data=data
        },
        savePayment(){
            this.processPaymentModal.isOpen=false
            this.loadingPayment=true
            //get all payments by order      
            this.$store.dispatch('order/pullAllPayment',this.orderId)
            .then(_=>{
                this.loadingPayment=false
            })
        },
        doDeletePayment(id){
            this.loadingPayment=true
            //delete here
            this.$store.dispatch('order/deletePayment',id)
            .then(_=>{                
                //get all payments by order      
                this.$store.dispatch('order/pullAllPayment',this.orderId)
                .then(_=>{
                    this.loadingPayment=false
                })
            })
        }
    }
}
</script>

<style lang="less">
    @border-color:#e4e2e2;
    #order-process-info{
        .title{
            color: cadetblue;
            text-align: center;
            border-bottom: 1px solid @border-color;
            //border-bottom: none;
            margin: 0px;
            line-height: 40px;
        }
        .group-header{
            background:none!important;
            text-align: center;
            color: cadetblue;
        }
        .order-total{
            background: #efeeee;
            padding: 0 10px 10px !important;
        }
    }
</style>
