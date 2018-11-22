<template>
    <bwc-layout menu-id="employee/list" title="Employee List" :bread-crumb="breadCrumb">
        <bwc-title>Employees</bwc-title>
        <router-link to="/employee/create">
            <el-button icon="el-icon-plus" type="primary"> Add Employee</el-button>
        </router-link>
        <bwc-employee-list :data="data" :loading="loading" @do-delete="doDelete"></bwc-employee-list>
    </bwc-layout>
</template>

<script>
import BwcEmployeeList from '@/components/employee/EmployeeList.vue'

export default {
    name:"EmployeeList",
    components:{
        BwcEmployeeList
    },
    data(){
        return({
           // data:[],
            loading:true,
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/employee/list',name:'employee'},
                {href:'',name:'List'}
            ]
        })
    },
    computed:{
        data(){
            return this.$store.getters['employee/all']
        }
    },
    created(){
        this.$store.dispatch('employee/pullAll')
        .then(_=>{
            this.loading=false;
        })   
    },
    methods:{
        doDelete:function(id){
            this.$store.dispatch('employee/delete',id)
            .then(_=>{
                this.$store.dispatch('employee/remove',id); 
            })
        }
    }

}
</script>

<style>

</style>
