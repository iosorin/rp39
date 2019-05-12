<template lang="pug">
  Auth-Form(target='login')
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