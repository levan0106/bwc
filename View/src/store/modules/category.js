import {HTTP} from '@/plugin/http'
import * as types from './type'

const category = {
    namespaced:true,
    state: { 
        all:[],
        info:{}
     },
    mutations: { 
      [types.PULL_ALL](state,data){
        state.all=data
      },
      [types.PULL_INFO](state,data){
        state.info=data
      }
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('category')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      pullInfo({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('category/'+id)
          .then(response =>{         
            commit(types.PULL_INFO,response.data)
            resolve()
          })
        })
          
      },
      update({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('category/'+id,data)
          .then(() =>{         
            resolve()
          })
        })
      },
     },
    getters: { 
        all: state =>state.all,
        info: state =>state.info,
     }
  }
export default category