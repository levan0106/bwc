import {HTTP} from '@/plugin/http'
import * as types from './type'

const setting = {
    namespaced:true,
    state: { 
        info:{}
     },
    mutations: { 
      [types.PULL_INFO](state,data){
        state.info=data
      }
     },
    actions: {
      pullInfo({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('setting')
          .then(response =>{         
            commit(types.PULL_INFO,response.data)
            resolve()
          })
        })
      },
      update({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('setting',data)
          .then(() =>{         
            resolve()
          })
        })
      },
     },
    getters: { 
        info: state =>state.info,
     }
  }
export default setting