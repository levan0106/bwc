<template>
    <layout-login id="session-expired">
        <div>
            <h1 class="title">Session expired !</h1>
            <p>
                You have been idle for long time. System has auto
                logged out.
            </p>
        </div>
        <div class="text-right">
            <el-button type="primary" @click="closeWindow">
                Close
            </el-button>
        </div>
    </layout-login>
</template>

<script>
import LayoutLogin from '@/views/user/LayoutLogin'

export default {
    name:"SessionExpired",
    components:{
        LayoutLogin
    },
    methods:{
        closeWindow(){
            window.close();
        }
    }
}
</script>

<style lang="less">
#session-expired{
    .title{
        text-align: center;
        color: red;
    }
}
</style>
