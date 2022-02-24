import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : null
  },
  getters: {
    user:(state) => {
      return state.user
    }
  },
  actions: {
    user(context, user){
      context.commit('user', user)
    }
  },
  mutations: {
    user(state, user){
      state.user = user
    }
  },
  modules: {
  }
})
