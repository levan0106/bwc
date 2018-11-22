import {HTTP} from '@/plugin/http'
import * as types from './type'

const color = {
    namespaced:true,
    state: { 
        all:[]
     },
    mutations: { 
      [types.PULL_ALL](state,data){
        state.all=data
      },
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('color')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
     },
    getters: { 
        all: state =>state.all,
     }
  }
export default color