export default {
  namespaced: true,
  state: {
    active: 0,
    isChange: false
  },
  mutations: {
    SET_ACTIVE(state: any, payload: any) {
      sessionStorage.setItem("active", payload);
      state.active = payload;
    },
    SET_ISCHANGE(state: any, payload: any) {
      sessionStorage.setItem("isChange", payload);
      state.isChange = payload;
    }
  },
  getters: {
    getActive(state: any) {
      if (!state.active) {
        state.active = sessionStorage.getItem("active");
      }
      return parseInt(state.active);
    },
    getIsChange(state: any) {
      if (!state.isChange) {
        state.isChange = sessionStorage.getItem("isChange");
      }
      if (state.isChange === "true") {
        state.isChange = true;
      }
      if (state.isChange === "false") {
        state.isChange = false;
      }
      return state.isChange;
    }
  },
  actions: {}
};
