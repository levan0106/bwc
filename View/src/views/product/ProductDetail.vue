<template>
    <bwc-layout menu-id="product/list" title="Product Detail" 
    :bread-crumb="breadCrumb"
    back-to="/product/list"
    back-to-label="product list">
        <bwc-title>Informations</bwc-title>	
        <bwc-product-information :id="id"/>
            <!-- Materials -->
        <bwc-title>Materials</bwc-title>
        <bwc-product-material-list :id="id"/>

        <!-- Components -->
        <bwc-title>Components</bwc-title>
        <bwc-product-component-list :id="id"/> 
         
    </bwc-layout>   
</template>

<script>
import BwcProductInformation from "@/components/product/ProductInformation.vue";
import BwcProductMaterialList from "@/components/product/ProductMaterialList.vue";
import BwcProductComponentList from "@/components/product/ProductComponentList.vue";

export default {
    name:"ProductCreate",
    components:{
        BwcProductInformation,
        BwcProductMaterialList,
        BwcProductComponentList
    },
    props:['id','title'],
    data(){
        return({
                breadCrumb:[{href:'/',name:'Home'},
                                {href:'/product/list',name:'Product'},
                                {href:'',name:this.title}
                            ],
            })
        },
    }
</script>
