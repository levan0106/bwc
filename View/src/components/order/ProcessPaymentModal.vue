<template>
<div>
    <el-form :model="form" ref="form" status-icon>
        <el-form-item label="Paid Date" prop="DatePaid"
        :rules="rules.Required">
            <el-date-picker
            v-model="data.DatePaid"
            type="date"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
            placeholder="Pick a day"></el-date-picker>
        </el-form-item>
        <el-form-item label="Payment Type" prop="PaymentType"
        :rules="rules.Required">
            <el-select v-model="form.PaymentType" placeholder="Select" class="textbox-fs">
                <el-option
                v-for="item in PaymentTypes"
                :key="item.Id"
                :label="item.PaymentTypeName"
                :value="item.PaymentTypeName">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Amount Paid" prop="AmountPaid"
        :rules="rules.Required">
            <bwc-input-currency 
            v-model="form.AmountPaid" 
            class="input-number-fs"
            controls-position="right"></bwc-input-currency>
        </el-form-item>
    </el-form>
    
    <bwc-modal-footer>
        <el-button @click="closeModal">Cancel</el-button>                                 
        <el-button v-if="id > 0" type="primary" @click="updateData">
            Save
            <i v-if="processing" class="el-icon-loading"></i>
        </el-button>
        <el-button v-else type="primary" @click="saveData">
            Add
            <i v-if="processing" class="el-icon-loading"></i>
        </el-button>
    </bwc-modal-footer>
</div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"ProcessPaymentModal",
    props:['data','id'],
    data(){
        return({
            loading:true,
            processing:false,
            form:this.data,
            rules:ValidattionRules
        })
    },
    computed:{
        PaymentTypes(){
            return this.$store.getters.paymentType
        }
    },
    methods:{
        closeModal(){
            this.$emit('close-modal')
        },
        saveData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
               if(_.valid){
                    self.processing=true
                    self.$store.dispatch('order/addPayment',self.form)
                    .then(resolve=>{       
                        this.$emit('save-data');
                        self.processing=false
                    })
                    .catch(error=>{
                        self.processing=false
                    })
                }else{
                    self.processing=false
                }
            })
        },
        updateData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
               if(_.valid){
                    self.processing=true
                    self.$store.dispatch('order/updatePayment',{id:self.id,data:self.form})
                    .then(resolve=>{
                        this.$emit('save-data');
                        self.processing=false
                    })
                    .catch(error=>{
                        self.processing=false
                    })
                }else{
                    self.processing=false
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
    }

}
</script>

<style>

</style>
