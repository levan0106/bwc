import {HTTP} from '@/plugin/http'
import * as types from './type'

const employee = {
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
        HTTP.get('employee')
        .then(response =>{         
          commit(types.PULL_ALL,response.data)
          resolve(response)
        })
      })
    },
    clearInfo({commit}){
      commit(types.CLEAR_INFO)
    },
    pullInfo({commit},id){
      return new Promise((resolve, reject) => {
        HTTP.get('employee/'+id)
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
        HTTP.delete('employee/'+id)
        .then(response =>{         
          resolve()
        })
      })
    },
    update({commit},{id,data}){
      debugger
      return new Promise((resolve,reject)=>{
        HTTP.put('employee/'+id,data)
        .then(response =>{         
          resolve()
        })
      })
    },
    insert({commit},data){
      return new Promise((resolve,reject)=>{
        HTTP.post('employee',data)
        .then(response =>{         
          resolve()
        })
      })
    }
   },
  getters: { 
      all: state =>state.all,
      info: state =>state.info,
   }
  }
export default employee