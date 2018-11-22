import {HTTP} from '@/plugin/http'
import * as types from './type'

const quotation = {
    namespaced:true,
    state: { 
        all:[]
     },
    mutations: { 
      [types.PULL_ALL](state,data){
        state.all=data
      }
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve) => {
          HTTP.get('action/quotation/getall')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      pullAllByDateRange({commit},dateRange){
        return new Promise((resolve) => {
          HTTP.post('action/quotation/GetAllByDateRange',dateRange)
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      }
     },
    getters: { 
        all: state =>state.all,        
     }
  }
export default quotation