<template>
  <v-app>
    <v-main>
      <DemoGeneratedForm/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import DemoGeneratedForm from './views/DemoGeneratedForm.vue';

export default Vue.extend({
  name: 'App',

  components: {
    DemoGeneratedForm,
  },
});
</script>
