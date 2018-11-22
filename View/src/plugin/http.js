import axios from 'axios'
import Auth from '@/plugin/authenticate'

export const HTTP = axios.create({
    //baseURL:'http://localhost:58963/api/',
    //baseURL:'http://192.168.100.10/api',
    //baseURL:'http://bwcapi.olightvn.com/api',
    baseURL: window.bwc.apiUrl,
    headers:{
        Authorization:'Bearer '+Auth.system.getIdToken(),
        'Content-Type': 'application/json; charset=utf-8',        
    },
    //dataType: 'json',
    async:false,
    crossDomain : true,
})
HTTP.interceptors.response.use((response) => { // intercept the global error
    return response
  }, function (error) {
    let originalRequest = error.config
    //debugger
    //originalRequest._retry = false
    //console.log(error.config)
    if (error.response === undefined && !originalRequest._retry) { 
        originalRequest._retry = true
        window.location.href = window.bwc.rootUrl + '/error'
        return
    }
    if (error.response.status === 401 && !originalRequest._retry) { 
        // if the error is 401 and hasent already been retried
        originalRequest._retry = true
        window.location.href = window.bwc.rootUrl + '/login'
        return
    }
    if (error.response.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true
      window.location.href = window.bwc.rootUrl + '/404'
      return
    }
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        window.location.href = window.bwc.rootUrl + '/403'
        return
    }
    if (error.response.status === 500 && !originalRequest._retry) {
        originalRequest._retry = true
        window.location.href = window.bwc.rootUrl + '/error/500/'
        return
    }
    // Do something with response error
    return Promise.reject(error)
  })

  export default HTTP