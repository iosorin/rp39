<template lang="pug">
  div(
      v-show="showTools"
      class="tools"
      :style="{ left: `${x}px`, top: `${y}px` }"
      @mousedown.prevent
      )
      v-btn-toggle(v-model='styles', multiple, light)
          v-btn(@click="setStyle('bold')", flat)
              v-icon brightness_high

</template>


<script>
    export default {
      data () {
        return {
          styles: [],
          x: 0,
          y: 0,
          showTools: false,
          selectedText: '',
          highligthed: false
        }
      },
      mounted () {
        window.addEventListener('mouseup', this.userSelection)
      },
      beforeDestroy () {
        window.removeEventListener('mouseup', this.userSelection)
      },
      methods: {
        userSelection () {
          const selection = window.getSelection()
          const selectionRange = selection.getRangeAt(0)
          const startNode = selectionRange.startContainer.parentNode
          const endNode = selectionRange.endContainer.parentNode
          const selectionNodes = Array.from(selectionRange.cloneContents().childNodes)
    
          // show tools
          const st1 = ['PRE', 'B', 'P'].includes(startNode.parentNode.tagName)
          const st11 = startNode.isSameNode(endNode)
          const st12 = !st11 && (startNode || endNode).tagName === 'B'
          const st2 = (st11 && st1) || (st12 && st1)
    
          st2 ? this.showTools = true : this.showTools = false
    
          // set highligthed status
          const st3 = selectionNodes.some(t => t.nodeName === 'B')
          const st4 = startNode.tagName === 'B'
    
          this.highligthed = st3 || st4
          this.highligthed ? this.styles.push(0) : this.styles = []
    
          const { x, y, width } = selectionRange.getBoundingClientRect()
          if (!width) {
            this.showTools = false
            this.highligthed = false
          }
    
          this.x = x + (width / 2)
          this.y = y + window.scrollY - 10
          this.selectedText = selection
        },
        setStyle (style) {
          const st = this.selectedText
          const range = st.getRangeAt(0)
          let parent = range.startContainer.parentNode.parentNode

          const div = document.createElement('div')
          div.appendChild(range.cloneContents())
          const nodeLength = div.childNodes.length
    
          const selHtml = div.innerHTML

          let newHtml, finallyHtml

          if (nodeLength > 1 || (nodeLength === 1 && !this.highligthed)) {
            this.highligthed ? newHtml = selHtml.replace(/<b>|<\/b>/g, '') : newHtml = '<b>' + selHtml + '</b>'
            finallyHtml = parent.innerHTML.replace(selHtml, newHtml)
          } else if (nodeLength === 1 && this.highligthed) {
            newHtml = parent.innerHTML.replace(`<b>${selHtml}</b>`, selHtml)
            finallyHtml = newHtml
          }
    
          parent.innerHTML = finallyHtml
          this.showTools = false
        }
      }
    }
</script>


<style lang="stylus" scoped>
.tools
    position fixed
    z-index 99
    top 0
    left 0
    transform translate(-50%, -100%)
    transition all 0.3s
</style>
<!-- <b>blas</b> -->

