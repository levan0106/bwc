<template>
    <bwc-layout menu-id="service/list" title="Service List" :bread-crumb="breadCrumb">
        <bwc-title>Services</bwc-title>
        <router-link to="/service/create">
            <el-button icon="el-icon-plus" type="primary"> Add Service</el-button>
        </router-link>
    </bwc-layout>
</template>

<script>
export default {
    name:"ServiceList"
}
</script>

<style>

</style>
