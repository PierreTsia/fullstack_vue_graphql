<template>
  <v-combobox
    :items="items"
    :search-input.sync="search"
    :hide-no-data="!search"
    v-model="model"
    item-text="label"
    box
    flat
    background-color="transparent"
    hide-selected
    label="Search for an option"
    multiple
    small-chips
    @change="$emit('onTagsChanged', model)"
  >
    <template v-slot:no-data>
      <v-list-tile>
        <span class="subheading">Create</span>
        <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
          {{ search }}
        </v-chip>
      </v-list-tile>
    </template>
    <template v-slot:selection="{ item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        :color="`${item.color} lighten-3`"
        :selected="selected"
        label
        small
      >
        <span class="pr-2">
          {{ item.label }}
        </span>
        <v-icon small @click="parent.selectItem(item)">close</v-icon>
      </v-chip>
    </template>
    <template v-slot:item="{ index, item }">
      <v-list-tile-content>
        <v-chip :color="`${item.color} lighten-3`" dark label small>
          {{ item.label }}
        </v-chip>
      </v-list-tile-content>
    </template>
  </v-combobox>
</template>
<script>
export default {
  name: "Combobox",
  props: {
    existingTags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      index: -1,
      header: { header: "Select an option or create one" },
      items: [],
      model: [],
      nonce: 1,
      menu: false,

      x: 0,
      search: null,
      y: 0
    };
  },
  watch: {
    existingTags: {
      immediate: true,
      handler(tags) {
        this.items = [this.header, ...tags];
      }
    },
    model(val, prev) {
      if (val.length === prev.length) {
        return;
      }

      this.model = val.map(v => {
        if (typeof v === "string") {
          if (
            this.existingTags
              .map(t => t.label.toLowerCase())
              .includes(v.toLowerCase())
          ) {
            return;
          }
          v = {
            label: v,
            color: this.colors[this.nonce - 1]
          };

          this.items.push(v);
          this.model = "";

          this.nonce++;
        }

        return v;
      });
    }
  },
  methods: {}
};
</script>
