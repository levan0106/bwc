<template>
<div id="productmaterialmodal">    
      
    <el-button-group>            
            <el-button icon="el-icon-plus" type="primary" @click="isOpen=true">Add Material</el-button>   
            <el-button icon="el-icon-plus" type="success">
                <router-link :to="{name:'materialCreate'}">							
                    Create New Material
			    </router-link>	 
            </el-button> 
        </el-button-group>
    <el-dialog title="Add Material" :visible.sync="isOpen"  class="modal modal-md">
        <el-form :model="form" ref="form" status-icon>
            <el-form-item label="Choose material" 
            prop="MaterialId"
            :rules="rules.Required">
                <el-select v-model="form.MaterialId" 
                filterable placeholder="Select"
                class="textbox-fs">
                    <el-option
                    v-for="item in data"
                    :key="item.Id"
                    :label="item.MaterialName"
                    :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        
        <bwc-modal-footer>
            <el-button @click="isOpen=false">Cancel</el-button>                                 
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"ProductAddMaterialModal",
    props:['open','data','productId'],
    data(){
        return({
            isOpen:false,
            processing:false,
            form:{
                ProductId:this.productId
            },
            rules:ValidattionRules
        })
    },
    methods:{
        saveData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
                if(_.valid){
                    self.processing=true
                    self.$store.dispatch('product/addMaterial',self.form)
                    .then(resolve=>{
                        this.isOpen=false
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

<style lang="less">
</style>
