<template>
     <bwc-layout menu-id="service/create" :title="id != null ?'Edit Service':'Create Service'"
    :bread-crumb="breadCrumb" 
    back-to="/service/list"
    back-to-label="service list">
    </bwc-layout>
</template>

<script>
export default {
    name:"ServiceCreate",
    data(){
        return({
            breadCrumb:[{href:'/',name:'Home'},
                        {href:'/service/list',name:'Service'},
                        {href:'',name:'create'}
                        ]
        })
    },
}
</script>

<style>

</style>
