import {HTTP} from '@/plugin/http'
import * as types from './type'

const discount = {
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
      pullAll({commit},type){
        return new Promise((resolve, reject) => {
          HTTP.get('action/discount/all/'+type)
          .then(response =>{  
            commit(types.PULL_ALL,response.data)
            resolve()
          })
          .catch(()=>{
            reject()
          });
          
        })
      },
      pullInfo({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/discount/get/'+id)
          .then(response =>{         
            commit(types.PULL_INFO,response.data)
            resolve(response.data)
          })
          .catch(()=>{
            reject()
          });
        })
          
      },
      remove({commit},id){
        commit(types.REMOVE_OUT_LIST,id)
      },
      delete({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('discount/'+id)
          .then(() =>{     
            commit(types.REMOVE_OUT_LIST,id)    
            resolve()
          }) 
          .catch(()=>{
            reject()
          });         
        })
      },
      update({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('discount/'+id,data)
          .then(() =>{         
            resolve()
          })   
          .catch(()=>{
            reject()
          });       
        })
      },
      insert({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('discount',data)
          .then(() =>{         
            resolve()
          })
          .catch(()=>{
            reject()
          });
        })
      },
     },
    getters: { 
        all: state =>state.all,
        info: state =>state.info,
     }
  }
export default discount