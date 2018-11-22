<template>
<div id="purchase-form-create">
    <el-form :model="form" ref="form">	
        <el-row :gutter="20">
            <el-col :span="14">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Order Id" >
                            <el-input v-model="form.Id" auto-complete="off" disabled></el-input>
                        </el-form-item>	
                        <el-form-item label="Employee" >
                            <el-input v-model="form.EmployeeName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="Complete Date" >
                            <el-date-picker
                                v-model="form.CompleteDateForOrderOnly"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Invoice No." >
                            <el-input v-model="form.InvoiceNoForOrderOnly" 
                            auto-complete="off"></el-input>
                        </el-form-item>	
                        <el-form-item label="Invoice Date" >
                            <el-date-picker
                                v-model="form.InvoiceDateForOrderOnly"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Pickup Date" >
                            <el-date-picker
                                v-model="form.PickupDateForOrderOnly"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="Note" >
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="Please input"
                            v-model="form.Notes">
                        </el-input>
                    </el-form-item>
                </el-row>
            </el-col>	
            <el-col :span="10">
                <el-form-item label="Customer" prop="CustomerId" 
                :rules="rules.Required" >
                     <bwc-hidden-field :value="form.CustomerName"/>
                    <el-select v-model="form.CustomerId" 
                    placeholder="Please select a customer"
                    class="textbox-fs"
                    @change="customerChange">
                        <el-option v-for="sup in customerList" 
                            :label="sup.Company" 
                            :value="sup.Id" 
                            :key="sup.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Address" >
                    <el-input v-model="form.CustomerAddress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" >
                    <el-input v-model="form.CustomerEmail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Phone" >
                    <el-input v-model="form.CustomerPhone" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>						
        </el-row>
        <el-row class="text-right" v-if="type != 'edit'">
            <el-button  type="primary" @click="saveData">
                Continue 
                <i v-if="processing" class="el-icon-loading"></i>
                <i v-else class="el-icon-d-arrow-right"></i>
            </el-button>
        </el-row>
        <bwc-modal-footer v-else>
            <el-button @click="handleCloseModal">Cancel</el-button>
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-form>
</div>
</template>

<script>
import Authenticate from '@/plugin/authenticate'
import ValidattionRules from '@/plugin/rule'

export default {
    name:"PurchaseFormCreate",
    props:['type','data','id','from'],
    data(){
        return({
            loading:true,
            processing:false,
            formLabelWidth:"120px",
            form:{
                Id:Date.now(),
                EmployeeName: Authenticate.system.currentUser(),
                Taxes:10,
                Step:1
            },
            rules:ValidattionRules
        })
    },
    computed:{
        customerList(){
            return this.$store.getters['customer/all']
        },
        employeeList(){
            return this.$store.getters['employee/all']
        },
        steps(){
            return this.$store.getters['order/steps'].filter(_=>_.Value >= this.form.Step)
        }
    },
    created(){
        if(this.id >0){    
            this.form = this.data
        }else{            
            this.$store.dispatch('order/clearInfo')
            this.loading=false
        }
        this.$store.dispatch('customer/pullAll')  
        this.$store.dispatch('employee/pullAll')
    },
    methods:{
        customerChange(val){
            let customer = this.customerList.filter(_=>_.Id == val)
            this.form.CustomerAddress=customer[0].Address
            this.form.CustomerEmail=customer[0].Email
            this.form.CustomerPhone=customer[0].BusinessPhone
            this.form.CustomerName=customer[0].Company
        },
        employeeChange(val){
            let employee = this.employeeList.filter(_=>_.Id == val)
            this.form.EmployeeName=employee[0].Name
        },
        saveData: function(e){
            let self = this
            self.processing=true
            self.isDisabled=true
            //validate data
            self.validateForm('form')
            .then(_=>{
                if(_.valid){
                    //save data
                    if(self.id > 0){
                        self.$store.dispatch('order/update',{id:self.id, data:self.form})
                        .then(_=>{
                            this.processing=false
                            this.handleCloseModal()
                        })  
                    }else{
                        if(this.from == 'quotation'){
                            self.form.Step = 1 // Quotation
                        }else{
                            self.form.Step = 2 // In-progress
                        }
                        self.$store.dispatch('order/insert',self.form)
                        .then(_=>{
                            if(this.from == 'quotation'){                                
                                window.location.href = window.bwc.rootUrl + "/quotation/"+self.form.Id+"/detail";
                            }else{
                                window.location.href = window.bwc.rootUrl + "/order/"+self.form.Id+"/detail";
                            }
                        })
                    }
                }else{
                    self.processing=false
                    self.isDisabled=false
                    return false
                }
            })
            
        },
        validateForm(formName) {
            return new Promise((resolve,reject)=>{
                let isValid=false
                this.$refs[formName].validate((valid) => {
                    isValid = valid
                });
            resolve({valid:isValid})
            })
        },
        handleCloseModal(){
            this.$emit('close-modal')
        }
    }
}
</script>

<style lang="less">
    #purchase-form-create{
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100% !important;
        }
    }
</style>

