<template>

    <el-form :model="form" ref="form" status-icon>
        <bwc-loading :loading="loading">
        <el-row :gutter="20">
            <el-col :span="12">
                <bwc-title>Primary Contact</bwc-title>    
                <el-col :span="12">            
                    <el-form-item label="First Name"
                    prop="FirstName"
                    :rules="rules.Required" >
                        <el-input v-model="form.FirstName" 
                        auto-complete="off" 
                        ></el-input>
                    </el-form-item>  

                    <el-form-item label="Last Name"
                    prop="LastName"
                    :rules="rules.Required">
                        <el-input
                            auto-complete="off" 
                            v-model="form.LastName">
                        </el-input>
                    </el-form-item> 

                    <el-form-item label="Mobile Phone"
                    prop="MobilePhone" 
                        :rules="rules.Required"  >
                        <el-input
                            auto-complete="off" 
                            v-model="form.MobilePhone">
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

                     <el-form-item label="Salary per hours">
                        <bwc-input-currency 
                        v-model="form.SalaryPerHours"
                        controls-position="right"
                        class="input-number-fs">
                        </bwc-input-currency>
                     </el-form-item>

                     <el-form-item label="Sick Leave Rate">
                        <bwc-input-number 
                        v-model="form.SickLeaveRate"
                        controls-position="right"
                        class="input-number-fs"
                        digit="6">
                        </bwc-input-number>
                     </el-form-item>

                     <el-form-item label="Hire Date" >
                            <el-date-picker
                                v-model="form.HireDate"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Tax File Number" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.TaxFileNumber">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Superannuation Name" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.SuperannuationName">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Fund ABN" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.FundABN">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Fund Address" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.FundAddress">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Fund USI" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.FundUSI">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Superannuation Member Number" >
                        <el-input
                            auto-complete="off" 
                            v-model="form.SuperannuationMemberNumber">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Annual Leave Rate">
                        <bwc-input-number 
                        v-model="form.AnnualLeaveRate"
                        controls-position="right"
                        class="input-number-fs"
                        digit="6">
                        </bwc-input-number>
                     </el-form-item>

                    <el-form-item label="Last Working Date" >
                            <el-date-picker
                                v-model="form.LastWorkingDate"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
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
            <bwc-title>Company</bwc-title>
                <el-form-item label="Email" prop="Email" :rules="rules.Email" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.Email"
                        type="email">
                    </el-input>
                </el-form-item> 

                <el-form-item label="Company" > 
                    <el-input v-model="form.Company"  ></el-input>
                </el-form-item>

                <el-form-item label="Web Page" >
                    <el-input
                        auto-complete="off" 
                        v-model="form.WebPage">
                    </el-input>
                </el-form-item>                         
            </el-col>
            <!-- <el-col :span="12">                      
                <bwc-title>Phone Numbers</bwc-title>
                <el-form-item label="Business Phone"  >
                    <el-input v-model="form.BusinessPhone" 
                    auto-complete="off"  
                    ></el-input>
                </el-form-item>  
                <el-form-item label="Fax Number" >
                    <el-input v-model="form.FaxNumber" 
                    auto-complete="off" 
                    ></el-input>
                </el-form-item> 
            </el-col> -->
                
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
                <el-form-item label="Business Phone"  >
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
    name:"EmployeeormCreate",
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
            return this.$store.getters['employee/info']
        },
    },
    created(){        
        this.$store.dispatch('employee/clearInfo')
        if(this.id >0){
            this.$store.dispatch('employee/pullInfo',this.id) 
            .then(()=>{                
                this.loading=false;
            })       
        }else{
            this.loading=false;
        }

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
                    this.$store.dispatch('employee/update',{id:this.id,data:this.form})
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/employee/list";
                    })  
                }else{
                    this.$store.dispatch('employee/insert',this.form)
                    .then(_=>{
                        window.location.href = window.bwc.rootUrl + "/employee/list";
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

