<template>
    <bwc-layout menu-id="product/create" title="Create Product" 
    :bread-crumb="breadCrumb" 
    back-to="/product/list"
    back-to-label="product list">
        <bwc-title>Informations</bwc-title>	
        <bwc-product-form-create :type="'create'"/>
    </bwc-layout>
</template>

<script>
import BwcProductFormCreate from "@/components/product/ProductFormCreate.vue";

export default {
    name:"ProductCreate",
    components:{
        BwcProductFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/product/list',name:'Product'},
                        {href:'',name:'create'}
                        ]
        })
    },
}
</script>

