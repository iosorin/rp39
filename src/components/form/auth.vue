<template lang="pug">
  v-flex.relative.auth-form(xs12, md6, xl4)
      v-card.elevation-3.pb-4
          v-toolbar(dark, color='black')
              v-toolbar-title {{title}}
          v-card-text
              v-form#auth-form(@submit.prevent="onSubmit")
                Email(:handleInput="commonHandler", @handleEmail="handleEmail")
                Password(:handleInput="commonHandler",  @handlePassword="handlePassword")
          v-card-actions.px-4.justify-space-between
                  v-btn.auth-form_btn(
                      type="submit",
                      form="auth-form",
                      color='black',
                      dark,
                      large
                  ) {{title}}
                  div
                      span.mr-3.auth-form_help {{span}}
                      v-btn(depressed, small, nuxt, :to='link', light, color='white')  Enter Here
</template>

<script>
import Email from '~/components/form/email'
import Password from '~/components/form/password'
export default {
  props: ['target'],
  components: {
    Email,
    Password
  },
  data () {
    return {
      email: null,
      password: null,
      commonHandler: false
    }
  },
  computed: {
    submitTimeout () {
      return this.$store.getters.submitTimeout
    },
    login () {
      return this.target === 'login'
    },
    title () {
      return this.login ? 'Login' : 'Registration'
    },
    span () {
      return this.login ? 'Need Registration ?' : 'Already have an account?'
    },
    link () {
      return this.login ? '/registration' : '/login'
    },
    submitMethod () {
      return this.login ? 'loginUser' : 'registerUser'
    }
  },
  methods: {
    onSubmit () {
      this.commonHandler = !this.commonHandler
      this.$nextTick(() => {
        if (!this.email || !this.password) {
          this.$store.dispatch('setSubmitStatus', 'error')
        } else {
          const user = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch(this.submitMethod, user)
            .then(() => {
              this.$store.dispatch('setSubmitStatus', 'success')
            })
            .then(() => {
              setTimeout(() => { this.$router.push('/messages') }, this.submitTimeout - 150)
            })
            .catch(err => {
              console.log(err)
              this.$store.dispatch('setSubmitStatus', err.message)
            })
        }
      })
    },
    handlePassword (v) {
      this.password = v
    },
    handleEmail (v) {
      this.email = v
    }
  }
}
</script>