<template>
  <v-text-field
    type="number"
    :value="value"
    @input="$emit('input', Number($event))"
    :label="label"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  name: 'FieldNumber',
  props: ['value', 'label', 'required'],
   computed: {
    rules() {
      if (this.required) {
        return [v => v !== null && v !== undefined || 'Это поле обязательно'];
      }
      return [];
    }
  }
};
</script>