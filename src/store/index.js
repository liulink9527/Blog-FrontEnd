import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapse: false,
    userId: 1,
    userMenuList: [],
    avatar: null,
    tabList: [{ name: '首页', path: '/' }],
  },
  mutations: {
    saveUserMenuList(state, userMenuList) {
      state.userMenuList = userMenuList
    },
    removeTab(state, tab) {
      var index = state.tabList.findIndex((item) => item.name === tab.name)
      state.tabList.splice(index, 1)
    },
    trigger(state) {
      state.collapse = !state.collapse
    },
    resetTab(state) {
      state.tabList = [{ name: '首页', path: '/' }]
    },
    logout(state) {
      state.userId = null
      // state.roleList = null
      // state.avatar = null
      // state.nickname = null
      // state.intro = null
      // state.webSite = null
      // state.userMenuList = []
    },
    saveTab(state, tab) {
      if (state.tabList.findIndex((item) => item.path === tab.path) == -1) {
        state.tabList.push({ name: tab.name, path: tab.path })
      }
    },
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
