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
                        class="textbox-fs"
                        @change="componentChange">
                            <el-option
                            v-for="item in componentList"
                            :key="item.Id"
                            :label="item.ComponentCode"
                            :value="item.Id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Quantity">
                        <el-input-number v-model="form.Quantity" auto-complete="off"
                        controls-position="right" class="input-number-fs"></el-input-number>
                    </el-form-item>   
                    <el-form-item label="Discount (%)">
                        <el-input-number v-model="form.Discount" auto-complete="off"
                        controls-position="right" class="input-number-fs"></el-input-number>
                    </el-form-item>    
                    <el-form-item label="Size">
                        <el-input v-model="form.Size" 
                            controls-position="right" 
                            class="input-number-fs"></el-input>
                    </el-form-item>    
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
                    
                    <el-form-item label="Unit">
                        <el-input v-model="form.UnitName" auto-complete="off"
                        disabled
                        controls-position="right" class="input-number-fs">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Unit Price">
                        <el-input v-model="form.Price" auto-complete="off"
                        disabled
                        controls-position="right" class="input-number-fs">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </bwc-loading> 
        </el-form>
        <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>                                 
            <el-button v-if="componentId > 0" type="primary" @click="saveData('update')">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
            <el-button v-else type="primary" @click="saveData('add')">
                Add
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import ValidattionRules from '@/plugin/rule'
import BwcInputNumber from '@/components/controls/InputNumber.vue'

export default {
    name:"OrderAddComponentModal",
    components:{
        BwcInputNumber
    },
    props:['open','orderId','componentId','componentList'],
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth:'150px',
            form:{
                OrderId:this.orderId,
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
            
            // //force reload page
            // this.$store.dispatch('forceReloadPage')
        },
        loadData(){
            this.loading=true
            if(this.componentId > 0){
                this.$store.dispatch('order/pullComponent',this.componentId)
                .then(_=>{
                    this.loading=false
                    this.form = this.$store.getters['order/component']
            })
            }else{
                this.loading=false
                this.form={
                    OrderId:this.orderId,
                    Quantity:1,
                    Discount:0,
                    UnitName:'',
                }
            }
        },
        componentChange(val){
            var component = this.componentList.filter(_=>_.Id == val)[0]
            this.form.Discount = component.Discount 
            this.form.UnitName = component.Unit
            this.form.Price = component.Price
        },
        saveData(actionType){
            let self = this
            this.processing = true

            let url = 'order/updateComponent'
            let param = {
                id:self.componentId,
                data:self.form
            }
            if(actionType == 'add'){
                url = 'order/addComponent'
                param = self.form
            }

            self.validateForm('form')
            .then(_=>{
               if(_.valid){
                    self.processing=true
                    self.$store.dispatch(url,param)
                    .then(resolve=>{
                        this.$emit('save-data');
                        self.processing=false
                        // //force reload page
                        // this.$store.dispatch('forceReloadPage')
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
