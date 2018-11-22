<template>
    <el-row>
        <el-form :model="form" ref="form" status-icon>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <bwc-loading :loading="loading">
                            <el-form-item label="Supplier" :label-width="formLabelWidth"
                            prop="SupplierId" :rules="rules.Required">
                                <el-select v-model="form.SupplierId" 
                                placeholder="Please select a supplier"
                                class="textbox-fs">
                                    <el-option v-for="sup in supplierList" 
                                    :label="sup.Company"
                                    :value="sup.Id" 
                                    :key="sup.Id"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Material Code" :label-width="formLabelWidth"
                            prop="MaterialCode" :rules="rules.Required">
                                <el-input v-model="form.MaterialCode" auto-complete="off" ></el-input>
                            </el-form-item>
                            
                            <el-form-item label="Material Name" :label-width="formLabelWidth"
                            prop="MaterialName" :rules="rules.Required">
                                <el-input v-model="form.MaterialName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Description" :label-width="formLabelWidth">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="Please input"
                                    v-model="form.Description">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Color" :label-width="formLabelWidth">
                                <el-input v-model="form.Color" auto-complete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="Status" :label-width="formLabelWidth">
                                <el-select v-model="form.ActiveStatus" 
                                placeholder="Please select a status"
                                class="textbox-fs">
                                    <el-option v-for="sta in status" 
                                    :label="sta.label" 
                                    :value="sta.value"
                                    :key="sta.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-row class="text-right">
                                <el-button type="primary" :disabled="processing" @click="saveData">
                                        Save
                                        <i v-if="processing" class="el-icon-loading"></i> 
                                    </el-button> 
                            </el-row>                        
                        </bwc-loading>
                    </el-col>
                </el-row>
        </el-form>
    </el-row>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"ProductFormCreate",
    props:['type','data','id'],
    data(){
        return({
            loading:true,
            processing:false,
            formLabelWidth: '120px',
            rules:ValidattionRules
            })
    },
    computed:{
        form(){
            return this.$store.getters['material/info']
        },
        supplierList(){
            return this.$store.getters['supplier/all']
        },
        status(){
            return this.$store.getters.status
        }
    },
    created(){
        
        this.$store.dispatch('material/clearInfo')
        if(this.id >0){
            this.$store.dispatch('material/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false; 
            })       
        }else{
            this.loading=false;
        }

        this.$store.dispatch('supplier/pullAll')  
    },
        methods:{
            saveData: function(e){
                let self = this
            self.processing=true
            self.isDisabled=true
            //validate data
            self.validateForm('form')
            .then(_=>{
                //debugger
                if(_.valid){
                //save data
                if(self.id > 0){
                    self.$store.dispatch('material/update',{id:self.id,data:self.form})
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/material/list";
                    })  
                }else{
                    self.$store.dispatch('material/insert',self.form)
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/material/list";
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
        }
    }
</script>

