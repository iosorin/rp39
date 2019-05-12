<template lang="pug">
    v-text-field(
      v-model="email",
      label='Email',
      type='text',
      color="white",
      :error-messages="EmailErrors",
      @change="$v.email.$touch()"
    )
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'
export default {
  props: ['handleInput', 'preventValue'],
  validations: {
    email: { required, email }
  },
  data () {
    return {
      email: this.preventValue
    }
  },
  computed: {
    EmailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Email is not correct')
      !this.$v.email.required && errors.push('Field is required')
      return errors
    }
  },
  methods: {
    validate () {
      let p
      this.$v.$touch()
      this.$v.$invalid ? p = null : p = this.email
      this.$emit('handleEmail', p)
    }
  },
  watch: {
    handleInput: {
      deep: false,
      handler: function (obj) {
        this.validate()
      }
    }
  }
}
</script>