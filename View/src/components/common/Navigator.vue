<template>
    <el-row id="navigator">
      <div class="logo">
        <a href="/" >
          <img src="@/assets/logo.png">
        </a>
      </div>
      <el-radio-group v-model="isCollapse" class="menu-tab">
          <el-radio-button :label="false" v-if="isCollapse" >
            <i class="el-icon-d-arrow-right"></i>
          </el-radio-button>
          <el-radio-button :label="true" v-else>
            <i class="el-icon-d-arrow-left"></i>
          </el-radio-button>
      </el-radio-group>
        <el-menu :default-active="activeMenu" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        unique-opened>
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">Quotations</span>
            </template>            
            <el-menu-item index="quotation/list"> <router-link to="/quotation/list">Quotation List</router-link></el-menu-item>
            <!-- <el-menu-item index="quotation/create"><router-link to="/quotation/create">Create Quotation</router-link></el-menu-item> -->
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">Orders</span>
            </template>            
            <el-menu-item index="order/list"> <router-link to="/order/list">Order List</router-link></el-menu-item>
            <!-- <el-menu-item index="order/create"><router-link to="/order/create">Create Order</router-link></el-menu-item> -->
          </el-submenu>
          <el-submenu index="2" >
            <template slot="title">					  
              <i class="el-icon-document"></i>
              <span slot="title">Purchase</span>
            </template>
            <el-menu-item index="purchase/list"> <router-link to="/purchase/list">Purchase List</router-link></el-menu-item>
            <el-menu-item index="purchase/payment"> <router-link to="/purchase/payment">Auto Pay</router-link></el-menu-item>
            <el-menu-item index="purchase/report"> <router-link to="/purchase/report">Reporting</router-link></el-menu-item>
            <!-- <el-menu-item index="purchase/create"><router-link to="/purchase/create">Create Purchase</router-link></el-menu-item> -->
          </el-submenu>
          <el-submenu index="3">          
            <template slot="title">	
            <i class="el-icon-menu"></i>
            <span slot="title">Products</span>
            </template>
            <el-menu-item index="product/list"><router-link to="/product/list">Product List</router-link></el-menu-item>
            <!-- <el-menu-item index="product/create"><router-link to="/product/create">Create Product</router-link></el-menu-item> -->
            <el-menu-item index="material/list"><router-link to="/material/list">Material List</router-link></el-menu-item>
            <el-menu-item index="component/list"><router-link to="/component/list">Component List</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="4">          
            <template slot="title">	
            <i class="el-icon-menu"></i>
            <span slot="title">Categories</span>
            </template>
            <el-menu-item index="category/list"><router-link to="/category/list">Category List</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">					  
              <i class="el-icon-star-off"></i>
              <span slot="title">Suppliers</span>
            </template>
            <el-menu-item index="supplier/list"> <router-link to="/supplier/list">Supplier List</router-link></el-menu-item>
            <el-menu-item index="supplier/discount"><router-link to="/supplier/discount">Manage Discount</router-link></el-menu-item>
          </el-submenu>
           <el-submenu index="6">
            <template slot="title">					  
              <i class="el-icon-star-off"></i>
              <span slot="title">Customers</span>
            </template>
            <el-menu-item index="customer/list"> <router-link to="/customer/list">Customer List</router-link></el-menu-item>
            <el-menu-item index="customer/discount"><router-link to="/customer/discount">Manage Discount</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="7">
          <template slot="title">					  
              <i class="el-icon-setting"></i>
              <span slot="title">Services</span>
            </template>
            <el-menu-item index="service/list"> <router-link to="/service/list">Service List</router-link></el-menu-item>
            <!-- <el-menu-item index="service/create"><router-link to="/service/create">Create Service</router-link></el-menu-item> -->
          </el-submenu>
          <el-submenu index="8" >
            <template slot="title">					  
              <i class="el-icon-setting"></i>
              <span slot="title">Employees</span>
            </template>
            <el-menu-item index="employee/list"> <router-link to="/employee/list">Employee List</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="9" >
            <template slot="title">					  
              <i class="el-icon-setting"></i>
              <span slot="title">Working time</span>
            </template>
            <el-menu-item index="timesheet"> <router-link to="/timesheet">Time Sheet</router-link></el-menu-item>
            <el-menu-item index="salarypayment"><router-link to="/salarypayment">Salary Payment</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="10">
          <template slot="title">					  
              <i class="el-icon-tickets"></i>
              <span slot="title">Admin</span>
            </template>
            <el-menu-item index="setting"> <router-link to="/setting">Settings</router-link></el-menu-item>
          </el-submenu>
        </el-menu>
    </el-row>
</template>

<script>
export default {
    name:'Navigator',
    props:['defaulCollapse'],
    data(){
        return({
            isCollapse:this.defaulCollapse
        })
    },
    computed:{
        activeMenu(){
          return this.$store.getters.activeMenu
        }
    },
}
</script>
<style lang="less">
  .el-aside{
    width:auto !important;
  }
  #navigator{
    width: auto !important;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .el-radio-button__inner{
      border:none!important;
    }
    .menu-tab{
      text-align: right;
      width: 100%;
    }
   .router-link-exact-active, .router-link-active{
    border-bottom: 3px solid;
   }
  }
</style>

