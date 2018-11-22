import {HTTP} from '@/plugin/http'
import * as types from './type'

const product = {
    namespaced:true,
    state: { 
        all:[],
        info:{},
        allMaterial:[],
        allComponent:[],
        component:{},
        price:[],
        allPrice:[],
        listGroupPrice:[]
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
      [types.PUSH](state,data){
        state.info = data
      },
      [types.PULL_ALL_MATERIAL](state,data){
        state.allMaterial=data
      },
      [types.PULL_ALL_COMPONENT](state,data){
        state.allComponent=data
      },
      [types.PULL_COMPONENT](state,data){
        state.component=data
      },
      [types.PULL_PRICE](state,data){
        state.price=data
      },
      [types.PULL_ALL_PRICE](state,data){
        state.allPrice=data
      },      
      [types.PULL_LIST_GROUP_PRICE](state,data){
        state.listGroupPrice=data
      },
      [types.CLEAR_MATERIAL](state){
        state.allMaterial=[]
      },
      [types.CLEAR_COMPONENT](state){
        state.allComponent=[]
      },
      [types.CLEAR_PRICE](state){
        state.allPrice=[]
      },
     },
    actions: {
      clearInfo({commit}){
        commit(types.CLEAR_INFO)
      },
      push({commit},data){
        commit(types.PUSH,data)
      },
      remove({commit},id){
        commit(types.REMOVE_OUT_LIST,id)
      },
      pullAll({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/getall')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      pullInfo({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/getinfo/'+id)
          .then(response =>{         
            commit(types.PULL_INFO,response.data)
            resolve()
          })
        })
          
      },
      delete({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/product/delete/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      update({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/product/update/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      insert({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/product/insert',data)
          .then(response =>{         
            resolve()
          })
        })
      },

      // material
      pullAllMaterial({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/allmaterial/'+id)
          .then(response =>{ 
            commit(types.PULL_ALL_MATERIAL,response.data)
            resolve()
          })
        })
      },
      addMaterial({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/product/material',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      clearMaterial({commit}){
        commit(types.CLEAR_MATERIAL)
      },
      deleteMaterial({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/product/deleteMaterial/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      // End Material

      // Component
      pullAllComponent({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/allcomponent/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      pullComponent({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/component/'+id)
          .then(response =>{         
            commit(types.PULL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      addComponent({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/product/component',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateComponent({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/product/component/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      clearComponent({commit}){
        commit(types.CLEAR_COMPONENT)
      },
      deleteComponent({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/product/deletecomponent/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      //End Component

      // Price
      //get all prices of product for order only
      pullAllPrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPriceByProduct/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PRICE,response.data)
            resolve(response.data)
          })
        })
      },
      //get all prices of product for order only
      pullAllPurchasePrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPurchasePriceByProduct/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PRICE,response.data)
            resolve(response.data)
          })
        })
      },
      //get list prices of product for order only
      pullListGroupPrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/ListGroupPriceByProduct/'+id)
          .then(response =>{         
            commit(types.PULL_LIST_GROUP_PRICE,response.data)
            resolve()
          })
        })
      },
      //get all prices of product for purchase only
      pullAllPurchasePrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPurchasePriceByProduct/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PRICE,response.data)
            resolve()
          })
        })
      },
      //get list prices of product for purchase only
      pullListGroupPurchasePrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/ListGroupPurchasePriceByProduct/'+id)
          .then(response =>{         
            commit(types.PULL_LIST_GROUP_PRICE,response.data)
            resolve()
          })
        })
      },
      //get list prices of product
      pullAllPriceByGroup({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPriceByGroup/'+id)
          .then(response =>{         
            commit(types.PULL_PRICE,response.data)
            resolve()
          })
        })
      },
      //get detail price of product for order only
      pullPrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPriceByProductMaterial/'+id)
          .then(response =>{         
            commit(types.PULL_PRICE,response.data)
            resolve()
          })
        })
      },
      //get detail price of product for purchase only
      pullPurchasePrice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/product/AllPurchasePriceByProductMaterial/'+id)
          .then(response =>{         
            commit(types.PULL_PRICE,response.data)
            resolve()
          })
        })
      },
      //update price of product for order only
      updatePrice({commit},{id,groupId,data}){
        let object = {Value:groupId,Value1:data}
        return new Promise((resolve,reject)=>{
          //let object = JSON.stringify(data)
          HTTP.put('action/product/price/'+id,object)
          .then(response =>{         
            resolve()
          })
        })
      },
      //update price of product for order only
      updatePurchasePrice({commit},{id,groupId,data}){
        //debugger
        let object = {Value:groupId,Value1:data}
        return new Promise((resolve,reject)=>{
          //let object = JSON.stringify(data)
          HTTP.put('action/product/purchaseprice/'+id,object)
          .then(response =>{         
            resolve()
          })
        })
      },
      //copy price of product for order only
      copyPrice({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/product/CopyPrice/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      //copy price of product for purchase only
      copyPurchasePrice({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/product/CopyPurchasePrice/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      clearPrice({commit}){
        commit(types.CLEAR_PRICE)
      },
      //copy price of product for order only
      deletePrice({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/product/DeletePrice/'+id)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      //End Price
     },
    getters: { 
        all: state =>state.all,
        info: state =>state.info,
        allMaterial:state =>state.allMaterial,
        allComponent:state =>state.allComponent,
        component:state =>state.component,
        allPrice:state => state.allPrice,
        price:state =>state.price,
        listGroupPrice:state => state.listGroupPrice
     }
  }
export default product