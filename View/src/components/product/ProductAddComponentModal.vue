<template>
<div id="productcomponentmodal">    
       
    <el-dialog title="Add component " :visible.sync="open"  class="modal modal-lg">        
        <el-form :model="form" ref="form" status-icon> 
            <bwc-loading :loading="loading">
            <el-row :gutter="20">
                <el-col :span="12">                
                    <el-form-item label="Component" prop="ComponentId"
                    :rules="rules.Required">
                        <el-select v-model="form.ComponentId" 
                        filterable placeholder="Select"
                        class="textbox-fs">
                            <el-option
                            v-for="item in data"
                            :key="item.Id"
                            :label="item.ComponentName"
                            :value="item.Id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Quantity">
                        <el-input-number v-model="form.Quantity" auto-complete="off"
                        controls-position="right" class="input-number-fs"></el-input-number>
                    </el-form-item>          
                    <!-- <el-form-item >
                        <el-checkbox v-model="form.ExtCharge">Ext Charge</el-checkbox>
                    </el-form-item>                 -->
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Color" prop="ColorId"
                    :rules="rules.Required">
                        <el-select v-model="form.ColorId" 
                        placeholder="Please select a color"
                        class="textbox-fs">
                            <el-option
                            v-for="item in colors"
                            :key="item.Id"
                            :label="item.ColorName"
                            :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="Price" v-if="form.ExtCharge" >
                        <bwc-input-currency v-model="form.Price" auto-complete="off"
                        controls-position="right" class="input-number-fs" ></bwc-input-currency>
                    </el-form-item>    -->
                </el-col>
            </el-row>
            </bwc-loading> 
        </el-form>
        <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>                                 
            <el-button v-if="componentId > 0" type="primary" @click="updateData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
            <el-button v-else type="primary" @click="saveData">
                Add
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"ProductAddComponentModal",
    props:['open','data','productId','componentId'],
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth:'150px',
            form:{
                ProductId:this.productId
            },
            rules:ValidattionRules
        })
    }, 
    computed:{
        colors(){
            return this.$store.getters['color/all']
        },
        forceReloadPage(){
            return this.$store.getters.forceReloadPage
        }
    },
    watch:{
        forceReloadPage(val){
            this.loadData()
        }
    },
    created(){
        this.loadData()
    },
    methods:{
        closeModal(){
            this.$emit('close-modal')
            
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        loadData(){
            this.loading=true
            if(this.componentId > 0){
                this.$store.dispatch('product/pullComponent',this.componentId)
                .then(_=>{
                    this.loading=false
                    this.form = this.$store.getters['product/component']
            })
            }else{
                this.loading=false
                this.form={
                    ProductId:this.productId,
                    Quantity:1
                }
            }
        },
        saveData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
               if(_.valid){
                    self.processing=true
                    self.$store.dispatch('product/addComponent',self.form)
                    .then(resolve=>{       
                        this.$emit('save-data');
                        self.processing=false
                        //force reload page
                        this.$store.dispatch('forceReloadPage')
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
                    self.$store.dispatch('product/updateComponent',{id:self.componentId,data:self.form})
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

<style lang="less">
</style>
