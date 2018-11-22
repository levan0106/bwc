<template>
    <div id="purchase-product-modal">       
    <el-dialog title="Add component " :visible.sync="open"  class="modal modal-lg-x">        
        <el-form :model="form" ref="form" status-icon> 
            <bwc-loading :loading="loading">
                <bwc-grid-data
                :data="components"
                :loading="loading"
                no-paging
                :default-sort = "{prop: 'Id', order: 'descending'}">
                    <el-table-column
                    prop="Id"
                    type="index">
                    </el-table-column>

                    <el-table-column
                        prop="ComponentCode"
                        label="Code">
                    </el-table-column>
                    
                    <!-- <el-table-column
                        prop="Description"
                        label="Description">
                        <template slot-scope="scope">
                            {{scope.row.Description|nullValue}}
                        </template>
                    </el-table-column> -->
                    
                    <el-table-column
                        prop="Color"
                        label="Color">					  
                    </el-table-column>

                    <el-table-column
                        prop="Unit"
                        label="Unit">
                        <template slot-scope="scope">
                            {{scope.row.Unit|nullValue}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="PurchasePrice"
                        label="Purchase Unit Price Excl GST">
                        <template slot-scope="scope">
                            {{scope.row.PurchasePrice|currency}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="Discount"
                        width="180"
                        label="Purchase Discount (%)">
                        <template slot-scope="scope">
                            {{scope.row.Discount|percent}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="Quantity"
                        fixed="right"
                        label="Ord Qty">
                        <template slot-scope="scope">
                            <bwc-input-number v-model="scope.row.Quantity" 
                            controls-position="right" 
                            class="input-number-fs"></bwc-input-number>
                        </template>
                    </el-table-column>
                </bwc-grid-data>  
            </bwc-loading> 
        </el-form>
        <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>   
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcInputNumber from '@/components/controls/InputNumber.vue'

export default {
    name:"PurchaseAddComponentModal",
    components:{
        BwcGridData,
        BwcInputNumber
    },
    props:['open','data','purchaseId','id','componentList'],
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth:'150px',
            form:{
                OrderId:this.purchaseId,
                Quantity:1,
                UnitId:1,
                Step:1
            },
            // rules:{
            //     ComponentId:[
            //         {required:true,message:'Please select a component',trigger:'blur'}
            //     ],
            //     ColorId:[
            //         {required:true,message:'Please select a color',trigger:'blur'}
            //     ],
            //     UnitId:[
            //         {required:true,message:'Please select a unit',trigger:'blur'}
            //     ],
            //     Quantity:[
            //         {required:true,message:'Please input quantity',trigger:'blur'}
            //     ]
            // },
           // data:[]
        })
    }, 
    computed:{
        // colors(){
        //     return this.$store.getters['color/all']
        // },
        // units(){
        //     return this.$store.getters.units
        // },
        components(){
            let self = this
            let data =[]
            this.componentList.forEach(function(item){
                //debugger
                let newItem = item
                //get component value
                let component = self.data.filter(_=>_.ComponentId == item.Id)
                //set quantity selected
                newItem.Quantity = component.length > 0 ? component[0].Quantity : 0
                //this is purchase page thereforce the price is purchaseprice
                newItem.Price = item.PurchasePrice

                //add coponent into list
                data.push(newItem)
            })

            return data

        }
        // backOrder(){
        //     let received = isNaN(this.form.Received)?0: parseInt(this.form.Received)
        //     let quantity = isNaN(this.form.Quantity)?0: parseInt(this.form.Quantity)
        //     let number = quantity - received
        //     return number
        // },
        // AMTExcGST(){
        //     let quantity = parseInt(this.form.Quantity) 
        //     let amount = quantity * this.form.Price
        //     return amount
        // },
        // GST(){
        //     return this.AMTExcGST * this.purchase.Taxes/100
        // },
        // AMTIncGST(){
        //     return this.GST + this.AMTExcGST
        // },
        // ReceivedAMTExcGST(){
        //     let quantity = parseInt(this.form.Received) 
        //     let amount = quantity * this.form.Price
        //     return amount
        // },
        // ReceivedGST(){
        //     return this.ReceivedAMTExcGST * this.purchase.Taxes/100
        // },
        // ReceivedAMTIncGST(){
        //     return this.ReceivedGST + this.ReceivedAMTExcGST
        // }
        // steps(){
        //     return this.$store.getters['purchase/steps'].filter(_=>_.Value >= this.form.Step)
        // }
    },
    watch:{
        id:function (val){
            this.loading=true
            // if(val > 0){
            //     this.$store.dispatch('purchase/pullComponent',val)
            //     .then(_=>{
            //         this.loading=false
            //         this.form = this.$store.getters['purchase/component']
            // })
            // }else{
            //     this.loading=false
            //     this.form={
            //         OrderId:this.purchaseId,
            //         Quantity:1,
            //         UnitId:1,
            //         Step:1
            //     }
            // }
        }
    },
    methods:{
        closeModal(){
            this.$emit('close-modal')
        },
        saveData(){
            //debugger
            let self = this
            const data = this.components.filter(_ => _.Quantity > 0)
            this.$store.dispatch('purchase/updateListComponent',{id:this.purchaseId,data:data})
            .then(resolve=>{       
                this.$emit('save-data');
                self.processing=false
            })
            .catch(error=>{
                self.processing=false
            })
            // self.validateForm('form')
            // .then(_=>{
            //    if(_.valid){
            //         self.processing=true
            //         self.form.AMTExcGST=this.AMTExcGST
            //         self.form.GST=this.GST
            //         self.form.AMTIncGST=this.AMTIncGST
            //         self.form.ReceivedAMTExcGST=this.ReceivedAMTExcGST
            //         self.form.ReceivedGST=this.ReceivedGST
            //         self.form.ReceivedAMTIncGST=this.ReceivedAMTIncGST

            //         self.$store.dispatch('purchase/addComponent',self.form)
            //         .then(resolve=>{       
            //             this.$emit('save-data');
            //             self.processing=false
            //         })
            //         .catch(error=>{
            //             self.processing=false
            //         })
            //     }else{
            //         self.processing=false
            //     }
            // })
        },
        updateData(){
            // let self = this
            // self.validateForm('form')
            // .then(_=>{
            //    if(_.valid){
            //         self.processing=true
            //         self.form.AMTExcGST=this.AMTExcGST
            //         self.form.GST=this.GST
            //         self.form.AMTIncGST=this.AMTIncGST
            //         self.form.ReceivedAMTExcGST=this.ReceivedAMTExcGST
            //         self.form.ReceivedGST=this.ReceivedGST
            //         self.form.ReceivedAMTIncGST=this.ReceivedAMTIncGST
                    
            //         self.$store.dispatch('purchase/updateComponent',{id:self.id,data:self.form})
            //         .then(resolve=>{
            //             this.$emit('save-data');
            //             self.processing=false
            //         })
            //         .catch(error=>{
            //             self.processing=false
            //         })
            //     }else{
            //         self.processing=false
            //     }
            // })
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

<style>

</style>
