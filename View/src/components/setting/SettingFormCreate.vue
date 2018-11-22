<template>
    <el-form :model="form" :rules="rules" ref="form" status-icon>
        <bwc-loading :loading="loading">    
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="GST (%)"
                    prop="GST" :rules="rules.Required">
                        <el-input v-model="form.GST" 
                        auto-complete="off"></el-input>
                    </el-form-item>   
                    
                    <el-form-item label="Contribution (%)" 
                    prop="Contribution" :rules="rules.Required">
                        <el-input v-model="form.Contribution" 
                        auto-complete="off"
                            ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>    
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-row class="text-right">  
                            <el-button type="primary" :disabled="processing" @click="saveData">
                                Save
                                <i v-if="processing" class="el-icon-loading"></i> 
                            </el-button> 
                    </el-row> 
                </el-col>
            </el-row>              
        </bwc-loading>
    </el-form>
</template>

<script>
import ValidattionRules from '@/plugin/rule'
import functions from '@/plugin/function'

export default {
    name:"SettingFormCreate",
    props:['data'], 
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth: '170px',
            form:this.data,
            rules:ValidattionRules
        })
    },
    watch:{
        data(val){
            this.form =val
        }
    },
    methods:{
       
        saveData: function(e){
            let self = this
            this.processing=true
            this.isDisabled=true
            //validate data
            this.validateForm('form')
            .then(_=>{
                if(_.valid){
                //save data
                    this.$store.dispatch('setting/update',this.form)
                    .then(_=>{
                        this.processing = false   
                        this.isDisabled = false             
                        
                        //show message
                        functions.$this = this
                        functions.message.success()
                    })  
            }else{
                this.processing=false
                this.isDisabled=false
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
    }
    }
</script>

