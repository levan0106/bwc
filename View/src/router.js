import Vue from 'vue'
import Router from 'vue-router'
import Auth from './plugin/authenticate'

import Home from './views/Home.vue'
import About from './views/About.vue'
import QuotationList from './views/quotation/QuotationList.vue'
import QuotationDetail from './views/quotation/QuotationDetail.vue'
import QuotationCreate from './views/quotation/QuotationCreate.vue'
import OrderList from './views/order/OrderList.vue'
import OrderDetail from './views/order/OrderDetail.vue'
import OrderCreate from './views/order/OrderCreate.vue'
import PurchaseList from './views/purchase/PurchaseList.vue'
import PurchasePayment from './views/purchase/PurchasePayment.vue'
import PurchaseDetail from './views/purchase/PurchaseDetail.vue'
import PurchaseCreate from './views/purchase/PurchaseCreate.vue'
import PurchaseReport from './views/purchase/PurchaseReport.vue'
import ProductList from './views/product/ProductList.vue'
import ProductDetail from './views/product/ProductDetail.vue'
import ProductCreate from './views/product/ProductCreate.vue'
import Login from './views/user/Login.vue'
import ForgotPassword from './views/user/ForgotPassword.vue'
import MaterialList from './views/material/MaterialList.vue'
import MaterialCreate from './views/material/MaterialCreate.vue'
import ComponentCreate from './views/component/ComponentCreate.vue'
import ComponentList from './views/component/ComponentList.vue'
import SupplierCreate from './views/supplier/SupplierCreate.vue'
import SupplierList from './views/supplier/SupplierList.vue'
import SupplierDiscountList from './views/supplier/SupplierDiscountList.vue'
import CustomerCreate from './views/customer/CustomerCreate.vue'
import CustomerList from './views/customer/CustomerList.vue'
import CustomerDiscountList from './views/customer/CustomerDiscountList.vue'
import ServiceList from './views/service/ServiceList.vue'
import ServiceCreate from './views/service/ServiceCreate.vue'
import EmployeeCreate from './views/employee/EmployeeCreate.vue'
import EmployeeList from './views/employee/EmployeeList.vue'
import TimeSheet from './views/workingtime/TimeSheet.vue'
import SalaryPayment from './views/workingtime/SalaryPayment.vue'
import CategoryList from './views/category/CategoryList.vue'
import CategoryDetail from './views/category/CategoryCreate.vue'
import Setting from './views/setting/SettingCreate.vue'

import PageError from './views/freeaccess/error.vue'
import Page404 from './views/freeaccess/404.vue'
import Page403 from './views/freeaccess/403.vue'
import SessionExpired from './views/freeaccess/SessionExpired.vue'
import SessionWarning from './views/freeaccess/SessionWarning.vue'

Vue.use(Router)

