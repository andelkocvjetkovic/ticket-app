export default {
  toggleNavModal(state, payload) {
    state.navModal = payload;
  },
  resetUser(state) {
    state.authUser = null;
  },
  setAuthUser(
    state,
    { uid, email, photoURL: photoUrl, emailVerified, displayName }
  ) {
    state.authUser = {
      uid,
      email,
      photoUrl,
      emailVerified,
      displayName,
    };
  },
  addToCart(state, { uuid, title, price }) {
    state.cart.push({ uuid, title, price });
  },
  cleanCart(state) {
    state.cart.splice(0, state.cart.length);
  },
  updateName(state, { name }) {
    state.authUser.displayName = name;
  },
  updateEmail(state, { email }) {
    state.authUser.email = email;
  },
};
