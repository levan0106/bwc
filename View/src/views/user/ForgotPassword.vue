<template>
    <el-row id="forgot-password-form">
        <layout-login>
            <el-row class="form">
                <bwc-title>Forgot password form</bwc-title>
                <el-form>
                    <el-form-item label="UserName" >
                        <el-input v-model="UserName" auto-complete="off" v-focus
                        prefix-icon="el-icon-picture" @change="onChange"></el-input>
                    </el-form-item>  
                    <el-form-item label="Email">
                        <el-input v-model="Email" auto-complete="off" type="email"
                        prefix-icon="el-icon-message" @change="onChange"></el-input>
                    </el-form-item> 
                </el-form>
                
                <el-row class="text-left">
                    <i class="error" v-if="isFail">Oops,  Wrong user or email !!</i><br>
                    <router-link to="/login">Go to login</router-link>
                </el-row>
                <el-row >
                    <el-button type="primary" :disabled="isDisabled" @click="doUpdatePassword">
                        Continues <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                </el-row>
            </el-row>
        </layout-login>
    </el-row>
</template>

<script>
import LayoutLogin from '@/views/user/LayoutLogin'
import functions from '@/plugin/function'

export default {
    name:"ForgotPassword",
    components:{
        LayoutLogin
    },
    data(){
        return({
            UserName:'',
            Email:'',
            isFail:false
        })
    },
    computed:{
        isDisabled(){
            return this.UserName == '' || this.Email == ''
        }
    },
    methods:{
        doUpdatePassword(val,event){
            sentPassword() 
            
        },
        sentPassword() {
            this.isFail=true;
            //show message
            functions.$this = this
            functions.message.error('Oops, Wrong user or email !!')
        },
        onChange(val){
            this.isFail=false;
        }
    }
}
</script>

<style lang="less">
#forgot-password-form{
    text-align: center;
    .form{
       // border: 1px solid #eaeae8;
        padding: 20px!important;
        max-width: 400px;
        display: block;
        margin: 0 auto;
    }
    .error{
        color: #F56C6C;
    }
}
</style>
