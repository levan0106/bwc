<template>
    <bwc-layout menu-id="component/list" :title="id != null ?'Edit component':'Create component'" 
    :bread-crumb="breadCrumb" 
    back-to="/component/list"
    back-to-label="component list">
        <bwc-title>Informations</bwc-title>	
        <bwc-component-form-create :type="id != null ?'edit':'create'" :id="id" />
    </bwc-layout>
</template>

<script>
import BwcComponentFormCreate from "@/components/component/ComponentFormCreate.vue";

export default {
    name:"ComponentCreate",
    props:['id'],
    components:{
        BwcComponentFormCreate
    },
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/component/list',name:'Component'},
                        {href:'',name:'create'}
                        ],
        })
    },
}
</script>

