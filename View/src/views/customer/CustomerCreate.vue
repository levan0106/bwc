<template>
    <bwc-layout menu-id="customer/create" :title="id != null ?'Edit Customer':'Create Customer'"
    :bread-crumb="breadCrumb" 
    back-to="/customer/list"
    back-to-label="customer list">
        <bwc-Customer-form-create :type="id != null ?'edit':'create'" :id="id"/>
    </bwc-layout>
</template>

<script>
import BwcCustomerFormCreate from "@/components/customer/CustomerFormCreate.vue";

export default {
    name:"CustomerCreate",
    props:['id'],
    components:{
        BwcCustomerFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/customer/list',name:'Customer'},
                        {href:'',name:'create'}
                        ]
        })
    },
}
</script>

