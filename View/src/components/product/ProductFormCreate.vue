<template>
    <el-row>
        <el-form :model="form" ref="form" status-icon>
                <el-row >
                    <el-col :span="type == 'edit'?24:20">                        
                        <bwc-loading :loading="loading">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="Product code"  prop="ProductCode" 
                                :rules="rules.Required">
                                    <el-input v-model="form.ProductCode" 
                                    auto-complete="off" ></el-input>
                                </el-form-item>
                                <el-form-item label="Category" prop="CategoryId" 
                                :rules="rules.Required">
                                    <el-select v-model="form.CategoryId" 
                                    placeholder="Please select a category"
                                    class="textbox-fs">
                                        <el-option v-for="cat in categories" 
                                        :label="cat.CategoryName" 
                                        :value="cat.Id"
                                        :key="cat.Id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Status" prop="ActiveStatus" 
                                :rules="rules.Required">
                                    <el-select v-model="form.ActiveStatus" 
                                    placeholder="Please select a status"
                                    class="textbox-fs">
                                        <el-option v-for="sta in status" 
                                        :label="sta.label" 
                                        :value="sta.value"
                                        :key="sta.value"></el-option>
                                    </el-select>
                                </el-form-item>                                
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Product name" prop="ProductName" 
                                :rules="rules.Required">
                                    <el-input v-model="form.ProductName" auto-complete="off" ></el-input>
                                </el-form-item>
                                <el-form-item label="Notes" >
                                    <el-input
                                        type="textarea"
                                        :rows="5"
                                        placeholder="Please input"
                                        v-model="form.Notes">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="text-right" v-if="type== 'create'">
                                    <el-button type="primary" :disabled="processing" @click="saveData">
                                        Continue
                                        <i v-if="processing" class="el-icon-loading"></i> 
                                    </el-button> 
                                </el-row>
                                <bwc-modal-footer v-else>
                                    <el-button @click="handleCloseModal">Cancel</el-button>
                                    <el-button type="primary" @click="saveData">
                                        Save
                                        <i v-if="processing" class="el-icon-loading"></i>
                                    </el-button>
                                </bwc-modal-footer>
                            </el-col>
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
            loading:false,
            processing:false, 
            rules:ValidattionRules      
        })
    },
    computed:{
        form(){
            return this.$store.getters['product/info']
        },
        status(){
            return this.$store.getters.status
        },
        categories(){
            return this.$store.getters['category/all']
        }
    },
    created(){
        if(this.type == 'create')
        {
            this.$store.dispatch('product/clearInfo')
        }

        this.$store.dispatch('supplier/pullAll')  
        this.$store.dispatch('category/pullAll')  
    },
    methods:{
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
                    self.$store.dispatch('product/update',{id:self.id,data:self.form})
                    .then(_=>{
                        this.$store.dispatch('product/push',this.form)  
                        this.handleCloseModal();
                        self.processing=false
                        self.isDisabled=false
                    })  
                }else{
                    self.$store.dispatch('product/insert',self.form)
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/product/list";
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

