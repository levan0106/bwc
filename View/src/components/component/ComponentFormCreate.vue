<template>
        <el-form :model="form" :rules="rules" ref="form" status-icon>
            <bwc-loading :loading="loading">    
                <el-row :gutter="20">
                    <el-col :span="10">                
                        <el-form-item label="Supplier" 
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
                        <el-form-item label="Component Code"  
                        prop="ComponentCode" :rules="rules.Required">
                            <el-input v-model="form.ComponentCode" auto-complete="off" 
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="Component Name" 
                        prop="ComponentName" :rules="rules.Required">
                            <el-input v-model="form.ComponentName" 
                            auto-complete="off"
                             ></el-input>
                        </el-form-item>
                        
                        <el-form-item label="Sale Unit Price (Exc GST)" 
                        prop="Price" :rules="rules.Required">
                            <bwc-input-currency 
                            v-model="form.Price"  
                            controls-position="right"
                            class="input-number-fs">
                            </bwc-input-currency>
                        </el-form-item>

                        <el-form-item label="Purchase Unit Price (Exc GST)" 
                        prop="PurchasePrice" :rules="rules.Required">
                            <bwc-input-currency 
                            v-model="form.PurchasePrice"  
                            controls-position="right"
                            class="input-number-fs">
                            </bwc-input-currency>
                        </el-form-item>
                        <el-form-item label="Description" >
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="Please input"
                                v-model="form.Description"
                                >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="Type"
                        prop="ComponentType"
                        :rules="rules.Required" >
                            <el-select v-model="form.ComponentType" 
                            placeholder="Please select a type"
                            class="textbox-fs"
                            filterable >
                                <el-option v-for="c in types" 
                                :label="c.TypeName" 
                                :value="c.TypeId"
                                :key="c.TypeId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Color" >
                            <el-select v-model="form.Color" 
                            placeholder="Please select a color"
                            class="textbox-fs"
                            filterable>
                                <el-option v-for="c in colors" 
                                :label="c.ColorName" 
                                :value="c.ColorName"
                                :key="c.ColorName"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Unit" >
                            <el-select v-model="form.Unit" 
                            placeholder="Please select a Unit"
                            class="textbox-fs"
                            filterable>
                                <el-option v-for="u in units" 
                                :label="u.UnitName" 
                                :value="u.UnitName"
                                :key="u.UnitName"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Purchase Discount (%)" >
                            <bwc-input-number 
                            v-model="form.Discount"  
                            controls-position="right"
                            class="input-number-fs"                              >
                            </bwc-input-number>
                        </el-form-item>
                        
                       <el-form-item label="Status" >
                            <el-select v-model="form.ActiveStatus" 
                            placeholder="Please select a status"
                            class="textbox-fs">
                                <el-option v-for="st in status" 
                                :label="st.label" 
                                :value="st.value" 
                                :key="st.value"></el-option>
                            </el-select>
                        </el-form-item>
                        
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

export default {
    name:"ComponentFormCreate",
    props:['type','id'], 
    data(){
        return({
            loading:true,
            processing:false,
            formLabelWidth: '170px',
            form:{
                ActiveStatus:1
            },
            types:[
                {
                    TypeId:0,
                    TypeName:'Sale'
                },
                {
                    TypeId:1,
                    TypeName:'Purchase'
                }
            ],
            rules:ValidattionRules
        })
    },
    computed:{
        colors(){
                return this.$store.getters['color/all']
        },
        status(){
                return this.$store.getters.status
        },
        units(){
                return this.$store.getters.units
        },
        supplierList(){
            return this.$store.getters['supplier/all']
        }
    },
    created(){
        
        this.$store.dispatch('component/clearInfo')
        if(this.id >0){
            this.$store.dispatch('component/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false;  
                 this.form = this.$store.getters['component/info']
            })       
        }else{
            this.loading=false;
        }

        this.$store.dispatch('supplier/pullAll')  
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
                if(this.id > 0){
                    this.$store.dispatch('component/update',{id:this.id,data:this.form})
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/component/list";
                    })  
                }else{
                    this.$store.dispatch('component/insert',this.form)
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/component/list";
                    })
                }
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

