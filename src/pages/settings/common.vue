<template lang="pug">
    v-layout(row, align-center, justify-center, wrap)
        v-flex(xs12, md6)
            v-card.elevation-3.px-3.pb-4
                v-card-text
                    v-form#user-common(@submit.prevent="onSubmit")
                        Email(:preventValue='email', :handleInput="commonHandler", @handleEmail="handleEmail")
                        Username.mt-3(:preventValue='username', :handleInput="commonHandler", @handleName="handleName")
                v-card-actions.justify-center.pb-2
                        v-btn.auth-btn(
                            form="user-common",
                            color='black',
                            dark,
                            large,
                            type="submit"
                        ) Update
                        
        v-flex.bottom-links(xs12)
            v-btn(nuxt, to="/settings/password") next
            v-btn(nuxt, to="/settings") to settings

</template>


<script>
  import Email from '~/components/form/email'
  import Username from '~/components/form/username'

  export default {
    components: {
      Email,
      Username
    },
    data () {
      return {
        email: null,
        username: null,
        commonHandler: false
      }
    },
    created () {
      this.email = this.storeUserEmail
      this.username = this.storeUserName
    },
    computed: {
      storeUserEmail () {
        return this.$store.getters.userEmail
      },
      storeUserName () {
        return this.$store.getters.userName
      }
    },
    methods: {
      onSubmit () {
        let valid
        let status
        this.$store.dispatch('clearSubmitStatus')
          .then(() => {
            this.commonHandler = !this.commonHandler
          })
          .then(() => {
            const email = this.email
            const name = this.username
  
            const st1 = !email || !name
            const st2 = email && email === this.storeUserEmail
            const st3 = name && name === this.storeUserName

            switch (true) {
              case (st1):
                valid = false
                status = 'error'
                break
              case (st2 && st3):
                valid = false
                status = 'This is your current username and email.'
                break
              default:
                valid = true
                status = 'success'
                break
            }
          })
          .then(() => {
            if (!valid) return
            const user = {
              email: this.email,
              username: this.username
            }
            this.$store.dispatch('updateUserEmailAndName', user)
          })
          .then(() => {
            this.$store.dispatch('setSubmitStatus', status)
          })
          .catch(e => {
            console.log(e)
            this.$store.dispatch('setSubmitStatus', e.message)
          })
      },
      handleEmail (v) {
        this.email = v
      },
      handleName (v) {
        this.username = v
      }
    }
  }
</script>
