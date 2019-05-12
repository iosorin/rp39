<template lang="pug">
    v-container(fill-height)
        h2.font-weight-medium.subheading.text-capitalize SETTINGS{{title}}
        nuxt-child(:key="$router.fullPath")
</template>

<script>
  export default {
    computed: {
      title () {
        const t = this.$store.getters.page
        return t !== this.$route.name ? `: ${t}` : ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
    h2
        position absolute
        text-align left
        top 30px
        left 20px
        letter-spacing .35px
</style>