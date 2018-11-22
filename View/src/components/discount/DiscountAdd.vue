<template>
<el-dialog title="Add Discount" :visible.sync="isOpen" class="modal modal-md"
@close="closeModal">
        <el-form :model="form" ref="form"  :rules="customRules"  status-icon>
            <el-form-item label="Choose Customer/Supplier" 
            prop="ObjectId"
            :rules="rules.Required">
                <el-select v-model="form.ObjectId" 
                filterable placeholder="Select"
                class="textbox-fs">
                    <el-option
                    v-for="item in objects"
                    :key="item.Id"
                    :label="item.Company"
                    :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Choose Product" 
            prop="ProductId"
            :rules="rules.Required">
                <el-select v-model="form.ProductId" 
                filterable placeholder="Select"
                class="textbox-fs">
                    <el-option
                    v-for="item in products"
                    :key="item.Id"
                    :label="item.ProductName"
                    :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Discount (%)" 
            prop="DiscountValue">
                <bwc-input-number
                    auto-complete="off" 
                    v-model="form.DiscountValue"
                    controls-position="right"
                    class="input-number-fs">
                </bwc-input-number>
            </el-form-item>
        </el-form>
        
        <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>                                 
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</template>


<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"DiscountAdd",
    props:['id','openModal','discountType','objects','products'],
    data(){
        var checkMinMax = (rule, value, callback) => {
            if (value < 0 || value > 100) {
            callback(new Error('Please input the number'));
            }
            callback();
        };
        return({
            isOpen:false,
            processing:false,
            form:{
                DiscountType:this.discountType
            },
            rules:ValidattionRules,
            customRules:{
                DiscountValue:[{ validator: checkMinMax,message: 'This must be greater than 0 and less than 100 ', trigger: 'blur' }]
            }
        })
    },
    computed:{
        // objects(){
        //     return this.$store.getters['customer/all']
        // },
        // products(){
        //     return this.$store.getters['product/all']
        // }
    },
    watch:{
        openModal(val){
            this.isOpen = val
        },
        id(val){
            this.init()
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let self = this

            if(this.id != undefined && this.id > 0){
                this.$store.dispatch('discount/pullInfo',this.id)
                .then(response=>{  
                    self.form = response
                })                
            }else{
                self.form = {
                    DiscountType:this.discountType
                }
            }
        },        
        saveData(){
            this.processing = true
            //validate data
            this.validateForm('form')
            .then(_=>{
                if(_.valid && this.checkUnit()){
                    //save data
                    if(this.id > 0){
                        this.$store.dispatch('discount/update',{
                            id:this.id,
                            data:this.form
                        })
                        .then(()=>{                            
                            this.$emit("save-data")
                            this.processing=false
                        })
                    }else{
                        this.$store.dispatch('discount/insert',this.form)
                        .then(()=>{                            
                            this.$emit("save-data")
                            this.processing=false
                        })  
                    }                    
                }else{
                    this.processing=false
                    return false
                }

            })
        },
        checkUnit(){
            return true
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
        closeModal(){
            this.$emit('close-modal')
        }
    }

}
</script>
