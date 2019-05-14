<template lang="pug">
    v-container(fluid, grid-list-md, fill-height)
        v-layout(row, wrap)
            v-flex.relative(d-flex, xs12)
                v-card.main-card.cover(color='indigo', dark, d-flex)
                    v-layout.ma-0(column, wrap, fill-height)
                        v-flex.main-card_top.messages.relative(grow, ref="container")
                            Editor
                            v-scale-transition
                                .vcenter.text-xs-center(v-show="!messages.length")
                                    h3.text-uppercase messages
                                    p.ma-0 no messages yet
                            .messages_outer.cover.c-scrollbar
                                transition-group(class ="messages_inner", name="messageTransiton" tag="div")
                                    v-hover(v-for='(m, index) in messages', :key='m.id')
                                        div.m(slot-scope="{ hover }")
                                            v-fade-transition
                                                v-btn(small, icon, dark, v-show='hover', @click="deleteMessage(m.id)")
                                                    v-icon(size="20", color="black") delete
                                            pre(v-html='m.html')
                        
                        v-flex.main-card_bottom.pa-0
                            Message(@handleMessage="newMessage")

</template>

<script>
    import Message from '@/components/message/message'
    import Editor from '@/components/message/editor'
    export default {
      components: {
        Message,
        Editor
      },
      computed: {
        messages () {
          return this.$store.getters.messages
        }
      },
      methods: {
        newMessage (message) {
          this.$store.dispatch('newMessage', message)
          this.scrollDown()
        },
        deleteMessage (id) {
          this.$store.dispatch('deleteMessage', id)
            .then(() => {
              this.$store.dispatch('loadMessages')
            })
          this.scrollDown()
        },
        scrollDown () {
          this.$nextTick(() => {
            const inner = this.$refs.inner || document.querySelector('.messages_inner')
            inner.scrollIntoView(false)
            inner.scrollTop = inner.scrollHeight
          })
        }
      }
}
</script>

<style lang="stylus">
.absolute
    position absolute
    top 20px
    left 20px
.main-card
    height 82vh
    &_bottom
        flex: 0 0 auto
    &_top
        flex 1 1 auto
.messages
    overflow: hidden
    margin 10px
    &_outer
        overflow-x: hidden
        overflow-y: auto
    &_inner
        padding 0 8px
        display flex
        flex-wrap wrap
        min-height 100%
        align-items flex-end
        flex-direction column
        justify-content flex-end
    .m
        position relative
        width 100%
        padding 5px 0
        cursor default
        text-align right
        background transparent
        transition background .2s
        &:hover
            background rgba(0,0,0,0.1)
        &:not(:last-child)
            margin-bottom 5px
    .v-btn
        position absolute
        left 10px
        top 50%
        margin 0 !important
        transform translate(0, -50%)
    pre,.m
        border-radius 6px 
    pre
        max-width 80%
        color #fff
        display inline-block
        font-size 14px
        min-width 50px
        background #000
        line-height 1
        font-weight normal
        padding 8px 8px 3px
        white-space pre-wrap
        cursor text
        z-index 1
    p
        line-height 1.22
        text-align left
        margin-bottom 7px !important
    b 
        background: orange
        color: #000

.messageTransiton
    &-enter-active,        
    &-leave-active
        transition all .27s ease-out
    &-enter,
    &-leave-to
        opacity 0
        transform translateX(100px) scale(0.7)
        
</style>

