<template>
    <bwc-layout menu-id="supplier/list" title="Supplier List" :bread-crumb="breadCrumb">
        <bwc-title>Suppliers</bwc-title>
        <router-link to="/supplier/create">
            <el-button icon="el-icon-plus" type="primary"> Add supplier</el-button>
        </router-link>
        <bwc-supplier-list :data="data" :loading="loading" @do-delete="doDelete"/>
    </bwc-layout>
</template>


<script>
import BwcSupplierList from '@/components/supplier/SupplierList.vue'

export default {
    name:"SupplierList",
    components:{
        BwcSupplierList
    },
    data(){
        return({
            //data:[],
            loading:true,
            breadCrumb:[{href:'/',name:'Home'},
                            {href:'/supplier/list',name:'Supplier'},
                            {href:'',name:'List'}
                        ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['supplier/all']
        }
    },
    created(){
        this.$store.dispatch('supplier/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('supplier/delete',id)
            .then(_=>{
                this.$store.dispatch('supplier/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
