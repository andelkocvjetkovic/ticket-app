export const state = () => ({
  cart: [],
  amountMoney: 0,
  navBarModal: false,
  authUser: null,
});

export const getters = {
  getAmountMoney: (state) => {
    return state.cart.reduce((acc, next) => acc + +next.price, 0);
  },
  getCartAmount: (state) => {
    return state.cart.length;
  },
  isNavModalOpen: (state) => {
    return state.navBarModal;
  },
  isLoggedIn: (state) => {
    return Object.is(state.authUser, null) === false;
  },
};

export const mutations = {
  addToCart: (state, payload) => {
    state.cart.push(payload);
  },
  toggleNavModal: (state, payload) => {
    state.navBarModal = payload;
  },
  setUser: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      emailVerified: authUser.emailVerified,
      photoURL: authUser.photoURL,
    };
  },
  resetStore: (state) => {
    state.authUser = {};
  },
};

export const actions = {
  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit("resetStore");
      return;
    }
    commit("setUser", { authUser });
  },
};
