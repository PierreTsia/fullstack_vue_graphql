<template>
  <div
    :class="[
      'appBtn',
      {
        'appBtn--round': round,
        'appBtn--disabled': disabled
      }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus">
.appBtn
  cursor pointer
  display flex
  align-content center
  align-items center
  justify-content center
  border-radius 3px
  padding 10px
  transition all 0.6s
  font-size 14px
  font-weight 500
  .icon
    fill white
    stroke white
    padding 0 2px
    display flex
    align-items center
    font-size 14px
  &:hover
    color white
    .icon
      fill white
      stroke white
  &.appBtn--disabled
    pointer-events none
    opacity 0.5
  &.appBtn--default
    border 1px solid black
    color black
    .icon
      fill black
      stroke black
    &:hover
      background black
&&.appBtn--plain
    background,
    color,
    &:hover
      background none
      border 1px solid
&.appBtn--simple-white
  border 1px solid white
  color white
  &:hover
    border 1px solid app-cobalt
    color app-cobalt
    .icon
      fill app-cobalt
      stroke app-cobalt
&.appBtn--round
  border-radius 34px
&.appBtn--default-inverse
  border 1px solid black
  background black
  color white
  &:hover
    background none
    color black
    .icon
      fill black
      stroke black
&.appBtn--success
  border 1px solid app-greeny-blue
  color app-greeny-blue
  .icon
    fill app-greeny-blue
    stroke app-greeny-blue
  &:hover
    background app-greeny-blue
&.appBtn--success-inverse
  border 1px solid app-greeny-blue
  background app-greeny-blue
  color white
  &.disabled
    opacity 0.5
    cursor default
  &:hover
    border 1px solid app-greeny-blue
    background app-greeny-blue
    color white
    .icon
      fill white
      stroke white
  &:hover
    background none
    color app-greeny-blue
    .icon
      fill app-greeny-blue
      stroke app-greeny-blue
&.appBtn--inform
  border 1px solid app-cobalt
  color app-cobalt
  .icon
    fill app-cobalt
    stroke app-cobalt
  &:hover
    background-color rgba(37, 92, 202, 0.1)
    color app-cobalt
    .icon
      fill app-cobalt
      stroke app-cobalt
&.appBtn--inform--disabled
  border 1px solid app-cobalt
  color app-cobalt
  opacity 0.5
  .icon
    fill app-cobalt
    stroke app-cobalt
  &:hover
    color app-cobalt
    cursor not-allowed
&.appBtn--danger-inverse
  border 1px solid app-salmon
  background app-salmon
  color white
  &:hover
    background none
    color app-salmon
    .icon
      fill app-salmon
      stroke app-salmon
&.appBtn--inform-inverse
  border 1px solid app-cobalt
  background app-cobalt
  color white
  &:not(.disabled)
    &:hover
      background app-cobalt-highlight
      border-color app-cobalt-highlight
      color white
      .icon
        fill white
        stroke white
  &.disabled
    opacity 0.5
    cursor not-allowed
&.appBtn--danger
  border 1px solid app-salmon
  color app-salmon
  .icon
    fill app-salmon
    stroke app-salmon
  &:hover
    background app-salmon
&.appBtn--danger-inverse
  border 1px solid app-salmon
  background app-salmon
  color white
  &:hover
    background none
    color app-salmon
    .icon
      fill app-salmon
      stroke app-salmon
&.appBtn--warning
  border 1px solid app-yellow
  color app-yellow
  .icon
    fill app-yellow
    stroke app-yellow
  &:hover
    background app-yellow
&.appBtn--warning-inverse
  border 1px solid app-yellow
  background app-yellow
  color white
  &:hover
    background none
    color app-yellow
    .icon
      fill app-yellow
      stroke app-yellow
&.appBtn--greeny-blue
  border 1px solid app-greeny-blue
  color app-greeny-blue
  .icon
    fill app-greeny-blue
    stroke app-greeny-blue
  &:hover
    background app-greeny-blue
&.appBtn--greeny-blue-inverse
  border 1px solid app-greeny-blue
  background app-greeny-blue
  color white
  &:hover
    background none
    color app-greeny-blue
    .icon
      fill app-greeny-blue
      stroke app-greeny-blue
&.appBtn--white-inverse
  border 1px solid white
  background white
  color app-greeny-blue
  &:hover
    background none
    color white
    .icon
      fill white
      stroke white
</style>
