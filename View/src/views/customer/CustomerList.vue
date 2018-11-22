<template>
    <bwc-layout menu-id="customer/list" title="Customer List" :bread-crumb="breadCrumb">
        <bwc-title>Customers</bwc-title>
        <router-link to="/customer/create">
            <el-button icon="el-icon-plus" type="primary"> Add Customer</el-button>
        </router-link>
        <bwc-Customer-list :data="data" :loading="loading" @do-delete="doDelete"/>
    </bwc-layout>
</template>


<script>
import BwcCustomerList from '@/components/customer/CustomerList.vue'

export default {
    name:"CustomerList",
    components:{
        BwcCustomerList
    },
    data(){
        return({
            loading:true,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/Customer/list',name:'Customer'},
                {href:'',name:'List'}
                ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['customer/all']
        }
    },
    created(){
        this.$store.dispatch('customer/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('customer/delete',id)
            .then(_=>{
                this.$store.dispatch('customer/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
