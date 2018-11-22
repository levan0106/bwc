let mutations ={
        setActiveMenu(state,menu){
          state.activeMenu=menu
        },
        setAuthenticate(state,auth){
          state.isAuthenticated = auth
        },
        setTitle(state,title){
          state.title = title
        },
        setBreadCrumb(state,breadCrumb){
          state.breadCrumb = breadCrumb
        },
        setBackTo(state,backTo){
          state.backTo=backTo;
        },
        clearBackTo(state){
          state.backTo={to:'',label:''};
        }
}
export default mutations