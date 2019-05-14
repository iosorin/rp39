<template lang="pug">
    v-card(tile, color="rgba(0,0,0,.2)")
        v-card-text
            v-form#message-form(@submit.prevent="handleMessage", ref="form")
                v-layout(row, wrap)
                    v-flex(grow)
                        v-textarea(
                        v-model="message"
                        label='Write a message...',
                        color="white",
                        auto-grow,
                        rows="1",
                        box,
                        single-line,
                        hide-details,
                        @keydown.tab.exact.prevent,
                        @keydown.enter.exact.prevent,
                        @keydown.enter.exact="handleMessage"
                        )
                    v-fab-transition
                        v-btn.ma-0(
                            @click="handleMessage"
                            v-if="this.message",
                            icon,
                            :ripple="false",
                            light,
                            absolute
                            )
                                v-icon(color="white") send

</template>

<script >
    export default {
      data () {
        return {
          message: ''
        }
      },
      computed: {
        formattedMessage () {
          const arr = this.message
            .replace(/</gm, '&lt').replace(/>/gm, '&gt')
            .replace(/(\r\n|\n|\r)/gm, '<br>')
            .split('<br><br>')
          const text = this.rRight(arr)
            .map(m => this.str(m) ? '<p>' + m + '</p>' : '<br/>')
            .join('')
          console.log(text)
          return text
        }
      },
      methods: {
        handleMessage () {
          if (!this.str(this.message)) return
          const message = {
            text: this.message,
            html: this.formattedMessage
          }
          this.$emit('handleMessage', message)
          this.$refs.form.reset()
          document.querySelector('textarea').style.height = ''
        },
        str (s) {
          return s && s.trim().length
        },
        rRight (arr) {
          return arr.reduceRight((result, a) => {
            return (result.length === 0 && a === '') || (result.length === 0 && a === '<br>')
              ? result
              : [a].concat(result)
          }, [])
        }
      }
    }
</script>

<style lang="stylus" scoped>
    .v-btn--absolute
        top 25px
        right 20px
</style>