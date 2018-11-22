<template>
    <bwc-layout menu-id="material/list" title="Material list" :bread-crumb="breadCrumb">
        <bwc-title>Material</bwc-title>
        <router-link to="/material/create">
            <el-button icon="el-icon-plus" type="primary"> Add material</el-button>
        </router-link>
        <bwc-material-list :data="data" :loading="loading" @do-delete="doDelete"></bwc-material-list>
    </bwc-layout>
</template>


<script>
import BwcMaterialList from '@/components/material/MaterialList.vue'
export default {
    name:"MaterialList",
    components:{
        BwcMaterialList
    },
    data(){
        return({
            loading:false,
            breadCrumb:[{href:'/',name:'Home'},
                            {href:'/material/list',name:'Material'},
                            {href:'',name:'List'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['material/all']
        }
    },
    created(){
        this.$store.dispatch('material/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('material/delete',id)
            .then(_=>{
                this.$store.dispatch('material/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
