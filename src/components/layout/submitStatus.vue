<template lang="pug">
    v-snackbar(
        v-model='snackbar',
        v-if="submitStatus",
        right,
        bottom,
        :auto-height="true",
        color="white",
        class="black--text text-xs-center submit-status",
        :timeout="submitTimeout"
        )
        span.green--text(v-if="success")  {{successText}}
        span.red--text(v-if="incorrect")  Please fill the form correctly
        span(v-if="errorDetails") {{ submitStatus }}        
</template>


<script>
    export default {
      data () {
        return {
          snackbar: false
        }
      },
      computed: {
        page () {
          return this.$store.getters.page
        },
        successText () {
          return ['common', 'password'].includes(this.page)
            ? 'Keep waiting please...\n your profile will be updated soon'
            : 'You`ve been successfully authorized!'
        },
        submitStatus () {
          return this.$store.getters.submitStatus
        },
        submitTimeout () {
          return this.$store.getters.submitTimeout
        },
        success () {
          return this.submitStatus === 'success'
        },
        incorrect () {
          return this.submitStatus === 'error'
        },
        errorDetails () {
          const st = this.submitStatus
          if (!st || !st.length) return
          return st !== 'success' && st !== 'error'
        }
      },
      watch: {
        submitStatus (message) {
          this.snackbar = true
        }
      }
}
</script>