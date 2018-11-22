<template>
<div>
    <bwc-layout menu-id="supplier/discount" 
    title="Supplier Discount List" 
    :bread-crumb="breadCrumb">
        <bwc-title>Discounts</bwc-title>
            <el-button 
            icon="el-icon-plus" 
            type="primary" 
            @click="doAdd"> Add Discount</el-button>
        <bwc-discount-add 
        :open-modal="isOpen"
        :id="discountId" 
        discount-type="0"
        :objects="objects"
        :products="products"
        @close-modal="isOpen=false"
        @save-data="saveData">            
        </bwc-discount-add>
        
        <bwc-discount-list :data="data" 
        :loading="loading" 
        discount-type="0"
        @do-delete="doDelete"
        @do-update="doUpdate"/>
    </bwc-layout>
</div>
</template>


<script>
import BwcDiscountList from '@/components/discount/DiscountList.vue'
import BwcDiscountAdd from '@/components/discount/DiscountAdd.vue'
import functions from '@/plugin/function'

export default {
    name:"SupplierDiscountList",
    components:{
        BwcDiscountList,
        BwcDiscountAdd
    },
    data(){
        return({
            loading:true,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/supplier/discount',name:'Supplier Discount'},
                {href:'',name:'List'}
                ],
            isOpen:false,
            discountId:0,
        })
    },
    computed:{
        data(){
            return this.$store.getters['discount/all']
        },
        objects(){
            return this.$store.getters['supplier/all']
        },
        products(){
            return this.$store.getters['product/all']
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            const type = 0 //1:customer ; 0:supplier
            this.$store.dispatch('discount/pullAll', type )
            .then(()=>{
                this.loading=false;
            }) 
            
            this.$store.dispatch('supplier/pullAll')
            this.$store.dispatch('product/pullAll')
        },
        saveData(data){
            this.loading=true;
            this.init()
            this.isOpen = false
            this.discountId = -1
            //show message
            functions.$this = this
            functions.message.success()
        },
        doDelete(id){
            //show message
            functions.$this = this
            functions.message.success()
        },
        doUpdate(id){
            this.discountId = id
            this.isOpen = true
        },
        doAdd(){
            this.discountId = 0
            this.isOpen = true
        }
    }

}
</script>

<style>

</style>
