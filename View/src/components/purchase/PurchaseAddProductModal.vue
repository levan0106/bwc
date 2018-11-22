<template>
    <div id="purchase-product-modal">      
    <el-dialog title="Add product " :visible.sync="open"  fullscreen>
        <bwc-title>Order Informations</bwc-title>
           <el-form :model="form" :rules="rules" ref="form">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="Product Name" :label-width="formLabelWidth" prop="ProductId">
                            <el-select v-model="form.ProductId"
                            placeholder="Please select a product"
                            class="textbox-fs"
                            filterable
                            @change="onProductChange">
                                <el-option v-for="p in data" 
                                :label="p.ProductName" 
                                :value="p.Id"
                                :key="p.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="Location" :label-width="formLabelWidth">
                            <el-select v-model="form.LocationId" 
                            placeholder="Please select a location"
                            filterable
                            class="textbox-fs">
                                <el-option v-for="l in locations" 
                                :label="l.LocationName" 
                                :value="l.Id"
                                :key="l.Id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="Location" :label-width="formLabelWidth">
                            <el-input v-model="form.LocationName" ></el-input>
                        </el-form-item>
                        
                        <!-- <el-form-item label="Color" :label-width="formLabelWidth">
                            <el-select v-model="form.ColorId" 
                            placeholder="Please select a color"
                            filterable
                            class="textbox-fs">
                                <el-option v-for="c in colors" 
                                    :label="c.ColorName" 
                                    :value="c.Id"
                                    :key="c.Id"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="Color" :label-width="formLabelWidth">
                            <el-input v-model="form.ColorName" ></el-input>
                        </el-form-item>
                        
                        <el-form-item label="Control Side" :label-width="formLabelWidth">
                            <el-select v-model="form.ControlSideId" 
                            placeholder="Please select a control"
                            filterable
                            class="textbox-fs">
                                <el-option v-for="c in controlSides" 
                                :label="c.ControlSideName" 
                                :value="c.Id"
                                :key="c.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Unit" :label-width="formLabelWidth">
                            <el-select v-model="form.UnitId"
                            filterable 
                            placeholder="Please select a unit"
                            class="textbox-fs">
                                <el-option v-for="u in units" 
                                :label="u.UnitName" 
                                :value="u.Id"
                                :key="u.Id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        
                        <el-form-item label="Material" :label-width="formLabelWidth" prop="MaterialId">
                            <el-select v-model="form.MaterialId" 
                            placeholder="Please select a material"
                            class="textbox-fs"
                            filterable
                            @change="onMaterialChange">
                                <el-option v-for="m in materials" 
                                :label="m.MaterialName" 
                                :value="m.MaterialId"
                                :key="m.Id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Drop" :label-width="formLabelWidth" prop="Drop">
                            <el-input-number v-model="form.Drop" 
                            controls-position="right" 
                            class="input-number-fs" ></el-input-number>
                        </el-form-item>

                        <el-form-item label="Width" :label-width="formLabelWidth" prop="Width">
                            <el-input-number v-model="form.Width" 
                            controls-position="right" 
                            class="input-number-fs"></el-input-number>
                        </el-form-item>
                        
                        <el-form-item label="Unit Price" :label-width="formLabelWidth">
                            <bwc-input-currency v-model="unitPrice"
                            disabled
                            controls-position="right"
                            class="input-number-fs" ></bwc-input-currency>
                        </el-form-item>                    
                    </el-col>
                    
                    <el-col :span="8">
                        
                        <el-form-item label="Quantity" :label-width="formLabelWidth">
                            <el-input-number v-model="form.Quantity" 
                            controls-position="right" 
                            class="input-number-fs" ></el-input-number>
                        </el-form-item>
                        <el-form-item label="Discount (%)" :label-width="formLabelWidth">
                            <el-input-number v-model="form.Discount" 
                            controls-position="right" 
                            class="input-number-fs"  ></el-input-number>
                        </el-form-item>
                        
                        <el-form-item label="Extend Price" :label-width="formLabelWidth">
                            <bwc-input-currency 
                            v-model="form.ExtendPrice" 
                            class="input-number-fs"
                            controls-position="right"
                            ></bwc-input-currency>
                        </el-form-item>    
                        <el-form-item label="Total Amount" :label-width="formLabelWidth" :class="totalAmount <= 0 ?'color':''">
                            <bwc-input-currency v-model="totalAmount" 
                            disabled
                            controls-position="right"
                            class="input-number-fs"></bwc-input-currency>
                        </el-form-item>
                    </el-col>
                </el-row>
            <bwc-title>Receive</bwc-title>
            <el-row :gutter="20">
                <!-- <el-col :span="6">
                    <el-form-item label="Delivery No" :label-width="formLabelWidth" >
                        <el-input v-model="form.DeliveryNo" auto-complete="off" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Delivery Date" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="form.DeliveryDate"
                            type="date"
                            format="dd/MM/yyyy"
                            value-format="yyyy-MM-dd"
                            placeholder="Pick a day">
                            </el-date-picker>
                    </el-form-item>
                </el-col> -->
                <el-col :span="8">
                    <el-form-item label="Qty Received" :label-width="formLabelWidth">
                        <el-input-number v-model="form.Received" 
                        controls-position="right" 
                        class="input-number-fs" ></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="Qty Back Order" :label-width="formLabelWidth">
                        <el-input v-model="backOrder" 
                        auto-complete="off" disabled ></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <!-- <el-row :gutter="20">
                <el-col :span="6">
                <el-form-item label="Received AMT exc GST" :label-width="formLabelWidth" >
                    <bwc-input-currency v-model="ReceivedAMTExcGST" disabled
                    controls-position="right" class="input-number-fs" ></bwc-input-currency>
                </el-form-item> 
                </el-col> 
                <el-col :span="6"> 
                <el-form-item label="Received GST" :label-width="formLabelWidth" >
                    <bwc-input-currency v-model="ReceivedGST" disabled
                    controls-position="right" class="input-number-fs" ></bwc-input-currency>
                </el-form-item> 
                </el-col>
                <el-col :span="6">
                <el-form-item label="Received AMT inc GST" :label-width="formLabelWidth">
                    <bwc-input-currency v-model="ReceivedAMTIncGST" disabled
                    controls-position="right" class="input-number-fs" ></bwc-input-currency>
                </el-form-item>      
                </el-col>
            </el-row>       -->
        </el-form>  
        <el-row >
            <el-col :span="12" v-if="components.length > 0">
                <bwc-title>Components</bwc-title>
                <bwc-grid-data
                :data="components"
                no-paging
                :default-sort = "{prop: 'Id', order: 'descending'}">
                    <el-table-column
                        type="index"
                        prop="Id">
                    </el-table-column>	

                    <el-table-column
                        prop="ComponentName"
                        label="Component Name">
                    </el-table-column>
                                
                    <el-table-column
                        prop="Color"
                        label="Color">					  
                    </el-table-column>
                    
                    <el-table-column
                        prop="Quantity"
                        width="100"
                        label="Quantity">					  
                    </el-table-column>
                </bwc-grid-data>
            </el-col>
            <el-col :span="components.length > 0 ? 12:24">
                <bwc-modal-footer>
                    <el-button @click="closeModal">Cancel</el-button>                                 
                    <el-button v-if="id > 0" type="primary" @click="updateData">
                        Save
                        <i v-if="processing" class="el-icon-loading"></i>
                    </el-button>
                    <el-button v-else type="primary" @click="saveData">
                        Add
                        <i v-if="processing" class="el-icon-loading"></i>
                    </el-button>
                </bwc-modal-footer>
            </el-col>
        </el-row>
        
    </el-dialog>
