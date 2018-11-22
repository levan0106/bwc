<template>
<div id="purchase-form-create">
            <el-form :model="form" ref="form">	
				<el-row :gutter="20">
					<el-col :span="16">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="Purchase Id" >
                                    <el-input v-model="form.Id" disabled></el-input>
                                </el-form-item>	                               
                                <el-form-item label="Employee" >
                                    <bwc-hidden-field :value="form.EmployeeName"/> 
                                    <el-input v-model="form.EmployeeName" disabled></el-input>
                                    <!-- <el-select v-model="form.EmployeeId" 
                                    placeholder="Select an employee"
                                    class="textbox-fs"
                                    @change="employeeChange">
                                        <el-option v-for="emp in employeeList" 
                                        :label="emp.Name" :value="emp.Id" :key="emp.Id"></el-option>
                                    </el-select> -->
                                </el-form-item>  
                                <!-- <el-form-item label="Status" >
                                    <el-select v-model="form.Step" 
                                    placeholder="Please select a type"
                                    class="textbox-fs">
                                        <el-option v-for="ste in steps" 
                                        :label="ste.Label" 
                                        :value="ste.Value" 
                                        :key="ste.Value"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                
                            </el-col>
                            <el-col :span="8">
                                                        
                                <el-form-item label="Taxes (GST) (%)" >
                                    <el-input-number v-model="form.Taxes" 
                                    auto-complete="off"
                                    class="input-number-fs"
                                    controls-position="right">
                                    </el-input-number>
                                </el-form-item>
                                <!-- <el-form-item label="Surcharge" >
                                    <bwc-input-currency v-model="form.Surcharge"
                                    class="input-number-fs"
                                    controls-position="right"></bwc-input-currency>
                                </el-form-item> -->
                                <!-- <el-form-item label="Discount" >
                                    <bwc-input-currency v-model="form.Discount"
                                    class="input-number-fs"
                                    controls-position="right"></bwc-input-currency>
                                </el-form-item>     -->
                                
                                <el-form-item label="Ref No." >
                                <el-input v-model="form.OrderRefNo" auto-complete="off"></el-input>
                                </el-form-item>                            
                                
                            </el-col>
                            <el-col :span="8">
                                  
                                <el-form-item label="Supplier name" prop="SupplierId" 
                                 :rules="rules.Required">
                                <bwc-hidden-field :value="form.SupplierName"/>
                                <el-select v-model="form.SupplierId" 
                                placeholder="Please select a supplier"
                                class="textbox-fs"
                                @change="supplierChange">
                                    <el-option v-for="sup in supplierList" 
                                        :label="sup.Company" 
                                        :value="sup.Id" 
                                        :key="sup.Id"></el-option>
                                </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="Order Date" >
                                    <el-date-picker
                                        v-model="form.OrderDate"
                                        type="date"
                                        format="dd/MM/yyyy"
                                        value-format="yyyy-MM-dd"
                                        :default-value="Date()"
                                        placeholder="Pick a day"
                                        disabled>
                                    </el-date-picker>
                                </el-form-item>  -->
                                <!-- <el-form-item label="Discount %">
                                    <el-input-number v-model="form.Discount" 
                                    controls-position="right" 
                                    class="input-number-fs"  ></el-input-number>
                                </el-form-item> -->
                                <!-- <el-form-item label="Receive Date" >
                                    <el-date-picker
                                        v-model="form.FirtReceiveDate"
                                        type="date"
                                        format="dd/MM/yyyy"
                                        value-format="yyyy-MM-dd"
                                        placeholder="Pick a day">
                                    </el-date-picker>
                                </el-form-item> -->
                                
                                <!-- <el-form-item label="Last Update" >
                                    <el-date-picker
                                        v-model="form.LastUpdate"
                                        type="date"
                                        format="dd/MM/yyyy"
                                        value-format="yyyy-MM-dd"
                                        placeholder="Pick a day">
                                    </el-date-picker>
                                </el-form-item> -->
                            </el-col>
                        </el-row>
                       <el-row>                             
                           <el-form-item label="Notes" >
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="Please input"
                                    v-model="form.Notes">
                                </el-input>
                           </el-form-item>
                       </el-row>
					</el-col>	
					<el-col :span="8">
                        <el-form-item label="Delivery Date" >
                            <el-date-picker
                                v-model="form.DeliveryDate"
                                type="date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"
                                placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Delivery No" >
						  <el-input v-model="form.DeliveryNo" auto-complete="off"></el-input>
						</el-form-item>
                        <!-- <el-form-item label="AMT Exc GST" >
						  <bwc-input-currency v-model="form.AMTExcGST" auto-complete="off" 
                          class="textbox-fs" controls-position="right"></bwc-input-currency>
						</el-form-item>
                        <el-form-item label="GST" >
						  <bwc-input-currency v-model="form.GST" auto-complete="off" 
                          class="textbox-fs" controls-position="right"></bwc-input-currency>
						</el-form-item>
                        <el-form-item label="AMT Inc GST" >
						  <bwc-input-currency v-model="form.AMTIncGST" auto-complete="off"
                           class="textbox-fs" controls-position="right"></bwc-input-currency>
						</el-form-item> -->
                        <!-- <el-form-item label="Supplier name" prop="SupplierId" >
                        <bwc-hidden-field :value="form.SupplierName"/>
						  <el-select v-model="form.SupplierId" 
                          placeholder="Please select a supplier"
                          class="textbox-fs"
                          @change="supplierChange">
							<el-option v-for="sup in supplierList" 
                                :label="sup.Company" 
                                :value="sup.Id" 
                                :key="sup.Id"></el-option>
						  </el-select>
						</el-form-item>
                        <el-form-item label="Supplier Address" prop="SupplierAddress" >
						  <el-input v-model="form.SupplierAddress" auto-complete="off"></el-input>
						</el-form-item>
                        <el-form-item label="Supplier Email" prop="SupplierEmail" >
						  <el-input v-model="form.SupplierEmail" auto-complete="off"></el-input>
						</el-form-item>
                        <el-form-item label="Supplier Phone" prop="SupplierPhone" >
						  <el-input v-model="form.SupplierPhone" auto-complete="off"></el-input>
						</el-form-item> -->
                        
					</el-col>						
				</el-row>
                <el-row class="text-right" v-if="type != 'edit'">
                    <el-button  type="primary" @click="saveData">
                        Continue 
                        <i v-if="processing" class="el-icon-loading"></i>
                        <i v-else class="el-icon-d-arrow-right"></i>
                    </el-button>
                </el-row>
                <bwc-modal-footer v-else>
                    <el-button @click="handleCloseModal">Cancel</el-button>
                    <el-button type="primary" @click="saveData">
                        Save
                        <i v-if="processing" class="el-icon-loading"></i>
                    </el-button>
                </bwc-modal-footer>
            </el-form>
