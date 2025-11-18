<template>
  <div>
    <div v-for="field in schema" :key="field.key">
      <component
        :is="getFieldComponent(field.type)"
        v-if="isVisible(field.key)"
        :value="value[field.key]"
        @input="updateField(field.key, $event)"
        v-bind="getProps(field)"
      >
      </component>
    </div>
  </div>    
</template>

<script>
import FieldText from './fields/FieldText.vue';
import FieldNumber from './fields/FieldNumber.vue';
import FieldCheckbox from './fields/FieldCheckbox.vue';
import FieldSelect from './fields/FieldSelect.vue';
import FieldArray from './fields/FieldArray.vue';

export default {
  name: 'FormRenderer',
  props: {
    schema: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    rootModel: {
      type: Object,
      default: null,
    },
    pathPrefix: {
      type: String,
      default: '',
    },
    rulesEngine: Function,
    catalogProvider: Function,
  },
  components: {
    FieldText,
    FieldNumber,
    FieldCheckbox,
    FieldSelect,
    FieldArray,
  },
  methods: {
    getFullPath(fieldKey) {
      return this.pathPrefix ? `${this.pathPrefix}.${fieldKey}` : fieldKey;
    },
    getFieldComponent(type) {
      const componentMap = {
        text: 'FieldText',
        number: 'FieldNumber',
        checkbox: 'FieldCheckbox',
        select: 'FieldSelect',
        array: 'FieldArray',
      };
      return componentMap[type] || 'FieldText';
    },
    updateField(key, newValue) {
      this.$emit('input', { ...this.value, [key]: newValue });
    },
    isVisible(fieldKey) {
        if (!this.rulesEngine) return true;
        const model = this.rootModel || this.value;
        const { visible } = this.rulesEngine(this.getFullPath(fieldKey), model);
        return visible;
    },
    getProps(field) {
      const model = this.rootModel || this.value;
      const rules = this.rulesEngine ? this.rulesEngine(this.getFullPath(field.key), model) : {};

      return {
        ...field,
        ...rules,
        rootModel: model,
        rulesEngine: this.rulesEngine,
        catalogProvider: this.catalogProvider,
        pathPrefix: this.getFullPath(field.key),
      }
    }
  },
};
</script>
