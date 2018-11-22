<template>
    <el-row>
        <el-button-group>            
            <el-button icon="el-icon-plus" type="primary" @click="openModal">Add Component</el-button>
            <el-button icon="el-icon-plus" type="success">  
                <router-link :to="{name:'componentCreate'}">							
                    Create New Component
                </router-link>	 
            </el-button> 
        </el-button-group>
        <bwc-product-add-component-modal 
        :data="componentList"  
        :product-id="id"
        :component-id="componentId"
        :open="isOpen"
        @close-modal="isOpen=false"
        @save-data="reloadComponent"/>

        <bwc-grid-data
            :data="data"
            :loading="loading"
            no-paging
            :default-sort = "{prop: 'Id', order: 'descending'}">
            <el-table-column
                type="index"
                prop="Id">
            </el-table-column>	

            <el-table-column
                prop="ComponentCode"
                label="Component Code">
            </el-table-column>

            <el-table-column
                prop="ComponentName"
                label="Component Name">
            </el-table-column>
                        
            <el-table-column
                prop="Color"
                label="Color">					  
            </el-table-column>
            
            <!-- <el-table-column
                prop="Price"
                label="Price">	
                <template slot-scope="scope">
                    {{scope.row.Price|currency}}
                </template>				  
            </el-table-column> -->
            <el-table-column
                prop="Quantity"
                label="Quantity">					  
            </el-table-column>
        
            <el-table-column
                prop="ExtCharge"
                label="Ext Charge">
                <template slot-scope="scope">
                    {{scope.row.ExtCharge}}
                </template>
            </el-table-column>	
            <el-table-column
                fixed="right"
                label="Operations"
                width="120">
                <template slot-scope="scope">
                    <el-button type="text" class="el-icon-edit-outline" 
                    @click="editItem(scope.row.Id)" ></el-button> | 
                    <bwc-delete-item :delete-id="scope.row.d" icon="el-icon-delete"
                    @do-delete="doDelete(scope.row.Id)"
                    ></bwc-delete-item>
                </template>
            </el-table-column>
        </bwc-grid-data>
    </el-row>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcProductAddComponentModal from '@/components/product/ProductAddComponentModal.vue'

export default {
    name:"ProductComponentList",
    components:{
        BwcProductAddComponentModal,
        BwcGridData
    },
    props:['id'],
    data(){
        return({
            isOpen:false,
            loading:true,
            componentId:0
        })
    },
    computed:{
        data(){
            return this.$store.getters['product/allComponent']
        },
        componentList(){
            return this.$store.getters['component/all']
        },
    },
    created(){        
        this.$store.dispatch('product/pullAllComponent',this.id)
        .then(_=>{
            this.loading=false
        })
        this.$store.dispatch('component/pullAll')
    },
    methods:{
        openModal(){
            this.isOpen=true
            this.componentId=0
        },
        reloadComponent(form){
            this.isOpen=false;
            this.$store.dispatch('product/pullAllComponent',this.id)
        },
        editItem(id){
            this.isOpen=true
            this.componentId=id
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('product/deleteComponent',id)
            .then(_=>{
                this.$store.dispatch('product/pullAllComponent',self.id)
            })
        },
        handleCloseModal(){
            this.isOpen=false;
        },
    }
}
</script>

<style>

</style>
