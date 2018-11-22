<template>

    <el-form :model="form" ref="form" status-icon>
        <!-- <bwc-title>Company</bwc-title> -->
        <bwc-loading :loading="loading">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-col :span="12">
                <bwc-title>Company</bwc-title>
                    <el-form-item label="Company" prop="Company" 
                    :rules="rules.Required"  > 
                        <el-input v-model="form.Company"  ></el-input>
                    </el-form-item>

                    <el-form-item label="ABN" > 
                        <el-input v-model="form.ABN"></el-input>
                    </el-form-item>
                     
                    <el-form-item label="Email" prop="Email" :rules="rules.Email" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.Email"
                            type="email">
                        </el-input>
                    </el-form-item> 

                    <el-form-item label="Web Page" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.WebPage">
                        </el-input>
                    </el-form-item>                         
                </el-col>
                <el-col :span="12">                      
                    <bwc-title>Phone Numbers</bwc-title>
                    <el-form-item label="Business Phone" prop="BusinessPhone" 
                    :rules="rules.Required"  >
                        <el-input v-model="form.BusinessPhone" 
                        auto-complete="off"  
                        ></el-input>
                    </el-form-item>  
                    <el-form-item label="Fax Number" >
                        <el-input v-model="form.FaxNumber" 
                        auto-complete="off" 
                        ></el-input>
                    </el-form-item> 
                </el-col>
                <el-col :span="24">
                    <el-form-item label="Notes" >
                        <el-input v-model="form.Notes" 
                        type="textarea"
                        :rows="5" 
                        placeholder="Please input"
                        ></el-input>
                    </el-form-item>    
                </el-col>
            </el-col>
            <el-col :span="6">
                <bwc-title>Address/Phones</bwc-title>
                <el-form-item label="Address" prop="Address" :rules="rules.Required" >
                    <el-input
                    v-model="form.Address" 
                    auto-complete="off">
                    </el-input>
                </el-form-item>                     
                <el-form-item label="City" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.City">
                    </el-input>
                </el-form-item>
                <el-form-item label="State/Province" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.State">
                    </el-input>
                </el-form-item>
                <el-form-item label="Zip/Postal Code" >
                    <el-input v-model="form.ZipCode" 
                    auto-complete="off"  
                    ></el-input>
                </el-form-item>
                <el-form-item label="Country/Region" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.Country">
                    </el-input>
                </el-form-item>  
            </el-col>
            <el-col :span="6">
                <bwc-title>Primary Contact</bwc-title>                
                <el-form-item label="First Name" >
                    <el-input v-model="form.FirstName" 
                    auto-complete="off" 
                    ></el-input>
                </el-form-item>  
                <el-form-item label="Last Name">
                    <el-input
                        auto-complete="off" 
                        v-model="form.LastName">
                    </el-input>
                </el-form-item> 
                <el-form-item label="Job Title" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.JobTitle">
                    </el-input>
                </el-form-item>
                
                <el-form-item label="Home Phone" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.HomePhone">
                    </el-input>
                </el-form-item> 
                <el-form-item label="Mobile Phone" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.MobilePhone">
                    </el-input>
                </el-form-item>    
            </el-col>
        </el-row>
                        
        <el-row class="text-right">
            <el-col :span="24">
                <el-button type="primary" :disabled="processing" @click="saveData">
                    Save
                    <i v-if="processing" class="el-icon-loading"></i> 
                </el-button>   
            </el-col>
        </el-row>
        </bwc-loading>
    </el-form>
</template>

<script>
import ValidattionRules from '@/plugin/rule'

export default {
    name:"SupplierFormCreate",
    props:['type','id'],
    data(){
        return({
            loading:true,
            processing:false,            
            rules:ValidattionRules
        })
    },
    computed:{
        form(){
            return this.$store.getters['supplier/info']
        },
    },
    created(){        
        this.$store.dispatch('supplier/clearInfo')
        if(this.id >0){
            this.$store.dispatch('supplier/pullInfo',this.id) 
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
            this.processing=true
            this.isDisabled=true
            let self = this
            //validate data
            this.validateForm('form')
            .then(_=>{
                if(_.valid){
                //save data
                if(this.id > 0){
                    this.$store.dispatch('supplier/update',{id:this.id,data:this.form})
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/supplier/list";
                    })  
                }else{
                    this.$store.dispatch('supplier/insert',this.form)
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/supplier/list";
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

