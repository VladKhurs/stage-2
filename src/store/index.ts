import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_BASE_URL = 'http://localhost:3004';

interface CatalogItem {
  code: string;
  ru_name: string;
  [key: string]: any;
}

interface RootState {
  openApiSchema: any | null;
  formData: any;
  catalogs: {
    [key: string]: CatalogItem[];
  };
}

const store: StoreOptions<RootState> = {
  state: {
    openApiSchema: null,
    formData: {},
    catalogs: {},
  },
  mutations: {
    SET_OPENAPI_SCHEMA(state, schema) {
      state.openApiSchema = schema;
    },
    SET_FORM_DATA(state, data) {
      state.formData = data;
    },
    SET_CATALOG(state, { name, data }) {
      Vue.set(state.catalogs, name, data);
    },
  },
  actions: {
    async loadOpenApiSchema({ commit }) {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/openapi`);
        commit('SET_OPENAPI_SCHEMA', data);
      } catch (error) {
        console.error("Ошибка загрузки OpenAPI схемы:", error);
      }
    },
    async loadFormData({ commit }, formId) {
      if (!formId) {
        commit('SET_FORM_DATA', {});
        return;
      }
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/form/${formId}`);
        commit('SET_FORM_DATA', data);
      } catch (error) {
        console.error("Ошибка загрузки данных формы:", error);
      }
    },
    async saveFormData(_, formData) {
      try {
        await axios.put(`${API_BASE_URL}/api/form/1`, formData);
        alert('Форма сохранена!');
      } catch (error) {
        console.error("Ошибка сохранения формы:", error);
      }
    },
    async loadCatalog({ commit, state }, name: string) {
      if (state.catalogs[name]) {
        return state.catalogs[name];
      }
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/catalog/${name}`);
        commit('SET_CATALOG', { name, data });
        return data;
      } catch (error) {
        console.error(`Ошибка загрузки каталога ${name}:`, error);
        return [];
      }
    },
  },
  getters: {
    getCatalog: (state) => (name: string) => {
      return state.catalogs[name] || [];
    }
  }
};

export default new Vuex.Store<RootState>(store);