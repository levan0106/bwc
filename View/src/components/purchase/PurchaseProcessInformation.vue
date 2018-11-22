<template>
<div id="purchase-process-info">
    <bwc-title>Process Invoice</bwc-title> 
    <el-button type="primary" @click="openInvoiceModal" :disabled="purchase.Step != 3" >
        <i class="el-icon-plus"></i> Add invoice
    </el-button>

    <grid-data
    :data="dataInvoice"
    :no-paging="true"
    :show-summary="false"
    :text-summary="'Total'"
    :value-null-summary="''"
    :loading="loadingInvoice"
    >
        <el-table-column
            prop="InvoiceNo"
            label="Invoice No">
        </el-table-column>
        <el-table-column
            prop="InvoiceDate"
            label="Invoice Date">            
            <template slot-scope="scope">
                {{scope.row.InvoiceDate|date}}
            </template>
        </el-table-column>
        <el-table-column
            prop="InvoiceAmount"
            label="Invoice Amount">
            <template slot-scope="scope">
                {{scope.row.InvoiceAmount|currency}}
            </template>
        </el-table-column>
        <el-table-column
            prop="AMTExcGST"
            label="AMT Exc GST">
            <template slot-scope="scope">
                {{scope.row.AMTExcGST|currency|nullValue}}
            </template>
        </el-table-column>
        <el-table-column
            prop="GST"
            label="GST">
            <template slot-scope="scope">
                {{scope.row.GST|currency|nullValue}}
            </template>
        </el-table-column>
        <el-table-column
            prop="AMTIncGST"
            label="AMT Inc GST">
            <template slot-scope="scope">
                {{scope.row.AMTIncGST|currency|nullValue}}
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="100"
            class-name="no-print">
            <template slot-scope="scope">
            <el-button type="text" class="el-icon-edit-outline"
                @click="editInvoice(scope.row)" :disabled="purchase.Step != 3"  ></el-button> | 
            <bwc-delete-item :delete-id="scope.row.id" 
                icon="el-icon-delete" 
                @do-delete="doDeleteInvoice(scope.row.Id)"
                :disabled="purchase.Step != 3"></bwc-delete-item>
            </template>
        </el-table-column>
    </grid-data>

    <bwc-title>Process Payment</bwc-title>  
    <el-button type="primary" @click="openPaymentModal" :disabled="purchase.Step != 4" >
        <i class="el-icon-plus"></i> Add payment
    </el-button>	

    <grid-data
    :data="dataPayment"
    :no-paging="true"
    :show-summary="true"
    :text-summary="'Total'"
    :value-null-summary="''"
    :loading="loadingPayment"
    >
        <el-table-column
            prop="DatePaid"
            label="Date Paid">
            <template slot-scope="scope">
                {{scope.row.DatePaid|date}}
            </template>
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
                @click="editPayment(scope.row)" :disabled="purchase.Step != 4" ></el-button> | 
                <bwc-delete-item :delete-id="scope.row.id" 
                    icon="el-icon-delete" 
                    @do-delete="doDeletePayment(scope.row.Id)" 
                    :disabled="purchase.Step != 4"></bwc-delete-item>
            </template>
        </el-table-column>
    </grid-data>
            
    <el-dialog title="Process Invoice" 
    :visible.sync="processInvoiceModal.isOpen" 
    class="modal modal-md">
        <bwc-process-invoice-modal 
        :id="processInvoiceModal.data.Id"
        :data="processInvoiceModal.data"
        @close-modal="processInvoiceModal.isOpen = false"
        @save-data="saveInvoice"/>
    </el-dialog>
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
import BwcProcessPaymentModal from '@/components/purchase/ProcessPaymentModal.vue'
import BwcProcessInvoiceModal from '@/components/purchase/ProcessInvoiceModal.vue'

