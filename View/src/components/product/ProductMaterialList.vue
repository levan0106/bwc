<template>
<el-row>
    <bwc-product-add-material-modal 
    :data="materialList"     
    :product-id="id"
    @save-data="reloadMaterialList"></bwc-product-add-material-modal>

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
            prop="MaterialName"
            label="Material name">
        </el-table-column>
        <el-table-column
            label="Price">
            <template slot-scope="scope">
                <a @click="viewPrice(scope.row)">View price</a>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="120">
            <template slot-scope="scope">
                <el-button type="text" class="el-icon-edit-outline" 
                @click="editItem(scope.row)" ></el-button> | 
                <bwc-delete-item :delete-id="scope.row.Id" icon="el-icon-delete"
                @do-delete="doDelete(scope.row.Id)"
                ></bwc-delete-item>
            </template>
        </el-table-column>
    </bwc-grid-data>
    <el-dialog title="Product Price" :visible.sync="modal.isOpen" fullscreen>
            <bwc-product-price-view-modal
            :data="productMaterialPrice"
            :id="productMaterialPrice.material.Id"
            @close-modal="modal.isOpen=false" />
    </el-dialog>
    <el-dialog title="Update price" :visible.sync="productMaterialPrice.isOpen"  fullscreen>            
            <bwc-product-material-add-price-modal
            :data="productMaterialPrice"
            :id="productMaterialPrice.material.Id"
            :material-id="productMaterialPrice.material.MaterialId"
            @close-modal="productMaterialPrice.isOpen=false"
            @save-data="reloadMaterialList"
            />
    </el-dialog>
</el-row>
</template>

<script>
import BwcGridData from '@/components/common/GridData.vue'
import BwcProductAddMaterialModal from '@/components/product/ProductAddMaterialModal.vue'
import BwcProductMaterialAddPriceModal from '@/components/product/ProductMaterialAddPriceModal.vue'
import BwcProductPriceViewModal from '@/components/product/ProductPriceViewModal.vue'

export default {
    name:"ProductMaterialList",
    components:{
        BwcGridData,
        BwcProductAddMaterialModal,
        BwcProductMaterialAddPriceModal,
        BwcProductPriceViewModal
    },
    props:['id'],
    data(){
        return({
            modal:{                
                isOpen:false,
            },
            loading:true,
            productMaterialPrice:{
                product:{},
                material:{},
                isOpen:false
            },
            dataSource:{
                total:{
                    row:10,
                    column:10
                },
                items:[]
            }
        })
    },
    computed:{
        materialList(){
            return this.$store.getters['material/all']
        },
        data(){
            return this.$store.getters['product/allMaterial']
        }
    },
    created(){        
        this.$store.dispatch('product/pullAllMaterial',this.id)
        .then(_=>{
            this.loading=false
        })
        this.$store.dispatch('material/pullAll')
    },
    methods:{
        reloadMaterialList(){
            this.$store.dispatch('product/pullAllMaterial',this.id)
        },
        editItem(value){
            this.productMaterialPrice.product = this.$store.getters['product/info']
            this.productMaterialPrice.material = value
            this.productMaterialPrice.isOpen =true
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
        doDelete:function(id){
            let self = this
            this.$store.dispatch('product/deleteMaterial',id)
            .then(_=>{
                this.$store.dispatch('product/pullAllMaterial',self.id)
            })
        },
        viewPrice(value){
            this.productMaterialPrice.product = this.$store.getters['product/info']
            this.productMaterialPrice.material = value
            this.modal.isOpen=true
            //force reload page
            this.$store.dispatch('forceReloadPage')
        },
    }
}
</script>
