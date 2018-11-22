<template>
    <el-row id="back-to" v-if="to != ''">
            <router-link :to="to" ><i class="el-icon-back"> </i><slot></slot></router-link>
    </el-row>
    <el-row v-else></el-row>
</template>

<script>
export default {
    name:'BackTo',
    props:['to']
}
</script>
<style lang="less">
    #back-to{
        text-align: left;
        margin-left: 10px;
        line-height: 50px;
        a{
            color: #ffffff !important;
            text-transform: capitalize;
            &:hover{
               color:#f3eeee !important; 
            }
        }
    }
</style>
