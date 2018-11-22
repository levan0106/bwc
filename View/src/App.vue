
<template>
  <div id="app" >
    
      <el-container>        
        <el-aside v-if="authorization">
            <bwc-navigator :defaulCollapse="false" />
        </el-aside>
        <el-container>
          <el-header v-if="authorization">
            <bwc-header/>
          </el-header>
          <el-main>           
            <bwc-bread-crumb :data="breadCrumb" v-if="authorization"/>      
            <router-view/>
          </el-main>
        </el-container>
      </el-container>    
  </div>
</template>
<script>

import BwcNavigator from '@/components/common/Navigator.vue'
import BwcBreadCrumb from '@/components/common/BreadCrumb.vue'
import BwcHeader from '@/components/common/Header.vue'
import BwcTitle from '@/components/common/Title.vue'

export default {
  name:"app",
  components:{
    BwcNavigator,
    BwcBreadCrumb,
    BwcHeader,
    BwcTitle,
  },
  data(){
    return({
      status:[{label:'Active',value:1},{label:'Inactive',value:2}],
      categories:[
        {CategoryName:'Security',Id:1},
        {CategoryName:'In-door',Id:2},
        {CategoryName:'Out-door',Id:3}
      ],
      units:[
        {UnitName:'Metres',Id:1},
        {UnitName:'Each',Id:2},
        {UnitName:'Box',Id:3},
        {UnitName:'Pair',Id:4},
        {UnitName:'Bag',Id:5},
        {UnitName:'Roll',Id:6},
        {UnitName:'Piece',Id:7},
        {UnitName:'Length',Id:8},
        {UnitName:'Mesh',Id:9},
        {UnitName:'NA',Id:10}
      ],
      locations:[
        {LocationName:'NA',Id:1},
      ],
      controlSides:[
        {ControlSideName:'Top',Id:1},
        {ControlSideName:'Botton',Id:2},
        {ControlSideName:'Left',Id:3},
        {ControlSideName:'Right',Id:4},
        {ControlSideName:'Central',Id:5},
        {ControlSideName:'NA',Id:6}
      ],
      paymentType:[
        {PaymentTypeName:'C.O.D',Id:1},
        {PaymentTypeName:'Cash',Id:2},
        {PaymentTypeName:'Check',Id:3},
        {PaymentTypeName:'Credit Card',Id:4}
      ]
    })
  },
  computed:{
    breadCrumb(){
      return this.$store.getters.breadCrumb;
    } ,
    authorization(){
      return this.$store.getters.isAuthenticated != 'false';
    }
  },
  created(){    
    this.$store.dispatch('color/pullAll')
    this.$store.dispatch('pushStatus',this.status)
    this.$store.dispatch('pushCategories',this.categories)
    this.$store.dispatch('pushUnits',this.units)
    this.$store.dispatch('pushLocations',this.locations)
    this.$store.dispatch('pushControlSides',this.controlSides)
    this.$store.dispatch('pushPaymentType',this.paymentType)
    this.$store.dispatch('pullSystemInfo')
  }
}
</script>

<style lang="less">
@text-color:#909399;
@border-color:#e4e2e2;
body,html{
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    color: @text-color;
    label{
      color: @text-color !important;
    }
    .input-number-sm{
      width:110px !important;
    }
    .input-number-md{
      width:150px !important;
    }
    .input-number-fs{
      width:100% !important;
    }
    .modal{
      &.modal-sm{
        .el-dialog{
        width: 300px!important;
        }
      }
      &.modal-md{
        .el-dialog{
          width: 500px!important;
        }
      }
      &.modal-lg{
        .el-dialog{
        width: 800px!important;
        }
      }
      &.modal-lg-x{
        .el-dialog{
        width: 1000px!important;
        }
      }
      &.modal-fs{
        .el-dialog{
        width: 100%!important;
        }
      }
    }
    
    .textbox-sm{
      width: 100px!important;
    }
    .textbox-md{
      width: 250px!important;
    }
    .textbox-lg{
      width: 500px!important;
    }
    .textbox-fs{
      width: 100%!important;
    }
}
#app { 
  .is-error {
    padding-bottom: 15px;
  }
  a {
    color: #409EFF;
    cursor: pointer;
    text-decoration: none;
  }
  .el-button{
    a{
      color: #ffffff;
    }
  }
  .text-right{
    text-align: right;
  }
  .text-left{
    text-align: left;
  }
  .text-center{
    text-align: center;
  }
  .el-row {	
    padding: 5px 0;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .altRow{
    background: #f9f9f9;
    margin: 0px;
  }
  .row{
    background: #ffffff;
    margin: 0px;
  }           
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .el-dialog__body{
    padding-top: 0px!important;
    padding-bottom: 0px!important;
  }
  .el-dialog__header{
    border-bottom: 1px solid @border-color;
  }
  
  .logo{
    text-align: center;
      //background-position: 50% 3px;
      //background-size: 35%;
      //background-repeat: no-repeat;
      //background-image: url('./assets/logo.png');
    img {
      width: 70px;
    }
  }
  
    .shadow-box{
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        background: #fff;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    }
  
  .el-header{
    padding: 0 20px 0 0;
  }
  
@media screen and (max-width:8.5in) { /* resize your window until the event is triggered */
    html { width:8.5in; }
    body { font: 9pt/1.5 Arial, sans-serif; } /* Roughly 12px font */
}

  @media print {    

    @page {size: letter ;} //landscape
    html { 
      width:8.5in;
      margin: 0!important;
      padding: 0!important;
    }
    body { 
      font: 9pt/1.5 Arial, sans-serif !important; 
      margin: 0!important;
      padding: 0!important;
      font-size: 9pt/1.5 !important;
    } /* Roughly 12px font */
    .el-tab-pane{
      display: block!important;
    }
    header,aside,button,.el-breadcrumb,.el-steps,.el-tabs__header,
    .no-print,
    .el-table__fixed, .el-table__fixed-right {
      display: none;
    }
    .purchase-total{
      width: 100%;
    }
    table,
    .el-table__empty-block{
      width: auto !important;
    }
    
      .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border: none !important;
      }
    col{
      //width: auto !important;
      //min-width: 80px!important;
    }
   
  }
}
</style>
