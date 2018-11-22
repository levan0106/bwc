<template>
<div>
    <el-button-group v-if="mode != 'view'">
        <!-- <el-button type="primary" icon="el-icon-upload2" @click="isOpen=true"> Import price</el-button> -->
        <el-button type="success" icon="el-icon-download" @click="copyPrice"> Backup price</el-button>
    </el-button-group>
    <bwc-table :data="data" 
    :description="description" 
    :total-row="totalRow"
    :total-column="totalColumn" 
    :loading="loading"
    :read-only="mode == 'view'"
    position-icon="top"
    @on-change="onChange"/>

    <el-dialog title="Product Material" :visible.sync="isOpen"  class="modal modal-md" :append-to-body="true">
        <el-form :model="form" :rules="rules" ref="form" status-icon>
            <el-form-item label="Choose material" prop="MaterialId" >
                <el-select v-model="form.MaterialId" 
                filterable placeholder="Select"
                class="textbox-fs">
                    <el-option
                    v-for="item in materialList"
                    :key="item.Id"
                    :label="item.MaterialName"
                    :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <bwc-modal-footer>
            <el-button @click="isOpen=false">Cancel</el-button>                                 
            <el-button type="primary" @click="saveData">
                Save
                <i v-if="processing" class="el-icon-loading"></i>
            </el-button>
        </bwc-modal-footer>
    </el-dialog>
</div>
</template>

<script>
import BwcTable from '@/components/common/table/Table.vue'

export default {
    name:"ProductPrice",
    components:{
        BwcTable
    },
    props:["data","totalRow","totalColumn","description","mode","loading","materialId"],
    data(){
        return({
            isOpen:false,
            processing:false,
            form:{
            },
            rules:{
                MaterialId:[
                    {required:true,message:'Please select a material',trigger:'blur'}
                ],
            }
        })
    },
    computed:{
        materialList(){
            return this.$store.getters['material/all'].filter(_=>_.Id != this.materialId)
        },
    },
    methods:{
        saveData(){
            let self = this
            self.validateForm('form')
            .then(_=>{
                if(_.valid){
                    self.processing=true
                    // self.$store.dispatch('product/addMaterial',self.form)
                    // .then(resolve=>{
                        self.isOpen=false
                    //     self.$emit('save-data');
                    //     self.processing=false
                    // })
                    // .catch(error=>{
                    //     self.processing=false
                    // })
                }else{
                    self.processing=false
                }
            })
        },
        validateForm(formName) {
            return new Promise((resolve,reject)=>{
                let isValid=false
                this.$refs[formName].validate((valid) => {
                    isValid = valid
                });
            resolve({valid:isValid})
            })
        },
        onChange(values){
            this.$emit('on-change',values)
        },
        copyPrice(){
            this.$emit('copy-price')
        }
    }
}
</script>
