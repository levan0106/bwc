<template>
   <bwc-layout menu-id="order/create" 
    id="order-create"
    :bread-crumb="breadCrumb"
    title="Create New Order"
    back-to="/order/list"
    back-to-label="order list">
        <bwc-title>Create a order</bwc-title>
        <bwc-order-form-create :type="'create'"/>
    </bwc-layout>
</template>

<script>
import BwcOrderFormCreate from '@/components/order/OrderFormCreate.vue'
import BwcTitle from '@/components/common/Title.vue'

export default {
    name:"CreateOrder",
    components:{
        BwcOrderFormCreate,
        BwcTitle
    },
    data(){
        return({
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/order/list',name:'Order'},
                {href:'',name:'Create'}
                ]
        })
    },
}
</script>

<style lang="less">
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100% !important;
    }
</style>

