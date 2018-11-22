<template>
    <el-form :model="form" :rules="rules" ref="form" status-icon>
        <bwc-loading :loading="loading">    
            <el-row :gutter="20">
                <el-col :span="12">
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
                <el-col :span="12"> 
                    <el-form-item label="Frame (Width -)" >
                        <bwc-input-number v-model="form.FrameWidth" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>
                    <el-form-item label="Frame (Drop -)" >
                        <bwc-input-number v-model="form.FrameDrop" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>
                    <el-form-item label="Mesh (Width -)" >
                        <bwc-input-number v-model="form.MeshWidth" 
                        auto-complete="off"
                        controls-position="right"
                        class="input-number-fs"
                        ></bwc-input-number>
                    </el-form-item>
                    <el-form-item label="Mesh (Drop -)" >
                        <bwc-input-number v-model="form.MeshDrop" 
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

