<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in data" 
        :key="item.index"
        :to="{ path:item.href}" >
            {{item.name}}
        </el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">Orders</a></el-breadcrumb-item>
        <el-breadcrumb-item>Order list</el-breadcrumb-item> -->
    </el-breadcrumb>
</template>

<script>
export default {
    name:'BreadCrumb',
    props:['data']
}
</script>
<style lang="less">
.el-breadcrumb {
    font-size: 14px;
    line-height: 1;
    margin: 5px 0;
}
</style>

