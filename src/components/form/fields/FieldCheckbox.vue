<template>
  <v-checkbox
    :input-value="value"
    @change="$emit('input', $event)"
    :label="label"
  ></v-checkbox>
</template>

<script>
export default {
  name: 'FieldCheckbox',
  props: ['value', 'label'],
};
</script>