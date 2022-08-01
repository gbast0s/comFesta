import { createStore } from "vuex"
import axios from "axios"

export default createStore({
    state: {
      user: null,
    },
    mutations: {
      resetUser(state) {
        if (state.user) {
          state.user = null
        }
      },
      setUser(state, loggedInUser) {
        state.user = loggedInUser
      },
    },
    actions: {
      async loadUser(context) {
        try {
          let response = await axios.get("users/me")
          context.commit("setUser", response.data)
        } catch (error) {
          context.commit("resetUser", null)
          delete axios.defaults.headers.common.Authorization
          sessionStorage.removeItem("Auth_key")
          throw error
        }
      },
    },
})