<template>
    <el-row id="header"> 
        <el-col :span="8"><back-to :to="to" >{{backLabel}}</back-to></el-col>
        <el-col :span="8"><h3>{{title}}</h3></el-col>    
        <el-col :span="8">
            <div class="welcome">
                <span>Welcome, </span>
                <router-link to="/profile">{{username}}. </router-link> | <logout/>
            </div>
        </el-col>    
    </el-row>
</template>

<script>
import BackTo from '@/components/common/BackTo.vue'
import Logout from '@/views/user/Logout.vue'
import Authenticate from '@/plugin/authenticate'

export default {
    name:'Header',    
    components:{
        BackTo,
        Logout
    },
    computed:{
        title(){
            return this.$store.getters.title;
        },
        to(){            
            return this.$store.getters.backTo.to ;
        },
        backLabel(){
            return this.$store.getters.backTo.label ;
        },
        username(){
            return Authenticate.system.currentUser();
        }
    }
}
</script>

<style lang="less">
    #header {
        background-color: #B3C0D1;
        color: #ffffff;
        text-align: center;
        .welcome{
            line-height: 50px;
            text-align: right;
            padding-right: 20px;
        }
    }
</style>

