<template>
  <v-text-field
    :value="value"
    @input="$emit('input', $event)"
    :label="label"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  name: 'FieldText',
  props: ['value', 'label', 'required'],
  computed: {
    rules() {
      if (this.required) {
        return [v => !!v || 'Это поле обязательно'];
      }
      return [];
    }
  }
};
</script>