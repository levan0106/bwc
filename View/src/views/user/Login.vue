<template>
    <el-row id="login-form">
        <layout-login>
            <el-row class="login-form shadow-box">
                <bwc-title>Login </bwc-title>
                <el-form :model="form" ref="form" :rules="rules" status-icon>
                    <el-form-item label="UserName" prop="UserName" >
                        <div class="el-input el-input--suffix">                            
                            <input @change="onChange" 
                            @keyup.enter="doLogin" 
                            :disabled="loading"
                            v-model="form.UserName"
                            class="el-input__inner"/>
                            <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-icon-picture-outline"></i>
                                </span>
                            </span>
                        </div>
                    </el-form-item>  
                    <el-form-item label="Password" prop="Password">
                        <div class="el-input el-input--suffix">                            
                            <input @change="onChange" 
                            @keyup.enter="doLogin" 
                            v-model="form.Password"
                            :disabled="loading"
                            type="password" class="el-input__inner"/>
                            <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                    <i class="el-input__icon el-icon-more"></i>
                                </span>
                            </span>
                        </div>
                    </el-form-item> 
                </el-form>
                
                <el-row class="text-left">
                    <i class="error" v-if="isLoginFail">Oops, login fail !!</i><br>
                    <router-link to="/forgotpassword">Forgot your password?</router-link>
                </el-row>
                <el-row >
                    <el-button type="primary" :disabled="isDisabled" @click="doLogin">
                        Login 
                        <i v-if="loading" class="el-icon-loading"></i> 
                        <i v-else class="el-icon-d-arrow-right"></i>
                    </el-button>
                </el-row>
            </el-row>
        </layout-login>
    </el-row>
</template>

<script>
import LayoutLogin from '@/views/user/LayoutLogin'
import Authenticate from '@/plugin/authenticate'
import functions from '@/plugin/function'


export default {
    name:"Login",
    components:{
        LayoutLogin
    },
    data(){
        return({            
            isLoginFail:false,
            loading:false,
            form:{
                UserName:'tung',
                Password:'',
            },
            rules:{
                Password:[
                    {required:true,message:'Please enter password',trigger:'blur'}
                ],
                UserName:[
                    {required:true,message:'Please enter username',trigger:'blur'}
                ]
            }
        })
    },
    computed:{
        isDisabled(){
            return this.UserName == '' || this.Password == ''
        }
    },
    methods:{
        doLogin(val,event){
            this.validateForm('form')
            .then(_=>{
                if(_.valid){
                    this.loading=true;
                    this.isLoginFail=false;
                    var self = this ;
                    this.$store.dispatch('login/doLogin',{user:this.form.UserName,password:this.form.Password})
                    .then(_=>{
                        if(this.$store.getters['login/status']){
                            let token = this.$store.getters['login/token']
                            Authenticate.system.setAuth({token:token,userId:self.form.UserName,userName: 'bwc '+ self.form.UserName})
                            self.$store.dispatch("setCurrentUser",{UserId:self.form.UserName,UserName:'bwc '+ self.form.UserName })

                            window.location.href = "/";
                        }else{
                            self.loginFail()
                        }
                    })
                    .catch(e=>{
                        console.log(e)
                        self.loginFail()
                    })
                }
                
            })
           
        },
        loginFail() {
            //this.isLoginFail=true;
            this.loading=false;
            functions.$this = this
            functions.message.error('Oops, login fail !!')
        },
        onChange(val){
            this.isLoginFail=false;
        },
        validateForm(formName) {
            return new Promise((resolve,reject)=>{
                let isValid=false
                this.$refs[formName].validate((valid) => {
                    isValid = valid
                });
            resolve({valid:isValid})
            })
        },
    }
}
</script>

<style lang="less">
#login-form{
    text-align: center;
    margin-top:30px;
    .login-form{
       // border: 1px solid #eaeae8;
        padding: 30px!important;
        max-width: 400px;
        display: block;
        margin: 0 auto;
        
    }
    .error{
        color: #F56C6C;
    }
    .el-form-item.is-required .el-form-item__label:before{
        content: '';
    }
}
</style>
