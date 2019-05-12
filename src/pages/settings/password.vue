<template lang="pug">
    v-layout(row, align-center, justify-center, wrap)
        v-flex(xs12, md6)
            v-card.elevation-3.px-3.pb-4
                v-card-text
                    v-form#user-password(@submit.prevent="onSubmit")
                      Password(
                      :preventValue="password",
                      :handleInput="passwordHandler",
                      @handlePassword="handlePassword"
                      )
                v-card-actions.justify-center.pb-2
                        v-btn.auth-btn(
                            form="user-password",
                            color='black',
                            dark,
                            large,
                            type="submit"
                        ) Update
                        
        v-flex.bottom-links(xs12)
            v-btn(nuxt, to="/settings/common") next
            v-btn(nuxt, to="/settings") to settings
        

</template>


<script>
  import Password from '~/components/form/password'

  export default {
    components: {
      Password
    },
    data () {
      return {
        password: null,
        passwordHandler: false
      }
    },
    created () {
      this.password = this.userPassword
    },
    computed: {
      userPassword () {
        return this.$store.getters.userPassword
      }
    },
    methods: {
      onSubmit () {
        let valid
        let status
        this.$store.dispatch('clearSubmitStatus')
          .then(() => {
            this.passwordHandler = !this.passwordHandler
          })
          .then(() => {
            const p = this.password
            switch (true) {
              case !p:
                valid = false
                status = 'error'
                break
              case (p.length && p === this.userPassword):
                valid = false
                status = 'This is your current password.'
                break
              default:
                valid = true
                status = 'success'
                break
            }
          })
          .then(() => {
            if (!valid) return
            this.$store.dispatch('updateUserPassword', this.password)
          })
          .then(() => {
            this.$store.dispatch('setSubmitStatus', status)
          })
          .catch(e => {
            console.log(e)
            this.$store.dispatch('setSubmitStatus', e.message)
          })
      },
      handlePassword (v) {
        this.password = v
      }
    }
  }
</script>
