import {HTTP} from '@/plugin/http'
import * as types from './type'

const STEP_ACTIVE="stepActive"
const PRODUCT_SELECTED = "productSelected"
const COMPONENT_SELECTED = "componentSelected"

const order = {
    namespaced:true,
    state: { 
        all:[],
        info:{},
        orderItems:[],
        stepActive:1,
        steps:[
            // {Label:'New',Value:1},
            {Label:'Quotation',Value:1},
            {Label:'In-progress',Value:2},
            {Label:'Deliver',Value:3},
            {Label:'Installed',Value:4},
            {Label:'Invoiced',Value:5},
            {Label:'Paid',Value:6},
            {Label:'Closed',Value:7},
        ],
        allComponent:[],
        component:{},
        allProduct:[],
        product:{},
        allInvoice:[],
        invoice:{},
        allPayment:[],
        payment:{},
        productSelected:[],
        componentSelected:[],
     },
    mutations: { 
      [PRODUCT_SELECTED](state,data){
        state.productSelected=data
      },
      [COMPONENT_SELECTED](state,data){
        state.componentSelected=data
      },
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
        state.orderItems=data
      }
     },
    actions: {
      pullAll({commit}){
        return new Promise((resolve) => {
          HTTP.get('action/order/getall')
          .then(response =>{         
            commit(types.PULL_ALL,response.data)
            resolve()
          })
        })
      },
      pullAllByDateRange({commit},dateRange){
        //debugger
        return new Promise((resolve) => {
          HTTP.post('action/order/GetAllByDateRange',dateRange)
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
          HTTP.get('action/order/getinfo/'+id)
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
          HTTP.delete('action/order/delete/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      update({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/update/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      insert({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/order/insert',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      copyToNew({commit},{id, newId}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/copyToNew/' + id,{Value:newId})
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
          HTTP.get('action/order/allcomponent/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      pullComponent({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/component/'+id)
          .then(response =>{         
            commit(types.PULL_COMPONENT,response.data)
            resolve()
          })
        })
      },
      addComponent({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/order/component',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateComponent({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/component/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateListComponent({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/listcomponent/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteComponent({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/order/deletecomponent/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      componentSelected({commit},data){
        commit(COMPONENT_SELECTED,data)
      },
      markToCompleteComponent({commit},data){
        return new Promise((resolve, reject) => {
          HTTP.post('action/order/MarkToCompleteComponent',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      //End Component

      // Product
      pullAllProduct({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/allproduct/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PRODUCT,response.data)
            resolve()
          })
        })
      },
      pullProduct({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/Product/'+id)
          .then(response =>{         
            commit(types.PULL_PRODUCT,response.data)
            resolve()
          })
        })
      },
      addProduct({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/order/Product',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateProduct({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/Product/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteProduct({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/order/deleteProduct/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      productSelected({commit},data){
        commit(PRODUCT_SELECTED,data)
      },
      markToCompleteProduct({commit},data){
        return new Promise((resolve, reject) => {
          HTTP.post('action/order/MarkToCompleteProduct',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      //End Product

      // Invoice
      pullAllInvoice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/allInvoice/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_INVOICE,response.data)
            resolve()
          })
        })
      },
      pullInvoice({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/Invoice/'+id)
          .then(response =>{         
            commit(types.PULL_INVOICE,response.data)
            resolve()
          })
        })
      },
      addInvoice({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/order/Invoice',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updateInvoice({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/Invoice/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deleteInvoice({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/order/deleteInvoice/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },
      //End Invoice

      // Payment
      pullAllPayment({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/allPayment/'+id)
          .then(response =>{         
            commit(types.PULL_ALL_PAYMENT,response.data)
            resolve()
          })
        })
      },
      pullPayment({commit},id){
        return new Promise((resolve, reject) => {
          HTTP.get('action/order/Payment/'+id)
          .then(response =>{         
            commit(types.PULL_PAYMENT,response.data)
            resolve()
          })
        })
      },
      addPayment({commit},data){
        return new Promise((resolve,reject)=>{
          HTTP.post('action/order/Payment',data)
          .then(response =>{         
            resolve()
          })
        })
      },
      updatePayment({commit},{id,data}){
        return new Promise((resolve,reject)=>{
          HTTP.put('action/order/Payment/'+id,data)
          .then(response =>{         
            resolve()
          })
        })
      },
      deletePayment({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.delete('action/order/deletePayment/'+id)
          .then(response =>{         
            resolve()
          })
        })
      },

      pullAllItems({commit}){
        return new Promise((resolve,reject)=>{
          HTTP.get('action/order/GetAllItems')
          .then(response =>{         
            commit(types.PULL_All_ITEMS,response.data)
          })
        })
      },
      //End Payment
      //MakerSheet
      pullMakerSheet({commit},id){
        return new Promise((resolve,reject)=>{
          HTTP.get('action/order/makersheet/'+id)
          .then(response =>{         
            resolve(response)
          })
        })
      },
      //End MakerSheet
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
        orderItems:state => state.orderItems,
        productSelected:state => state.productSelected,
        componentSelected:state => state.componentSelected
     }
  }
export default order