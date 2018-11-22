<template>
    <bwc-layout menu-id="employee/list" :title="id != null ?'Edit employee':'Create employee'" 
    :bread-crumb="breadCrumb" 
    back-to="/employee/list"
    back-to-label="employee list">
        <!-- <bwc-title>Informations</bwc-title>	 -->
        <bwc-employee-form-create :type="id != null ?'edit':'create'" :id="id" />
    </bwc-layout>
</template>

<script>
import BwcEmployeeFormCreate from "@/components/employee/EmployeeFormCreate.vue";

export default {
    name:"EmployeeCreate",
    props:['id'],
    components:{
        BwcEmployeeFormCreate
    },
    data(){
        return({
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/employee/list',name:'employee'},
                {href:'',name:'create'}
            ],
        })
    },
}
</script>

