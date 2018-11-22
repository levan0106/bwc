import {HTTP} from '@/plugin/http'
import * as types from './type'

const login = {
    namespaced:true,
    state: { 
      token:'',
      status:false
     },
    mutations: { 
      [types.DO_LOGIN](state,{status,token}){
            state.status = true
            state.token = token
      },
      
     },
    actions: {
      doLogin({commit},{user,password}){
        return new Promise((resolve, reject) => {
            
            HTTP.get('authorization/'+user+'/'+password)
            .then(response=>{
                var status = response.statusText;           
                var token = response.headers["token"];
                if(status === 'OK' && token != '')
                {
                    commit(types.DO_LOGIN,{status:true,token:token})
                }else{
                    commit(types.DO_LOGIN,{status:false,token:''})
                }
            
                resolve()
            })
            .catch(e=>{
                reject()
            })
        })
      },
     },
    getters: { 
      token: state => state.token,
      status: state => state.status,
     }
  }
export default login