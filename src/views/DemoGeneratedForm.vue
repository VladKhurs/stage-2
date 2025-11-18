<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>Автоматически сгенерированная форма</v-card-title>
          <v-card-text v-if="formSchema.length > 0">
            <v-form v-model="isFormValid">
              <FormRenderer
                  :key="formRenderKey"
                  :schema="formSchema"
                  :value="formData"
                  @input="updateFormData"
                  :rulesEngine="rulesEngine"
                  :catalogProvider="catalogProvider"
                  :rootModel="formData"
               />
            </v-form>
          </v-card-text>
          <v-card-text v-else>
            Загрузка схемы и данных...
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              :disabled="!isFormValid"
              @click="saveForm"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Состояние данных формы (formData)</v-card-title>
          <v-card-text>
            <pre>{{ formData }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { parseOpenApiToFormSchema } from '../services/openapi/parseOpenApiToFormSchema';
import { evaluateRules } from '../services/rules/rulesEngine';
import FormRenderer from '../components/form/FormRenderer.vue';

export default {
  name: 'DemoGeneratedForm',
  components: { FormRenderer },
  data() {
    return {
      isFormValid: false,
      formSchema: [],
      formRenderKey: 1,
    };
  },
  computed: {
    ...mapState(['openApiSchema', 'formData']),
  },
  watch: {
    openApiSchema(newSchema) {
      if (newSchema) {
        this.formSchema = parseOpenApiToFormSchema(newSchema, 'VehicleOverallDimensionDetails');
      }
    }
  },
  methods: {
    ...mapActions(['loadOpenApiSchema', 'loadFormData', 'saveFormData', 'loadCatalog']),
    rulesEngine(fieldKey, model) {
      return evaluateRules(fieldKey, model);
    },
    catalogProvider(name) {
      return this.loadCatalog(name);
    },
    updateFormData(newData) {
        this.$store.commit('SET_FORM_DATA', newData);
    },
    saveForm() {
      this.saveFormData(this.formData);
    }
  },
  async created() {
    await Promise.all([
        this.loadOpenApiSchema(),
        this.loadFormData(1)
    ]);
    this.formRenderKey += 1;
  }
};
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
}
</style>