<template>
  <svg v-bind="$attrs"><slot /></svg>
</template>

<script>
export default {
  name: "Icon"
};
</script>

<style lang="stylus">
.icon
    display inline-block
.icon-normal,
.icon-default
    stroke currentColor
    fill currentColor
    height 19px
    width 19px
    min-height 19px
    min-width 19px
.icon-medium
    height 28px
    width 28px
.icon-big
    height 50px
    width 50px
    min-height 50px
    min-width 50px
.icon-small
    height 15px
    width 15px
    min-height 15px
    min-width 15px
.icon-x-small
    height 10px
    width 10px
    min-height 10px
    min-width 10px
.icon-xx-small
    height 5px
    width 5px
    min-height 5px
    min-width 5px
.icon-default
    fill black
    stroke black
.icon-black
    fill black
    stroke black
.icon-primary
    fill #1d3557
    stroke #1d3557
.icon-secondary
    fill #457b9d
    stroke #457b9d
.icon-accent
    fill #a8dadc
    stroke #a8dadc
.icon-warning
    fill #FFE66D
    stroke #FFE66D
.icon-error
    fill #e63946
    stroke #e63946
.icon-info
    fill #f1faee
    stroke #f1faee
.icon-succes
    fill #4E937A
    stroke #4E937A
</style>
