<template>
    <bwc-layout menu-id="category/list" title="Category List" :bread-crumb="breadCrumb">
        <bwc-title>Categories</bwc-title>
        <bwc-Category-list :data="data" :loading="loading"/>
    </bwc-layout>
</template>


<script>
import BwcCategoryList from '@/components/category/CategoryList.vue'

export default {
    name:"CategoryList",
    components:{
        BwcCategoryList
    },
    data(){
        return({
            loading:true,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/Category/list',name:'Category'},
                {href:'',name:'List'}
                ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['category/all']
        }
    },
    created(){
        this.$store.dispatch('category/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    }

}
</script>

<style>

</style>
