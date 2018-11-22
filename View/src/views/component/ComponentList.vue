<template>
    <bwc-layout menu-id="product/list" title="Component list" :bread-crumb="breadCrumb">
        <bwc-title>Components</bwc-title>
        <router-link to="/component/create">
            <el-button icon="el-icon-plus" type="primary"> Add component</el-button>
        </router-link>
        <bwc-component-list :data="data" :loading="loading" @do-delete="doDelete"></bwc-component-list>
    </bwc-layout>
</template>

<script>
import BwcComponentList from '@/components/component/ComponentList.vue'
// import * as Component from '@/repository/Component'

export default {
    name:"ComponentList",
    components:{
        BwcComponentList
    },
    data(){
        return({
           // data:[],
            loading:true,
            breadCrumb:[{href:'/',name:'Home'},
                            {href:'/component/list',name:'Component'},
                            {href:'',name:'List'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['component/all']
        }
    },
    created(){
        this.$store.dispatch('component/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('component/delete',id)
            .then(_=>{
                //this.$store.dispatch('component/pullAll'); 
                this.$store.dispatch('component/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
