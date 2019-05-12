export default function ({ store, route }) {
  store.dispatch('updatePage', route.path.split('/').pop())
}
