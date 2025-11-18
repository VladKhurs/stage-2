<template>
  <v-select
    :value="value"
    @input="$emit('input', $event)"
    :items="finalItems"
    :item-text="itemText"
    :item-value="itemValue"
    :label="label"
    :rules="rules"
    :disabled="disabled"
  ></v-select>
</template>

<script>
export default {
  name: 'FieldSelect',
  props: ['value', 'label', 'required', 'disabled', 'source', 'items', 'catalogProvider', 'itemText', 'itemValue'],
  data() {
    return {
      remoteItems: [],
    };
  },
  computed: {
    finalItems() {
      if (this.items && this.items.length) {
        return this.items;
      }
      return this.remoteItems;
    },
    rules() {
      if (this.required) {
        return [v => !!v || 'Это поле обязательно'];
      }
      return [];
    }
  },
  async created() {
    if (this.source && this.catalogProvider && !this.items) {
      this.remoteItems = await this.catalogProvider(this.source);
    }
  }
};
</script>