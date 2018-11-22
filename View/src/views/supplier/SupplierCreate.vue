<template>
    <bwc-layout menu-id="supplier/create" :title="id != null ?'Edit Supplier':'Create Supplier'"
    :bread-crumb="breadCrumb" 
    back-to="/supplier/list"
    back-to-label="supplier list">
        <!-- <bwc-title>Informations</bwc-title>	 -->
        <bwc-supplier-form-create :type="id != null ?'edit':'create'" :id="id"/>
    </bwc-layout>
</template>

<script>
import BwcSupplierFormCreate from "@/components/supplier/SupplierFormCreate.vue";

export default {
    name:"SupplierCreate",
    props:['id'],
    components:{
        BwcSupplierFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/supplier/list',name:'Supplier'},
                        {href:'',name:'create'}
                        ]
        })
    },
}
</script>

