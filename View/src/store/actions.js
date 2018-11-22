let actions={
        setActiveMenu({commit},menu){
          commit('setActiveMenu',menu)
        },
        setAuthenticate({commit},auth){
          commit('setAuthenticate',auth)
        },
        setTitle({commit},title){
          commit('setTitle',title)
        },
        setBreadCrumb({commit},breadCrumb){
          commit('setBreadCrumb',breadCrumb)
        },
        setBackTo({commit},backTo){
          commit('setBackTo',backTo)
        },
        clearBackTo({commit}){
          commit('clearBackTo')
        },
}
export default actions