<template>
<div id="product-material">
    <el-row :gutter="10">
        <el-col :span="4">
            <bwc-title>Information</bwc-title>
            <el-form>
                <bwc-form-control label="Product Code">
                    {{data.product.ProductCode}}
                </bwc-form-control>
                <bwc-form-control label="Product name">
                    {{data.product.ProductName}}
                </bwc-form-control>
                <bwc-form-control label="Category name">
                    {{data.product.CategoryName}}
                </bwc-form-control>
                <bwc-form-control label="Material name">
                    {{data.material.MaterialName}}
                </bwc-form-control>
            </el-form> 
        </el-col>
        <el-col :span="20">
            <bwc-title>Prices</bwc-title>
            <el-radio v-model="priceType" label="Sale" border  @change="changePriceType">Sale</el-radio>
            <el-radio v-model="priceType" label="Purchase" border  @change="changePriceType">Purchase</el-radio>
            <el-row :gutter="10">
                <el-col :span="7">
                    <bwc-title>History</bwc-title>
                    <bwc-grid-data
                    :data="lisGroupPrice"
                    highlight-current-row
                    no-paging
                    :loading="loading">
                        <el-table-column
                            width="32"
                            type="index">
                        </el-table-column>	
                        <!-- <el-table-column
                            prop="GroupId"
                            label="Create Date">
                        </el-table-column>  -->
                        <el-table-column
                            prop="CreateDTS"
                            label="Create Date">
                            <template slot-scope="scope">{{scope.row.CreateDTS|datetime}}</template>
                        </el-table-column>
                        <el-table-column
                            prop="UpdateDTS"
                            label="Update Date">
                            <template slot-scope="scope">{{scope.row.UpdateDTS|datetime}}</template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="Operations"
                            width="110">
                            <template slot-scope="scope">
                                <el-radio v-model="groupActive" :label="scope.row.GroupId"
                                @change="setCurrent">select</el-radio> |
                                <bwc-delete-item icon="el-icon-delete"
                                    @do-delete="doDeletePrice(scope.row.GroupId)"
                                    :disabled="groupActive == scope.row.GroupId"
                                ></bwc-delete-item>
                            </template>
                        </el-table-column>
                    </bwc-grid-data>
                </el-col>
                <el-col :span="17">
                    <bwc-title>Detail</bwc-title>
                    <bwc-product-price 
                    :data="price.items" 
                    :total-row="price.total.row" 
                    :total-column="price.total.column"
                    :description="'Drop/Width'"
                    :loading="loadingPrice"
                    :material-id="materialId"
                    @on-change="onChange"
                    @copy-price="copyPrice" />
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    
    <bwc-modal-footer>
            <el-button @click="closeModal">Cancel</el-button>                                 
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
</div>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcProductPrice from '@/components/product/ProductPrice.vue'

export default {
    name:"ProductMaterialAddPrice",
    components:{
        BwcProductPrice,
        BwcGridData
    },
    props:['data','id','materialId'],
    data(){
        return({
            loading:true,
            loadingPrice:true,
            processing:false,
            formLabelWidth:'120px', 
            priceType:'Sale',  
            row:{
                min:5,
                max:20
            },
            column:{
                min:5,
                max:20
            },
            price: {
                total:{
                    row:5,
                    column:5
                },
                items:[]		
            },
            prices:[],
            groupActive:0
        })
    },
    computed:{
        lisGroupPrice(){
            return this.$store.getters['product/listGroupPrice']
        },
        forceReloadPage(){
            return this.$store.getters.forceReloadPage
        }
    },
    watch:{
        // id:function(val){
        //     this.groupActive=0
        //     this.getPrice(val)
            
        //     //get list group price
        //     this.pullListGroupPrice()
        // },
        forceReloadPage(val){
            if(val){
                this.groupActive=0
                this.getPrice(this.id)
                
                //get list group price
                this.pullListGroupPrice()
            }
        }
    },
    beforeMount(){
        this.getPrice(this.id)
    },
    created(){        
        //get list group price
        this.pullListGroupPrice()
    },
    methods:{
        doDeletePrice(id){
            this.$store.dispatch('product/deletePrice',id)
            .then(_=>{
                //get list group price
                this.pullListGroupPrice()
            })
        },
        copyPrice(){
            // add price type here
            let url = 'product/copyPrice'
            if(this.priceType == 'Purchase'){
                url = 'product/copyPurchasePrice'
            }

            this.$store.dispatch(url,this.id)
            .then(response =>{
                //get list group price
                this.pullListGroupPrice()
            })
        },
        pullListGroupPrice(){
            // add price type here
            let url = 'product/pullListGroupPrice'
            if(this.priceType == 'Purchase'){
                url = 'product/pullListGroupPurchasePrice'
            }

            this.$store.dispatch(url,this.id)
            .then(response =>{
                
                this.loading=false
                if(this.lisGroupPrice.length > 0){                    
                    this.groupActive = this.lisGroupPrice.filter(function(item){ return item.IsActive == 1 })[0].GroupId
                }
            })
        },
        changePriceType(){
            //get list group price
            this.pullListGroupPrice()

            //get price of product
            this.getPrice(this.id)
        },
        setCurrent(groupId) {
            //get price by group
            this.getPriceByGroup(groupId)
        },
        getPriceByGroup(groupId){
            
            // add price type here

            this.loadingPrice=true
            this.$store.dispatch('product/pullAllPriceByGroup',groupId)
            .then(_=>{
                this.setPrice()
            })
        },        
        getPrice(id){
            // add price type here
            let url = 'product/pullPrice'
            if(this.priceType == 'Purchase'){
                url = 'product/pullPurchasePrice'
            }

            this.loadingPrice=true
            this.$store.dispatch(url,id)
            .then(_=>{
                this.setPrice()
            })
        },
        setPrice(){
            let self = this
            let newData=self.$store.getters['product/price']
            self.price.items = newData
            self.prices = newData
            // get total row
            let rows = self.price.items.filter(function(item){
                return item.Column == 1
            })
            self.price.total.row = rows.length >= this.row.min? rows.length: this.row.min

            // get total column
            let columns = self.price.items.filter(function(item){
                return item.Row == 1
            })
            self.price.total.column = columns.length >= this.column.min ? columns.length: this.column.min
            setTimeout(_=>{
                self.loadingPrice=false
            },200)
        },
        closeModal(){
            //reset group active
            let gActive = this.lisGroupPrice.filter(function(item){ return item.IsActive == 1 })
            this.groupActive = gActive.length > 0 ? gActive[0].GroupId : 0 

            this.$emit('close-modal')
        },
        onChange(values){
            this.prices = values
        },
        saveData(){
            let self = this
            self.processing=true
            // add price type here
            let url = 'product/updatePrice'
            if(this.priceType == 'Purchase'){
                url = 'product/updatePurchasePrice'
            }
            self.$store.dispatch(url,
                {
                    id:self.id,
                    groupId:self.groupActive,
                    data:self.prices
                })
            .then(resolve=>{     
                this.closeModal()  
                this.$emit('save-data');
                self.processing=false
            })
            .catch(error=>{
                self.processing=false
            })
        },
    }
}
</script>

<style lang="less">

@border-color:#e4e2e2;
#product-material{
    #information {
        border: 1px solid @border-color;
        label{
            font-weight: bold;
            text-align: left;
            margin: 0 10px;
            border-right: 1px solid @border-color;
        }
    }
}
</style>
