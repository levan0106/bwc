<template>
    <el-form :model="form" :rules="rules" ref="form" status-icon>
        <bwc-loading :loading="loading">    
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="Category Code">
                        <el-input v-model="form.CategoryCode" 
                        auto-complete="off" disabled></el-input>
                    </el-form-item>   
                    
                    <el-form-item label="Category Name" 
                    prop="CategoryName" :rules="rules.Required">
                        <el-input v-model="form.CategoryName" 
                        auto-complete="off"
                            ></el-input>
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
                    <!-- <el-form-item label="Status" >
                        <el-select v-model="form.ActiveStatus" 
                        placeholder="Please select a status"
                        class="textbox-fs">
                            <el-option v-for="st in status" 
                            :label="st.label" 
                            :value="st.value" 
                            :key="st.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-col>
                <el-col :span="8"> 
                    <el-form-item label="Box Type (Drop < 170)" >
                        <bwc-input-number v-model="form.BoxTypeDrop" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>
                    <el-form-item label="Box Length (Width -)" >
                        <bwc-input-number v-model="form.BoxLength" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>     
                    <el-form-item label="Bottom Bar Height" >
                        <bwc-input-number v-model="form.BottomBarHeight" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>    
                    <el-form-item label="Bottom Bar Length (Width -)" >
                        <bwc-input-number v-model="form.BottomBarLength" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item> 
                </el-col>
                <el-col :span="8"> 
                    <el-form-item label="Slat Height" >
                        <bwc-input-number v-model="form.SlatHeight" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item> 
                    <el-form-item label="Slat Amount ((DROP-(BottomBarHeight + x))/SlatHeight)" >
                        <bwc-input-number v-model="form.SlatAmount" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item> 
                    <el-form-item label="Slat Lenght (Width -)" >
                        <bwc-input-number v-model="form.SlatLenght" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item> 
                    <el-form-item label="Axle Lenght (Width -)" >
                        <bwc-input-number v-model="form.AxleLenght" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item> 
                </el-col>
            </el-row>    
            <el-row :gutter="20">
                <el-col :span="24">
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
    name:"CategoryFormCreate",
    props:['id','data'], 
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth: '170px',
            form:this.data,
            rules:ValidattionRules
        })
    },
    computed:{
        status(){
            return this.$store.getters.status
        },
    },
    watch:{
        data(val){
            this.form = val
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
                    this.$store.dispatch('category/update',{id:this.id,data:this.form})
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/category/list";
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

