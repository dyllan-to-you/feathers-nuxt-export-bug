export default async function({ store, redirect, route }) {
  const { auth } = store.state
  if (!auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect(`/login?redirect=${route.fullPath}`)
  }
}
