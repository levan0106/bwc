<template>
    <bwc-layout menu-id="product/list" title="Product List" :bread-crumb="breadCrumb">
        <bwc-title>Products</bwc-title>
        <router-link to="/product/create">
            <el-button icon="el-icon-plus" type="primary"> Add product</el-button>
        </router-link>
        <bwc-product-list :data="data" :loading="loading" @do-delete="doDelete"></bwc-product-list>        
    </bwc-layout>
</template>

<script>
import BwcProductList from '@/components/product/ProductList.vue'

export default {
    name:"ProductList",
    components:{
        BwcProductList,
    },
    data(){
        return({
            loading:true,
            breadCrumb:[{href:'/',name:'Home'},
                            {href:'/product/list',name:'Product'},
                            {href:'',name:'List'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['product/all']
        }
    },
    created(){
        this.$store.dispatch('product/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('product/delete',id)
            .then(_=>{
                this.$store.dispatch('product/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