export default {
    name: "PurchaseProcessInformation",
    components:{
        GridData,
        BwcProcessPaymentModal,
        BwcProcessInvoiceModal
    },
    props:['purchaseId','purchase'],
    data(){
        return({
            formLabelWidth:"150px",
            loadingPayment:true,
            loadingInvoice:true,
            processInvoiceModal:{
                isOpen:false,
                data:{
                    OrderId:this.purchaseId
                }
            },
            processPaymentModal:{
                isOpen:false,
                data:{
                    OrderId:this.purchaseId
                }
            }
        })
    },
    computed:{
        dataPayment(){
            return this.$store.getters['purchase/allPayment']
        },
        dataInvoice(){
            return this.$store.getters['purchase/allInvoice']
        },
    },
    created(){
        //get all payments by purchase      
        this.$store.dispatch('purchase/pullAllPayment',this.purchaseId)
        .then(_=>{
            this.loadingPayment=false
        })

        //get all invoices by purchase      
        this.$store.dispatch('purchase/pullAllInvoice',this.purchaseId)
        .then(_=>{
            this.loadingInvoice=false
        })
    },
    methods:{
        openInvoiceModal(){
            this.processInvoiceModal.isOpen=true
            this.processInvoiceModal.data = {
                Id:0,
                OrderId:this.purchaseId,
                InvoiceDate:new Date(),
                InvoiceNo:'',
                InvoiceAmount:'',
                AMTExcGST:'',
                GST:'',
                AMTIncGST:''
            }
            
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        editInvoice(data){
            this.processInvoiceModal.isOpen=true
            this.processInvoiceModal.data=data
            
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        saveInvoice(){
            this.loadingInvoice=true
            this.processInvoiceModal.isOpen=false
            //get all invoices by purchase      
            this.$store.dispatch('purchase/pullAllInvoice',this.purchaseId)
            .then(_=>{
                this.loadingInvoice=false
            })
        },
        doDeleteInvoice(id){
            this.loadingInvoice=true
            //delete here
            this.$store.dispatch('purchase/deleteInvoice',id)
            .then(_=>{                
                //get all invoices by purchase      
                this.$store.dispatch('purchase/pullAllInvoice',this.purchaseId)
                .then(_=>{
                    this.loadingInvoice=false
                })
            })
            
        },
        openPaymentModal(){
            //debugger
            this.processPaymentModal.isOpen=true
            this.processPaymentModal.data = {
                Id:0,
                OrderId:this.purchaseId,
                DatePaid:new Date(),
                PaymentType:'',
                AmountPaid:0
            }
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        editPayment(data){
            //debugger
            this.processPaymentModal.isOpen=true
            this.processPaymentModal.data=data
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        savePayment(){
            this.processPaymentModal.isOpen=false
            this.loadingPayment=true
            //get all payments by purchase      
            this.$store.dispatch('purchase/pullAllPayment',this.purchaseId)
            .then(_=>{
                this.loadingPayment=false
            })
        },
        doDeletePayment(id){
            this.loadingPayment=true
            //delete here
            this.$store.dispatch('purchase/deletePayment',id)
            .then(_=>{                
                //get all payments by purchase      
                this.$store.dispatch('purchase/pullAllPayment',this.purchaseId)
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
    #purchase-process-info{
        // form.el-form {
        //     border: 1px solid @border-color;
        //     label{
        //         font-weight: bold;
        //         text-align: left;
        //         margin: 0 10px;
        //         border-right: 1px solid @border-color;
        //     }
        // }
        .title{
            color: cadetblue;
            text-align: center;
            border-bottom: 1px solid @border-color;
            //border-bottom: none;
            margin: 0px;
            line-height: 40px;
        }
        // .el-table thead.is-group th {
        //     background:none;
        //     text-align: center;
        // }
        .group-header{
            background:none!important;
            text-align: center;
            color: cadetblue;
        }
        .purchase-total{
            background: #efeeee;
            padding: 0 10px 10px !important;
        }
    }
</style>
