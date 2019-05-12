<template lang="pug">
  Auth-Form(target='registration')
</template>

<script>
  import AuthForm from '~/components/form/auth'

  export default {
    components: {
      AuthForm
    },
    transition: 'auth'
  }
</script>