import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate';

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);