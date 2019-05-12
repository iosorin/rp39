<template lang="pug">
    v-app(dark)
        v-toolbar(fixed, app)
            v-toolbar-title(:class="[{'text-uppercase': true}, !guest ? 'body-2' : '']") {{title}}
            v-spacer
            v-flex.text-xs-right(v-if="guest")
                div(v-if="guest")
                    v-btn(flat, nuxt, to="/login") Login
                    v-btn(flat, nuxt, to="/registration") Registration
            v-flex.text-xs-right(v-else)
                v-btn(flat, @click="logout") Logout
            v-toolbar-side-icon(@click='menu = !menu', :disabled="guest")
             

        v-content
            v-container.pt-0.relative-container(fill-height)
                v-layout.relative(row, justify-center, align-center)
                    nuxt
        v-navigation-drawer(temporary, v-model='menu', right, fixed, floating)
            v-list.text-uppercase
                v-list-tile(nuxt, exact, to='/')
                    v-list-tile-action
                        v-icon home                    
                    v-list-tile-title Home
                v-list-tile(nuxt, exact, to='/messages')
                    v-list-tile-action
                        v-icon messages
                    v-list-tile-title Messages
                v-list-tile(nuxt, exact, to='/settings/common')
                    v-list-tile-action
                        v-icon settings
                    v-list-tile-title Settings    
                      
        Loading
        SubmitStatus

</template>

<script>
  import Loading from '~/components/layout/loading'
  import SubmitStatus from '~/components/layout/submitStatus'

  export default {
    head () {
      return {
        titleTemplate: this.pageTitle
      }
    },
    middleware: 'page',
    components: {
      Loading,
      SubmitStatus
    },
    data () {
      return {
        menu: false
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logoutUser').then(() => {
          this.$router.push('/login')
        })
      }
    },
    computed: {
      pageTitle () {
        const t = this.$store.getters.page
        return t.charAt(0).toUpperCase() + t.slice(1)
      },
      guest () {
        return this.$store.getters.guest
      },
      title () {
        if (this.guest) return 'title'
        return this.$store.getters.userName || 'title'
      }
    }
  }
</script>


<style lang="stylus">
    .v-list__tile--active
        .v-list__tile__title,
        .v-list__tile__action
            color #fff !important
  @media only screen and (max-width : 1600px)
    .container.relative-container
        padding 0 !important        
</style>