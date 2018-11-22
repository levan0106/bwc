<template>
    <bwc-layout menu-id="material/create" :title="id != null ?'Edit material':'Create material'"
    :bread-crumb="breadCrumb" 
    back-to="/material/list"
    back-to-label="material list">
        <bwc-title>Informations</bwc-title>	
        <bwc-material-form-create :type="id != null ?'edit':'create'" :id="id"/>
    </bwc-layout>
</template>

<script>
import BwcMaterialFormCreate from "@/components/material/MaterialFormCreate.vue";

export default {
    name:"MaterialCreate",
    props:['id'],
    components:{
        BwcMaterialFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/material/list',name:'Material'},
                        {href:'',name:'create'}
                        ]
        })
    },
}
</script>

