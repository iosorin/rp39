export default function ({ store, redirect, route }) {
  const urlRequiresNonAuth = /^\/login|registration(\/|$)/.test(route.fullPath)
  if (store.getters.guest) {
    return !urlRequiresNonAuth ? redirect('/login') : ''
  } else {
    return urlRequiresNonAuth ? redirect('/messages') : ''
  }
}
