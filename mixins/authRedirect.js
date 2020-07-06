export default {
  middleware({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
      if (store.getters['auth/user'].isVerified != null) redirect('/')
      else redirect('/registration/confirmation')
    }
  }
}
