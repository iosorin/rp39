<template lang="pug">
    v-text-field(
      v-model="username",
      label='Username',
      type='text',
      color="white",
      :error-messages="UsernameErrors"
      @change="$v.username.$touch()"
    )
</template>

<script>
  import { required } from 'vuelidate/lib/validators'
  export default {
    props: ['handleInput', 'preventValue'],
    validations: {
      username: { required }
    },
    data () {
      return {
        username: this.preventValue
      }
    },
    computed: {
      UsernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Username field is required')
        return errors
      }
    },
    methods: {
      validate () {
        let p
        this.$v.$touch()
        this.$v.$invalid ? p = null : p = this.username
        this.$emit('handleName', p)
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