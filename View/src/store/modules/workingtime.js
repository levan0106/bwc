import {HTTP} from '@/plugin/http'
import * as types from './type'
const TIME_SHEET_DETAIL = "timeSheetDetail"
const workingTime = {
    namespaced:true,
    state: { 
        all:[],
        info:{},
        timeSheetDetail:[],
     },
    mutations: { 
      [types.PULL_ALL](state,data){
        state.all=data
      },
      [TIME_SHEET_DETAIL](state,data){
        state.timeSheetDetail=data
      },
     },
    actions: {
      pullAllEmployeeTimeSheet({commit},dateRange){
        return new Promise((resolve, reject) => {
          HTTP.post('action/workingtime/GetAllEmployeeTimeSheet',dateRange)
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve(response)
          })
        })
      },
      pullAllTimeSheet({commit},{dateRange,isPaid}){
        let object = {Value:dateRange,Value1:isPaid}
        return new Promise((resolve, reject) => {
          HTTP.post('action/workingtime/GetAllTimeSheet',object)
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve(response)
          })
        })
      },
      pullTimeSheetDetail({commit},month){
        return new Promise((resolve, reject) => {
          HTTP.get('action/workingtime/GetTimeSheetDetail/'+month)
          .then(response =>{         
            commit(TIME_SHEET_DETAIL,response.data)
            resolve(response)
          })
        })
      },
      approveTimeSheet({commit},dateRange){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/workingtime/approveTimeSheet',dateRange)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      addTimeSheetEmployee({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/workingtime/addTimeSheetEmployee',data)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      updateTimeSheet({commit},{date,data}){
        let object = {Value:date,Value1:data}
        return new Promise((resolve,reject)=>{
          HTTP.put('action/workingtime/updateTimeSheet',object)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      updateLessPAYG({commit},{dateRange,data}){
        let object = {Value:dateRange,Value1:data}
        return new Promise((resolve,reject)=>{
          HTTP.put('action/workingtime/updateLessPAYG',object)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      updateLessPAYGStatus({commit},{id,value}){
        let object = {Value:value}
        return new Promise((resolve,reject)=>{
          HTTP.put('action/workingtime/updateLessPAYGStatus/'+id,object)
          .then(response =>{         
            resolve(response)
          })
        })
      }
     },
    getters: { 
        all: state =>state.all,
        info: state =>state.info,
        timeSheetDetail: state =>state.timeSheetDetail,
     }
  }
export default workingTime