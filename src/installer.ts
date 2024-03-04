import type { App } from 'vue';
import { PlayGround } from './components';

export default {
  install: (app: App) => {
    app.component('PlayGround', PlayGround);
  },
};

export { PlayGround };