const router = new Router({
  //mode:'history',
  routes: [
    
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: ForgotPassword,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true }
    },{
      path:'/quotation/list',
      name:'quotationList',
      component: QuotationList,
      meta: { requiresAuth: true }
    },{
      path:'/quotation/:id/detail',
      name:'quotationDetail',
      props:true,
      component: QuotationDetail,
      meta: { requiresAuth: true }
    },{
      path:'/quotation/create',
      name:'quotationCreate',
      component: QuotationCreate,
      meta: { requiresAuth: true }
    },{
      path:'/order/list',
      name:'orderList',
      component: OrderList,
      meta: { requiresAuth: true }
    },{
      path:'/order/:id/detail',
      name:'orderDetail',
      props:true,
      component: OrderDetail,
      meta: { requiresAuth: true }
    },{
      path:'/order/create',
      name:'orderCreate',
      component: OrderCreate,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/list',
      name:'purchaseList',
      component: PurchaseList,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/report',
      name:'purchaseReport',
      component: PurchaseReport,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/payment',
      name:'purchasePayment',
      component: PurchasePayment,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/:id/detail',
      name:'purchaseDetail',
      props:true,
      component: PurchaseDetail,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/create',
      name:'purchaseCreate',
      component: PurchaseCreate,
      meta: { requiresAuth: true }
    },{
      path:'/purchase/create/:from',
      name:'purchaseCreateFrom',
      props:true,
      component: PurchaseCreate,
      meta: { requiresAuth: true }
    },{
      path:'/product/list',
      name:'productList',
      component: ProductList,
      meta: { requiresAuth: true }
    },{
      path:'/product/:id/detail',
      name:'productDetail',
      props:true,
      component: ProductDetail,
      meta: { requiresAuth: true }
    },{
      path:'/product/create',
      name:'productCreate',
      component: ProductCreate,
      meta: { requiresAuth: true }
    },{
      path:'/material/list',
      name:'materialList',
      component: MaterialList,
      meta: { requiresAuth: true }
    },{
      path:'/material/create',
      name:'materialCreate',
      component: MaterialCreate,
      meta: { requiresAuth: true }
    },{
      path:'/material/:id/detail',
      name:'materialDetail',
      props:true,
      component: MaterialCreate,
      meta: { requiresAuth: true }
    },{
      path:'/component/list',
      name:'componentList',
      component: ComponentList,
      meta: { requiresAuth: true }
    },{
      path:'/component/create',
      name:'componentCreate',
      component: ComponentCreate,
      meta: { requiresAuth: true }
    },{
      path:'/component/:id/detail',
      name:'componentDetail',
      props:true,
      component: ComponentCreate,
      meta: { requiresAuth: true }
    },{
      path:'/supplier/list',
      name:'supplierList',
      component: SupplierList,
      meta: { requiresAuth: true }
    },{
      path:'/supplier/create',
      name:'supplierCreate',
      component: SupplierCreate,
      meta: { requiresAuth: true }
    },{
      path:'/supplier/:id/detail',
      name:'supplierDetail',
      props:true,
      component: SupplierCreate,
      meta: { requiresAuth: true }
    },{
      path:'/supplier/discount',
      name:'supplierDiscount',
      props:true,
      component: SupplierDiscountList,
      meta: { requiresAuth: true }
    },{
      path:'/customer/list',
      name:'customerList',
      component: CustomerList,
      meta: { requiresAuth: true }
    },{
      path:'/customer/create',
      name:'customer',
      component: CustomerCreate,
      meta: { requiresAuth: true }
    },{
      path:'/customer/:id/detail',
      name:'customerDetail',
      props:true,
      component: CustomerCreate,
      meta: { requiresAuth: true }
    },{
      path:'/customer/discount',
      name:'customerDiscount',
      props:true,
      component: CustomerDiscountList,
      meta: { requiresAuth: true }
    },{
      path:'/service/list',
      name:'serviceList',
      component: ServiceList,
      meta: { requiresAuth: true }
    },{
      path:'/service/create',
      name:'service',
      component: ServiceCreate,
      meta: { requiresAuth: true }
    },{
      path:'/service/:id/detail',
      name:'serviceDetail',
      props:true,
      component: ServiceCreate,
      meta: { requiresAuth: true }
    },{
      path:'/employee/list',
      name:'employeeList',
      component: EmployeeList,
      meta: { requiresAuth: true }
    },{
      path:'/employee/create',
      name:'employee',
      component: EmployeeCreate,
      meta: { requiresAuth: true }
    },{
      path:'/employee/:id/detail',
      name:'employeeDetail',
      props:true,
      component: EmployeeCreate,
      meta: { requiresAuth: true }
    },{
      path:'/timesheet',
      name:'timeSheet',
      component: TimeSheet,
      meta: { requiresAuth: true }
    },{
      path:'/salarypayment',
      name:'salaryPayment',
      component: SalaryPayment,
      meta: { requiresAuth: true }
    },{
      path:'/category/list',
      name:'categoryList',
      component: CategoryList,
      meta: { requiresAuth: true }
    },
    {
      path:'/category/:id/detail',
      name:'categoryDetail',
      props:true,
      component: CategoryDetail,
      meta: { requiresAuth: true }
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting,
      meta:{requiresAuth:true}
    },
    
    
    {
      path:'/error',
      name:'pageError',
      props:true,
      component: PageError,
      meta: { requiresAuth: false }
    },{
      path:'/error/:id/',
      name:'pageError',
      props:true,
      component: PageError,
      meta: { requiresAuth: false }
    },{
      path:'/404',
      name:'page404',
      props:true,
      component: Page404,
      meta: { requiresAuth: false }
    },{
      path:'/403',
      name:'page403',
      props:true,
      component: Page403,
      meta: { requiresAuth: false }
    },{
      path:'/sessionexpired',
      name:'sessionExpired',
      props:true,
      component: SessionExpired,
      meta: { requiresAuth: false }
    },{
      path:'/sessionwarning/:time/:idleTime',
      name:'sessionWarning',
      props:true,
      component: SessionWarning,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      name: 'error',
      component: Page404,
      meta: { requiresAuth: false }
    },
  ],
})
router. beforeEach((to, from, next) => {
  next();
  if (to.matched.some(record => record.meta.requiresAuth) && !Auth.system.isAuthenticated()) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
})
export default router