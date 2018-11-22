import {HTTP} from '@/plugin/http'
import * as types from './type'

const STEP_ACTIVE="stepActive"

const purchase = {
    namespaced:true,
    state: { 
        all:[],
        info:{},
        purchaseItems:[],
        stepActive:1,
        steps:[
            {Label:'New',Value:1},
            {Label:'Submitted',Value:2},
            {Label:'Received',Value:3},
            {Label:'Invoiced',Value:4},
            {Label:'Paid',Value:5},
            {Label:'Closed',Value:6},
        ],
        allComponent:[],
        component:{},
        allProduct:[],
        product:{},
        allInvoice:[],
        invoice:{},
        allPayment:[],
        payment:{}
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
      [STEP_ACTIVE](state,step){
        state.stepActive=step
      },
      [types.PULL_ALL_COMPONENT](state,data){
        state.allComponent=data
      },
      [types.PULL_COMPONENT](state,data){
        state.component=data
      },
      [types.PULL_ALL_PRODUCT](state,data){
        state.allProduct=data
      },
      [types.PULL_PRODUCT](state,data){
        state.product=data
      },
      [types.PULL_ALL_INVOICE](state,data){
        state.allInvoice=data
      },
      [types.PULL_INVOICE](state,data){
        state.invoice=data
      },
      [types.PULL_ALL_PAYMENT](state,data){
        state.allPayment=data
      },
      [types.PULL_PAYMENT](state,data){
        state.payment=data
      },
      [types.PULL_All_ITEMS](state,data){
        state.purchaseItems=data
      }
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/getall')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      pullAllByDateRange({commit},dateRange){
        //debugger
        return new Promise((resolve, reject) => {
          HTTP.post('action/purchase/GetAllByDateRange',dateRange)
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
          HTTP.get('action/purchase/getinfo/'+id)
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
          HTTP.delete('action/purchase/delete/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      update({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/update/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      insert({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/purchase/insert',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      copyToNew({commit},{id, newId}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/copyToNew/' + id,{Value:newId})
          .then(response =>{         
            resolve()
          })
        })
      },
      stepActive({commit},data){
        commit(STEP_ACTIVE,data)
      },

      // Component
      pullAllComponent({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/allcomponent/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      pullComponent({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/component/'+id)
          .then(response =>{         
            commit(types.PULL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      addComponent({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/purchase/component',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateComponent({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/component/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateListComponent({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/listcomponent/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteComponent({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/purchase/deletecomponent/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      addComponentFromOrder({commit},{purchaseId,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/addComponentFromOrder/'+purchaseId,data)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      //End Component

      // Product
      pullAllProduct({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/allproduct/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PRODUCT,response.data)
            resolve()
          })
        })
      },
      pullProduct({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/Product/'+id)
          .then(response =>{         
            commit(types.PULL_PRODUCT,response.data)
            resolve()
          })
        })
      },
      addProduct({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/purchase/Product',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateProduct({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/Product/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteProduct({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/purchase/deleteProduct/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      addProductFromOrder({commit},{purchaseId,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/addProductFromOrder/' + purchaseId,data)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      //End Product

      // Invoice
      pullAllInvoice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/allInvoice/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_INVOICE,response.data)
            resolve()
          })
        })
      },
      pullInvoice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/Invoice/'+id)
          .then(response =>{         
            commit(types.PULL_INVOICE,response.data)
            resolve()
          })
        })
      },
      addInvoice({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/purchase/Invoice',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateInvoice({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/Invoice/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteInvoice({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/purchase/deleteInvoice/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      //End Invoice

      // Payment
      pullAllPayment({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/allPayment/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PAYMENT,response.data)
            resolve()
          })
        })
      },
      pullPayment({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/purchase/Payment/'+id)
          .then(response =>{         
            commit(types.PULL_PAYMENT,response.data)
            resolve()
          })
        })
      },
      addPayment({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/purchase/Payment',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updatePayment({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/purchase/Payment/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deletePayment({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/purchase/deletePayment/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },

      pullAllItems({commit}){
        return new Promise((resolve,reject)=>{
          HTTP.get('action/purchase/GetAllItems')
          .then(response =>{         
            commit(types.PULL_All_ITEMS,response.data)
          })
        })
      },
      //End Payment
     },
    getters: { 
        all: state =>state.all,
        info: state =>state.info,
        steps:state => state.steps,
        stepActive:state => state.stepActive,
        allComponent:state => state.allComponent,
        component:state => state.component,
        allProduct:state => state.allProduct,
        product:state => state.product,
        allInvoice:state => state.allInvoice,
        invoice:state => state.invoice,
        allPayment:state => state.allPayment,
        payment:state => state.payment,
        purchaseItems:state => state.purchaseItems
     }
  }
export default purchase