<template>
    <div id="timeshet-employee-modal"> 
        <el-form :model="form" ref="form" status-icon>
            <el-form-item label="Choose Employee" 
            prop="EmployeeId"
            :rules="rules.Required">
                <el-select v-model="form.EmployeeId" 
                filterable placeholder="Select"
                class="textbox-fs">
                    <el-option
                    v-for="item in data"
                    :key="item.Id"
                    :label="item.FirstName +' '+ item.LastName"
                    :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>            
        <bwc-modal-footer>
            <el-button @click="doClose">Cancel</el-button>                                 
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"TimeSheetAddEmployeeModal",
    props:['data','date'],
    data(){
        return({
            processing:false,
            form:{
                Month:this.date
            },
            rules:ValidattionRules
        })
    },
    watch:{
        date(){
            this.resetToDefaultValue()
        }
    },
    created(){
        this.resetToDefaultValue()
    },
    methods:{
        resetToDefaultValue(){
            this.form = {
                Month:this.date
                }
        },
        saveData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
                if(_.valid){
                    self.processing=true
                    self.$store.dispatch('workingtime/addTimeSheetEmployee',self.form)
                    .then(resolve=>{
                        this.$emit('save-data')
                        this.doClose()
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
        doClose(){
            this.resetToDefaultValue()
            this.$emit('close-modal')
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

<style lang="less">
</style>
