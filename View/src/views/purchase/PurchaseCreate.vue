<template>
    <bwc-layout menu-id="purchase/create" 
    id="purchase-create"
    :bread-crumb="breadCrumb"
    title="Create New Purchase"
    back-to="/purchase/list"
    back-to-label="purchase list">
        <bwc-title>Create a purchase</bwc-title>
        <el-row v-if="from == 'order'">
            <el-radio v-model="newPurchase" label="true" border>New Purchase</el-radio>
            <el-radio v-model="newPurchase" label="false" border>Existence Purchases</el-radio>
        </el-row>
        <el-row v-if="newPurchase == 'true'">
            <bwc-purchase-form-create type="create" :from="from"/>
        </el-row>
        <el-row v-else>
            <bwc-purchase-form-create-list></bwc-purchase-form-create-list>
        </el-row>
    </bwc-layout>
</template>

<script>
import BwcPurchaseFormCreate from '@/components/purchase/PurchaseFormCreate.vue'
import BwcPurchaseFormCreateList from '@/components/purchase/PurchaseFormCreateList.vue'
import BwcTitle from '@/components/common/Title.vue'

export default {
    name:"PurchaseCreate",
    components:{
        BwcPurchaseFormCreate,
        BwcPurchaseFormCreateList,
        BwcTitle
    },
    props:['from'],
    data(){
        return({
            newPurchase:'true',
            breadCrumb:[
                {href:'/',name:'Home'},
                {href:'/purchase/list',name:'Purchase'},
                {href:'',name:'Create'}
                ]
        })
    },
}
</script>

