
import Title from '@/components/common/Title.vue'
import SelectForm from '@/components/common/SelectForm.vue'
import Layout from '@/views/Layout.vue'
import DeleteItem from '@/components/common/DeleteItem.vue'
import FormControl from '@/components/common/FormControl.vue'
import InputNumber from '@/components/controls/InputNumber.vue'
import InputCurrency from '@/components/controls/InputCurrency.vue'
import ModalFooter from '@/components/controls/ModalFooter.vue'
import BwcDate from '@/components/controls/Date.vue'
import BwcLoading from '@/components/controls/Loading.vue'
import BwcHiddenField from '@/components/controls/HiddenField.vue'

const Bwc = {
    install(Vue,options){
        Vue.component('bwc-title',Title);
        Vue.component('bwc-select-form',SelectForm);
        Vue.component('bwc-layout',Layout);
        Vue.component('bwc-delete-item',DeleteItem);
        Vue.component('bwc-form-control',FormControl);
        Vue.component('bwc-input-number',InputNumber);
        Vue.component('bwc-input-currency',InputCurrency);
        Vue.component('bwc-date',BwcDate);
        Vue.component('bwc-loading',BwcLoading)
        Vue.component('bwc-modal-footer',ModalFooter)
        Vue.component('bwc-hidden-field',BwcHiddenField)
        
        

        // 2. add a global asset
        Vue.directive('my-directive', {
          bind (el, binding, vnode, oldVnode) {
            // something logic ...
          }
        })
      
        // 3. inject some component options
        Vue.mixin({
          created: function () {
            // something logic ...
          }
        })
      
        // 4. add an instance method
        // Vue.prototype.$HTTP= HTTP

        // Vue.prototype.$callApi ={
        //     post (url,data,funcCallBack) {
        //       // something logic ...
        //       this.callApi('POST',url,data,funcCallBack);
        //     },
        //     get (url,data,funcCallBack) {
        //         // something logic ...
        //         this.callApi('GET',url,data,funcCallBack);
        //     },
        //     put (url,data,funcCallBack) {
        //         // something logic ...
        //         this.callApi('PUT',url,data,funcCallBack);
        //     },
        //     delete (url,data,funcCallBack) {
        //         // something logic ...
        //         this.callApi('DELETE',url,data,funcCallBack);
        //     },
        //     callApi (method, url,data,funcCallBack) {
        //       // something logic ...
        //         $.ajax({
        //           url: baseApiUrl+url,
        //           headers: {
        //               'Content-Type': 'application/json'
        //           },
        //           method: method,
        //           data: JSON.stringify(data),
        //           dataType: 'json',
        //           success: function (data, textStatus, request) {
        //               //var token = request.getResponseHeader('token');
        //               if (typeof funcCallBack == "function")
        //               {
        //                   funcCallBack(data, textStatus, request);
        //               }
        //           }
        //       });
        //     }
        // }
       
    }
};
export default Bwc;
