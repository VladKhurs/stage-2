<template>
<div class="array-field">
<div class="font-weight-bold mb-2">{{ label }}</div>
<div v-for="(item, index) in value" :key="index" class="array-item">
<FormRenderer
:schema="fields"
:value="item"
@input="updateItem(index, $event)"
:rulesEngine="rulesEngine"
:catalogProvider="catalogProvider"
/>
<v-btn small color="error" @click="removeItem(index)">Удалить</v-btn>
</div>
<v-btn color="primary" @click="addItem">{{ addButton }}</v-btn>
</div>
</template>
<style scoped>
.array-field {
border: 1px solid #ccc;
padding: 16px;
margin-bottom: 16px;
border-radius: 4px;
}
.array-item {
border-bottom: 1px solid #eee;
padding-bottom: 16px;
margin-bottom: 16px;
}
</style>
<script>

export default {
name: 'FieldArray',
components: {
FormRenderer: () => import('../FormRenderer.vue')
},
props: [
'value',
'label',
'fields',
'addButton',
'rulesEngine',
'catalogProvider',
],
methods: {
addItem() {
const newItem = {};
this.fields.forEach(field => {
newItem[field.key] = null;
});
const newValue = [...(this.value || []), newItem];
this.$emit('input', newValue);
},
removeItem(index) {
const newValue = [...this.value];
newValue.splice(index, 1);
this.$emit('input', newValue);
},
updateItem(index, itemData) {
const newValue = [...this.value];
newValue[index] = itemData;
this.$emit('input', newValue);
}
}
};
</script>