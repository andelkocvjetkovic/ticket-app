export default {
  isNavModalOpen(state) {
    return state.navModal;
  },
  isLoggedIn(state) {
    return !Object.is(state.authUser, null);
  },
  getCartAmount(state) {
    return state.cart.length;
  },
  getUserName(state) {
    return state.authUser ? state.authUser.displayName : "";
  },
  getUserEmail(state) {
    return state.authUser ? state.authUser.email : "";
  },
  getUserPhoto(state) {
    return state.authUser ? state.authUser.photoUrl : "";
  },
  getUser(state) {
    return state.authUser ? state.authUser : {};
  },
};
