<template lang="pug">
    div.mb-3
        v-text-field.mt-3(
          v-model="password"
          label='Password',
          color="white",
          :type='passwordType',
          :error-messages="PasswordErrors",
          @change="$v.password.$touch()",
          hide-details
        )
        v-slide-x-reverse-transition
          v-text-field.mt-3(
            v-if="repeatPasswordNeeded"
            v-model="repeatPassword",
            :error-messages="RepeatPasswordErrors",
            label='Repeat your password',
            color="white",
            :type='passwordType',
            @change="$v.repeatPassword.$touch()",
            hide-details
          )
        v-btn(
          @click="showPassword",
          v-if='showPasswordNeeded',
          style="bottom: 10px"
          absolute, right, bottom,
          light, icon
        )
          v-icon(color="black", v-if="passwordType === 'text'") visibility_off
          v-icon(color="black", v-else) visibility
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  props: ['handleInput', 'preventValue'],
  data () {
    return {
      password: this.preventValue,
      repeatPassword: this.preventValue,
      passwordType: 'password'
    }
  },
  validations () {
    if (!this.repeatPasswordNeeded) {
      return {
        password: { required, minLength: minLength(5) }
      }
    } else {
      return {
        password: { required, minLength: minLength(5) },
        repeatPassword: { sameAsPassword: sameAs('password') }
      }
    }
  },
  computed: {
    page () {
      return this.$store.getters.page
    },
    settingsPage () {
      return ['common', 'password'].includes(this.page)
    },
    showPasswordNeeded () {
      return this.settingsPage && (this.password || this.repeatPassword)
    },
    repeatPasswordNeeded () {
      return this.settingsPage || this.page === 'registration'
    },
    userPassword () {
      return this.$store.getters.userPassword
    },
    PasswordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Password must have at least ' + this.$v.password.$params.minLength.min + ' letters.')
      return errors
    },
    RepeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical')
      return errors
    }
  },
  methods: {
    validate () {
      let p
      this.$v.$touch()
      this.$v.$invalid ? p = null : p = this.password
      this.$emit('handlePassword', p)
    },
    showPassword () {
      let t
      this.passwordType === 'password' ? t = 'text' : t = 'password'
      this.passwordType = t
    }
  },
  watch: {
    handleInput: {
      handler: function (val) {
        this.validate()
      }
    }
  }
}
</script>