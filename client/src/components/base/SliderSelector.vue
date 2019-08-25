<template>
  <div class="sliderSelector sliderSelector--default">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[
        'sliderSelector__item',
        `sliderSelector__item--${item.id}`,
        {
          'sliderSelector__item--active': localActiveItemId === item.id,
          'sliderSelector__item--disabled': item.disabled
        }
      ]"
      @click="handleItemClick(item)"
    >
      <slot :item="item">
        <v-icon :color="isActive(item.id) ? 'white' : 'black'" size="14">
          {{ item.icon }}</v-icon
        >
        {{ item.label }}</slot
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderSelector",
  props: {
    items: {
      type: Array,
      default: () => []
    },

    activeItemId: {
      type: String,
      default: null
    }
  },

  watch: {
    activeItemId: {
      immediate: true,
      handler(itemId) {
        this.setActiveItemId(itemId);
      }
    }
  },

  data() {
    return {
      localActiveItemId: null,
      localActiveItemIndex: null
    };
  },

  methods: {
    handleItemClick(item) {
      if (item.disabled) {
        return;
      }
      this.setActiveItemId(item.id);
      this.$emit("onItemClick", item);
    },

    isActive(itemId) {
      return itemId === this.localActiveItemId;
    },

    setActiveItemId(itemId) {
      this.localActiveItemId = itemId;
    }
  }
};
</script>
<style lang="stylus" scoped>
.sliderSelector
    display flex
    justify-content center
    align-items center
    box-sizing content-box
    border-radius 12.5px
    min-height 20px

    &.sliderSelector--default
        color white
        border 1px solid rgba(#00253b, 0.4)

    .sliderSelector__item
        flex-grow 1
        cursor pointer
        padding 5px 10px
        border-radius 12.5px
        font-size 13px
        text-align center
        transition color 0.2s, background 0.2s
        color black

        &:hover:not(.sliderSelector__item--active):not(.sliderSelector__item--disabled)
            color #00253b
            i
              color #00253b !important

        &.sliderSelector__item--active
            color white
            font-weight 500
            background-color #00253b


        &.sliderSelector__item--disabled
            color grey
</style>