</div>
</template>

<script>
import Authenticate from '@/plugin/authenticate'
import ValidattionRules from '@/plugin/rule'

export default {
    name:"PurchaseFormCreate",
    props:['type','data','id','from'],
    data(){
        return({
            loading:true,
            processing:false,
            formLabelWidth:"120px",
            form:{
                Id:Date.now(),
                EmployeeName: Authenticate.system.currentUser(),
                Taxes:10,
                Step:1,
                DeliveryDate:this.type == 'create'?'':new Date()
            },
            rules:ValidattionRules
        })
    },
    computed:{
        // form(){
        //     return this.$store.getters['purchase/info']
        // },
        supplierList(){
            return this.$store.getters['supplier/all']
        },
        employeeList(){
            return this.$store.getters['employee/all']
        },
        steps(){
            return this.$store.getters['purchase/steps'].filter(_=>_.Value >= this.form.Step)
        }
    },
    created(){
        if(this.id >0){    
            this.form = this.data
        }else{            
            this.$store.dispatch('purchase/clearInfo')
            this.loading=false
        }
        this.$store.dispatch('supplier/pullAll')  
        this.$store.dispatch('employee/pullAll')
    },
    methods:{
        supplierChange(val){
            let supplier = this.supplierList.filter(_=>_.Id == val)
            this.form.SupplierAddress=supplier[0].Address
            this.form.SupplierEmail=supplier[0].Email
            this.form.SupplierPhone=supplier[0].BusinessPhone
            this.form.SupplierName=supplier[0].Company
        },
        // employeeChange(val){
        //     let employee = this.employeeList.filter(_=>_.Id == val)
        //     this.form.EmployeeName=employee[0].Name
        // },
        async saveData(){
            let self = this
            self.processing=true
            self.isDisabled=true

            //validate data
            self.validateForm('form')
            .then(_=>{
                            
                if(_.valid){
                    //save data
                    if(self.id > 0){
                        self.$store.dispatch('purchase/update',{id:self.id,data:self.form})
                        .then(_=>{
                            this.processing=false
                            this.handleCloseModal()
                        })  
                    }else{
                        self.$store.dispatch('purchase/insert',self.form)
                        .then(_=>{
            
                            let productSelected = this.$store.getters['order/productSelected']
                            let componentSelected = this.$store.getters['order/componentSelected']
                            
                            self.$store.dispatch('purchase/addProductFromOrder',{
                                purchaseId:self.form.Id,
                                data:productSelected
                                })
                            .then(_=>{                                    
                                self.$store.dispatch('purchase/addComponentFromOrder',{
                                    purchaseId:self.form.Id,
                                    data:componentSelected
                                    })
                                .then(_=>{                            
                                    window.location.href = window.bwc.rootUrl + "/purchase/"+self.form.Id+"/detail"
                                })
                            })
                        })
                    }
                }else{
                    self.processing=false
                    self.isDisabled=false
                    return false
                }
            })
            
            
        },
        async validateForm(formName) {
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

<style lang="less">
    #purchase-form-create{
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100% !important;
        }
    }
</style>

