export default {
  onAuthStateChangedAction({ commit }, { authUser }) {
    if (!authUser) {
      commit("resetUser");
    } else {
      commit("setAuthUser", authUser);
    }
  },
};
