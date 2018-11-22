<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <bwc-title>Information</bwc-title>
                <bwc-form-control label="Product Name">{{data.product.ProductName|nullValue}}</bwc-form-control>
                <bwc-form-control label="Material Name">{{data.material.MaterialName|nullValue}}</bwc-form-control>
            </el-col>
            <el-col :span="18">
                <bwc-title>Price</bwc-title>
                <bwc-product-price 
                    :data="price.items" 
                    :total-row="price.total.row" 
                    :total-column="price.total.column"
                    :description="'Drop/Width'"
                    :loading="loading"
                    mode="view" />
                <bwc-title>Purchase Price</bwc-title>
                <bwc-product-price 
                    :data="purchasePrice.items" 
                    :total-row="purchasePrice.total.row" 
                    :total-column="purchasePrice.total.column"
                    :description="'Drop/Width'"
                    :loading="purchasePriceLoading"
                    mode="view" />
            </el-col>
        </el-row>
        <bwc-modal-footer>
            <el-button @click="closeModal">Close</el-button>
        </bwc-modal-footer>
    </div>
</template>

<script>

import BwcProductPrice from '@/components/product/ProductPrice.vue'

export default {
    name:"ProductPriceViewModal",
    components:{
        BwcProductPrice
    },
    props:["id","data"],
    data(){
        return ({            
            loading:true,
            purchasePriceLoading:true,
            formLabelWidth: '120px',
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
            purchasePrice: {
                total:{
                    row:5,
                    column:5
                },
                items:[]		
            },
            //prices:[],
        })
    },
    computed:{
        forceReloadPage(){
            return this.$store.getters.forceReloadPage
        }
    },
    watch:{
        // id:function(val){
        //     this.getPrice(val)
        //     this.getPurchasePrice(val)
        // },
        forceReloadPage(val){
            if(val){
                this.getPrice(this.id)
                this.getPurchasePrice(this.id)
            }
        }
    },
    beforeMount(){
        this.getPrice(this.id)
        this.getPurchasePrice(this.id)
    },
    beforeUpdate(){
        console.log('beforeUpdate')
    },
    beforeDestroy(){
        console.log('beforeDestroy')
    },
    methods:{
        
        getPrice(id){
            let self = this
            self.loading=true
                self.$store.dispatch('product/pullPrice',id)
                .then(_=>{
                    var newData=self.$store.getters['product/price']
                    self.price.items = newData
                    //self.prices = newData
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

                    self.loading=false
                })
        },
        getPurchasePrice(id){
            let self = this
            self.loading=true
                self.$store.dispatch('product/pullPurchasePrice',id)
                .then(_=>{
                    var newData=self.$store.getters['product/price']
                    self.purchasePrice.items = newData
                    //self.prices = newData
                    // get total row
                    let rows = self.purchasePrice.items.filter(function(item){
                        return item.Column == 1
                    })
                    self.purchasePrice.total.row = rows.length >= this.row.min? rows.length: this.row.min

                    // get total column
                    let columns = self.purchasePrice.items.filter(function(item){
                        return item.Row == 1
                    })
                    self.purchasePrice.total.column = columns.length >= this.column.min ? columns.length: this.column.min

                    self.purchasePriceLoading=false
                })
        },
        closeModal(){
            this.$emit('close-modal')
        },
    }
}
</script>

<style>

</style>
