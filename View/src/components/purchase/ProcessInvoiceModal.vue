<template>
    <div>
        <el-form :model="form" ref="form" status-icon>            
            <el-form-item label="Invoice Date"  :rules="rules.Required">
                <el-date-picker
                v-model="data.InvoiceDate"
                type="date"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
                placeholder="Pick a day"></el-date-picker>
            </el-form-item>
            <el-form-item label="Invoice No" prop="InvoiceNo" :rules="rules.Required">
                <el-input v-model="form.InvoiceNo"></el-input>
            </el-form-item>
            <el-form-item label="Invoice Amount"  prop="InvoiceAmount" :rules="rules.Required">
                <bwc-input-currency 
                v-model="form.InvoiceAmount" 
                class="input-number-fs"
                controls-position="right"></bwc-input-currency>
            </el-form-item>
            <el-form-item label="AMT Exc GST">
                <bwc-input-currency v-model="form.AMTExcGST"
                class="input-number-fs"
                controls-position="right"></bwc-input-currency>
            </el-form-item>
            <el-form-item label="GST">
                <bwc-input-currency v-model="form.GST"
                class="input-number-fs"
                controls-position="right"></bwc-input-currency>
            </el-form-item>
            <el-form-item label="AMT Inc GST">
                <bwc-input-currency v-model="form.AMTIncGST"
                class="input-number-fs"
                controls-position="right"></bwc-input-currency>
            </el-form-item>

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
        </el-form>
    </div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"ProcessInvoiceModal",
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
        forceReloadPage(){
            return this.$store.getters.forceReloadPage
        }
    },
    watch:{
        forceReloadPage(val){
            if(val){
                this.form = this.data
            }
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
                    self.$store.dispatch('purchase/addInvoice',self.form)
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
                    self.$store.dispatch('purchase/updateInvoice',{id:self.id,data:self.form})
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