</div>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'

export default {
    name:"PurchaseAddProductModal",
    components:{
        BwcGridData
    },
    props:['open','data','purchaseId','id','purchase'],
    data(){
        return({
            loading:false,
            processing:false,
            formLabelWidth: '150px',
            form: {    
                    OrderId:this.purchaseId,                   
                    LocationId: 1,
                    ColorId: 1,
                    ControlSideId: 1,
                    UnitId:1,
                    Quantity:1,
                    ExtendPrice:0.00,
                    UnitPrice:this.unitPrice,
                    TotalAmount:this.totalAmount,
                    BackOrder:this.backOrder,
                    Received:0,
                    Step:1,
                    Discount:0
                },
            materialPrices:[],
            rules:{
                ProductId:[
                    {required:true,message:'Please select a product',trigger:'blur'}
                ],
                MaterialId:[
                    {required:true,message:'Please select a material',trigger:'blur'}
                ],
                Width:[
                    {required:true,message:'Please input width',trigger:'blur'}
                ],
                Drop:[
                    {required:true,message:'Please input drop',trigger:'blur'}
                ]
            },
            iRow:0,
			iColumn:0,
            })
        },
        computed:{
            colors(){
                return this.$store.getters['color/all']
            },
            prices(){
                return this.$store.getters['product/allPrice']
            },
            materials(){
                return this.$store.getters['product/allMaterial']
            },
            components(){
                return this.$store.getters['product/allComponent'].filter(_=>_.ExtCharge == 0)
            },
            locations(){
                return this.$store.getters.locations
            },
            units(){
                return this.$store.getters.units
            },
            controlSides(){
                return this.$store.getters.controlSides
            },
            unitPrice(){
                    var self = this;
                    //debugger;
                    //console.log(self.materialPrices)
                    var columns = self.materialPrices.filter(function(item){
                        return item.Value >= self.form.Width && item.Row == 1 && !(item.Column == 1 && item.Row == 1) ;
                    });	
                    //debugger;
                    if( columns.length > 0)
                    {		
                        // order by column
                        columns.sort(function(a,b){
                            return a.Column - b.Column;
                        });
                        self.iColumn = columns[0].Column;
                        
                        //get all item which matched row & column
                        var rows = self.materialPrices.filter(function(item){
                            return item.Value >= self.form.Drop && item.Column == 1 && !(item.Column == 1 && item.Row == 1) ;
                        });						
                        
                        if(rows.length > 0)
                        {	
                            // order by row
                            rows.sort(function(a,b){
                                return a.Row - b.Row;
                            });
                            self.iRow = rows[0].Row;	
                            
                            var item = self.materialPrices.filter(function(item){
                                return item.Row == self.iRow &&  item.Column == self.iColumn;
                            });
                            if(item.length > 0)
                            {
                                return item[0].Value;
                            }
                        }
                    }
                    return 0;
                },
            
            totalAmount(){
                let extendPrice = isNaN(parseFloat(this.form.ExtendPrice))?0:parseFloat(this.form.ExtendPrice)
                let quantity = parseInt(this.form.Quantity) 
                let amount = quantity * (this.unitPrice + extendPrice) 
                return amount - (amount * this.form.Discount/100)
            },
            backOrder(){
                let number = parseInt(this.form.Quantity) - parseInt(this.form.Received)
                return isNaN(number) ? 0 : number
            },
            AMTExcGST(){
                return this.totalAmount
            },
            GST(){
                return this.AMTExcGST * this.purchase.Taxes/100
            },
            AMTIncGST(){
                return this.GST + this.AMTExcGST
            },
            ReceivedAMTExcGST(){
                let extendPrice = isNaN(parseFloat(this.form.ExtendPrice))?0:parseFloat(this.form.ExtendPrice)
                let quantity = parseInt(this.form.Received) 
                let amount = quantity * (this.unitPrice + extendPrice)
                return amount
            },
            ReceivedGST(){
                return this.ReceivedAMTExcGST * this.purchase.Taxes/100
            },
            ReceivedAMTIncGST(){
                return this.ReceivedGST + this.ReceivedAMTExcGST
            }
            // steps(){
            //     return this.$store.getters['purchase/steps'].filter(_=>_.Value >= this.form.Step)
            // }
        },
        watch:{
            id:function (val){
                //console.log('id change: ' + val)
                this.loading=true
                if(val > 0){
                    //get product
                    this.$store.dispatch('purchase/pullProduct',val)
                    .then(_=>{
                        this.loading=false
                        this.form = this.$store.getters['purchase/product']

                        //product change
                        this.productChange(this.form.ProductId)
                        .then(_=>{
                            
                            //get price by material
                            this.onMaterialChange(this.form.MaterialId)
                        })
                        
                    })
                }else{
                    this.loading=false
                    this.form={
                        OrderId:this.purchaseId,                   
                        LocationId: 1,
                        ColorId: 1,
                        ControlSideId: 1,
                        UnitId:1,
                        Quantity:1,
                        Step:1,
                        Discount:0,
                        Received:0,
                    }
                    this.clearProductInfo()
                }
            },
        },
        mounted(){
            this.init()
        },
        methods:{            
            init(){                
                const type = 0 //1:customer ; 0:supplier
                this.$store.dispatch('discount/pullAll', type )
            },
            onProductChange(id){
                const self =  this
                //reset material
                this.form.MaterialId = null;
                this.materialPrices = [];
                this.productChange(id)
                
                // load discount default
                const discountList = this.$store.getters['discount/all']
                const discountDefault = discountList.filter(function(item){
                    return item.ObjectId == self.purchase.SupplierId && item.ProductId == self.form.ProductId
                })
                if(discountDefault.length > 0)
                    this.form.Discount = discountDefault[0].DiscountValue
                else
                    this.form.Discount = 0
            },
           async productChange(id){                
                //get all material of product
                this.$store.dispatch('product/pullAllMaterial',id)
                //get all components of product
                this.$store.dispatch('product/pullAllComponent',id)
                //get all prices of product
                await this.$store.dispatch('product/pullAllPurchasePrice',id)
            },
            clearProductInfo(){
                //clear all material of product
                this.$store.dispatch('product/clearMaterial')
                //clear all components of product
                this.$store.dispatch('product/clearComponent')
                //clear all prices of product
                //this.$store.dispatch('product/clearPrice')
            },
            onMaterialChange(id){
                //debugger
                this.materialPrices = this.prices.filter(function(item){
                    return item.MaterialId == id
                })
                
                //console.log(id)
                //console.log(this.prices)
            },
            closeModal(){
                this.$emit('close-modal')
            },
            saveData(){
                let self = this
                self.validateForm('form')
                .then(_=>{
                if(_.valid){
                        self.processing=true
                        self.form.UnitPrice=this.unitPrice
                        self.form.TotalAmount=this.totalAmount
                        self.form.BackOrder=this.backOrder
                        self.form.AMTExcGST=this.AMTExcGST
                        self.form.GST=this.GST
                        self.form.AMTIncGST=this.AMTIncGST
                        self.form.ReceivedAMTExcGST=this.ReceivedAMTExcGST
                        self.form.ReceivedGST=this.ReceivedGST
                        self.form.ReceivedAMTIncGST=this.ReceivedAMTIncGST

                        self.$store.dispatch('purchase/addProduct',self.form)
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
            updateData(){
                let self = this
                self.validateForm('form')
                .then(_=>{
                if(_.valid){
                        self.processing=true
                        self.form.UnitPrice=this.unitPrice
                        self.form.TotalAmount=this.totalAmount
                        self.form.BackOrder=this.backOrder
                        self.form.AMTExcGST=this.AMTExcGST
                        self.form.GST=this.GST
                        self.form.AMTIncGST=this.AMTIncGST
                        self.form.ReceivedAMTExcGST=this.ReceivedAMTExcGST
                        self.form.ReceivedGST=this.ReceivedGST
                        self.form.ReceivedAMTIncGST=this.ReceivedAMTIncGST

                        self.$store.dispatch('purchase/updateProduct',{id:self.id,data:self.form})
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
    div.color{
        label,
        input{
            color: red!important;
        }
    }
</style>
