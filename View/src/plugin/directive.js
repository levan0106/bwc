import Vue from 'vue'

const directive = Vue.directive('focus',{
    inserted:function(el){
        if(el.nodeName.toLowerCase() == 'input'){            
            el.focus()
        }else{
            el.querySelectorAll('input')[0].focus()
        }
    }
})
export default directive