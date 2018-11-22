import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import {HTTP} from '@/plugin/http'
import component from '@/store/modules/component'
import supplier from '@/store/modules/supplier'
import material from '@/store/modules/material'
import product from '@/store/modules/product'
import login from '@/store/modules/login'
import color from '@/store/modules/color'
import employee from '@/store/modules/employee'
import purchase from '@/store/modules/purchase'
import customer from '@/store/modules/customer'
import order from '@/store/modules/order'
import quotation from '@/store/modules/quotation'
import workingtime from '@/store/modules/workingtime'
import discount from '@/store/modules/discount'
import category from '@/store/modules/category'
import setting from '@/store/modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules:{
    login,
    component,
    supplier,
    material,
    product,
    color,
    employee,
    purchase,
    customer,
    order,
    quotation,
    workingtime,
    discount,
    category,
    setting
    
  },
  state :{
    rootUrl:'#',
    title:'BWC System',
    breadCrumb:'',
    backTo:{to:'',label:''},
    isAuthenticated:true,
    activeMenu:'/',
    status:[],
    categories:[],
    units:[],
    locations:[],
    controlSides:[],
    paymentType:[],
    sessionWarning:false,
    forceReloadPage:null,
    currentUser:{},
    systemInfo:{},
    setIdleTimer:{}
},
  getters:{
    title: state =>state.title,
    breadCrumb:state => state.breadCrumb,
    backTo: state => state.backTo,
    isAuthenticated:state =>state.isAuthenticated,
    activeMenu:state => state.activeMenu,
    status:state=>state.status,
    categories:state=>state.categories,    
    units:state=>state.units,  
    locations:state=>state.locations,  
    controlSides:state=>state.controlSides,  
    rootUrl:state=>state.rootUrl,  
    paymentType:state=>state.paymentType,
    sessionWarning:state=>state.sessionWarning,
    currentUser:state=>state.currentUser,
    forceReloadPage:state=>state.forceReloadPage,
    systemInfo:state => state.systemInfo,
    setIdleTimer:state => state.setIdleTimer
  },
  mutations :{
    setIdleTimer(state,setIdleTimer){
      state.setIdleTimer = setIdleTimer
    },
    pullSystemInfo(state,info){
      state.systemInfo = info
    },
    setCurrentUser(state,user){
      state.currentUser = user
    },
    setActiveMenu(state,menu){
      state.activeMenu=menu
    },
    setAuthenticate(state,auth){
      state.isAuthenticated = auth
    },
    setTitle(state,title){
      state.title = title
    },
    setBreadCrumb(state,breadCrumb){
      state.breadCrumb = breadCrumb
    },
    setBackTo(state,backTo){
      state.backTo=backTo;
    },
    clearBackTo(state){
      state.backTo={to:'',label:''};
    },
    pushStatus(state,status){
      state.status=status
    },
    pushCategories(state,categories){
      state.categories=categories
    },
    pushUnits(state,units){
      state.units=units
    },
    pushLocations(state,locations){
      state.locations=locations
    },
    pushControlSides(state,controlSides){
      state.controlSides=controlSides
    },
    pushPaymentType(state,paymentType){
      state.paymentType=paymentType
    },
    setSessionWarning(state,warning){
      state.sessionWarning = warning
    },
    forceReloadPage(state){
      //set value is Date.now() to force change state of object
      state.forceReloadPage = Date.now()
    }
  },
  actions:{
    setIdleTimer({commit},setIdleTimer){
      commit('setIdleTimer',setIdleTimer)
    },
    pullSystemInfo({commit}){
      return new Promise((resolve) => {
        HTTP.get('action/system/SystemInfo')
        .then(response =>{         
          commit('pullSystemInfo',response.data)
          resolve()
        })
      })
    },
    setCurrentUser({commit},user){
      commit('setCurrentUser',user)
    },
    clearCurrentUser({commit}){
      commit('setCurrentUser',{})
    },
    pushCategories({commit},categories){
      commit('pushCategories',categories)
    },
    pushStatus({commit},status){
      commit('pushStatus',status)
    },
    pushUnits({commit},units){
      commit('pushUnits',units)
    },
    pushLocations({commit},locations){
      commit('pushLocations',locations)
    },
    pushControlSides({commit},controlSides){
      commit('pushControlSides',controlSides)
    },
    pushPaymentType({commit},paymentType){
      commit('pushPaymentType',paymentType)
    },
    setActiveMenu({commit},menu){
      commit('setActiveMenu',menu)
    },
    setAuthenticate({commit},auth){
      commit('setAuthenticate',auth)
    },
    setTitle({commit},title){
      commit('setTitle',title)
    },
    setBreadCrumb({commit},breadCrumb){
      commit('setBreadCrumb',breadCrumb)
    },
    setBackTo({commit},backTo){
      commit('setBackTo',backTo)
    },
    clearBackTo({commit}){
      commit('clearBackTo')
    },
    enableSessionWarning({commit},warning){
      commit('setSessionWarning',warning)
    },
    forceReloadPage({commit}){
      commit('forceReloadPage')
    }
  },
})
