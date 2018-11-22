<template>
<div>
    <bwc-loading :loading="loading" >
        <div  id="product-information">
        <el-row>
            <el-col :span="8">
                <bwc-form-control label="Product Code">{{data.ProductCode|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="8">
                <bwc-form-control label="Product Name">{{data.ProductName|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="8">
                <bwc-form-control label="Category">{{categoryName|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="8">
                <bwc-form-control label="Status">{{data.ActiveStatus=='1'?'Active':'Inactive'|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="16">
                <bwc-form-control label="Notes">{{data.Notes|nullValue}}</bwc-form-control>
            </el-col>
        </el-row>
        
        <el-row class="text-right">
            <el-button-group>
                <el-button type="success" @click="doExportPrices">
                    <i class="el-icon-download"></i> Export Prices
                </el-button>
                <el-button type="primary" @click="openModal">
                    <i class="el-icon-edit"></i> Edit
                </el-button>
            </el-button-group>
        </el-row>
        </div>
    </bwc-loading>

    <el-dialog title="Product" :visible.sync="isOpen">
        <bwc-product-form-create :data="data" type="edit" 
        :id="id" 
        @close-modal="isOpen=false"/>
    </el-dialog>

    <bwc-product-export-prices 
    :is-export="isExport"
    :file-name="'product_prices_' +this.data.ProductCode "
    :product-info="data"
    @export-complete="isExport=false"></bwc-product-export-prices>
</div>
</template>

<script>
import BwcProductFormCreate from "@/components/product/ProductFormCreate.vue";
import BwcProductPrice from '@/components/product/ProductPrice.vue'
import BwcProductExportPrices from '@/components/product/ProductExportPrices.vue'

export default {
    name:'ProductInformation',
    components:{
        BwcProductFormCreate,
        BwcProductExportPrices
    },
    props:['id'],
    data(){
        return({
            mode:'view',
            formLabelWidth: '120px',
            loading:true,
            isOpen:false,
            isExport: false,
        })
    },
    computed:{
        categoryName(){
            let self = this
            let cat = this.$store.getters['category/all'].filter(item =>{
                        return item.Id == self.data.CategoryId
                    }) 
            return cat.length > 0 ? cat[0].CategoryName : ''
        },
        data(){
            return this.$store.getters['product/info']
        }
    },
    created(){
            this.$store.dispatch('product/pullInfo',this.id)
            .then(_=>{
                this.loading=false
            })
            
        this.$store.dispatch('category/pullAll')  
	    },
    methods:{
        openModal(){
            this.isOpen=true;
        },
        doExportPrices(){
            this.isExport = true
        },
        
    }    
}
</script>

<style lang="less">
@border-color:#e4e2e2;
#product-information{
    form.el-form {
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
