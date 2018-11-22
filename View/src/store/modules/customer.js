import {HTTP} from '@/plugin/http'
import * as types from './type'

const customer = {
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
      },
      [types.CLEAR_INFO](state){
        state.info={}
      },
      [types.REMOVE_OUT_LIST](state,id){
        state.all = state.all.filter(function(item){
          return item.Id != id
        })
      },
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('action/customer/get')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      clearInfo({commit}){
        commit(types.CLEAR_INFO)
      },
      pullInfo({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('customer/'+id)
          .then(response =>{         
            commit(types.PULL_INFO,response.data)
            resolve()
          })
        })
          
      },
      remove({commit},id){
        commit(types.REMOVE_OUT_LIST,id)
      },
      delete({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('customer/'+id)
          .then(() =>{         
            resolve()
          })
        })
      },
      update({commit},{id,data}){
        //debugger
        return new Promise((resolve,reject)=>{
          HTTP.put('customer/'+id,data)
          .then(() =>{         
            resolve()
          })
        })
      },
      insert({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('customer',data)
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
export default customer