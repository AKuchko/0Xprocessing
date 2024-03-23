import Vuelidate from '@vuelidate/core';

export default defineNuxtPlugin(app => {
  app.vueApp.use(Vuelidate);
});