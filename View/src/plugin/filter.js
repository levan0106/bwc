import Vue from 'vue'
import formater from "@/plugin/formater"


Vue.filter('nullValue',function (value) {
  return value == '' || value == null ?'—':value;
})
Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter('currency',function (value,digit) {
  return formater.currency(value,digit)
})
Vue.filter('number',function (value,digit) {
  return formater.number(value,digit)
})
Vue.filter('hour',function (value,digit) {
  return formater.hour(value,digit)
})
Vue.filter('percent', function(val) {
  return formater.percent(val)
});
Vue.filter('month', function(d) {
  return formater.month(d)
});
Vue.filter('date', function(d) {
  return formater.date(d)
});
Vue.filter('datetime', function(d) {
  return formater.datetime(d)
});
Vue.filter('status', function(val) {
  
  return val==1?'Active':'Inactive'
});