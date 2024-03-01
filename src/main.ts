import '@/assets/css/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { basicSetup } from 'codemirror';
import VueCodemirror from 'vue-codemirror';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use(VueCodemirror, {
  autofocus: true,
  disabled: false,
  indentWithTab: false,
  tabSize: 2,
  autoCloseBrackets: true,
  autoDestroy: true,
  extensions: [basicSetup],
});

app.mount('#app');
