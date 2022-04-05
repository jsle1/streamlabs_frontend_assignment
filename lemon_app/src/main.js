import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

import {
  Layout,
  Button,
  Card,
  Divider,
  Col,
  Row,
} from 'ant-design-vue';

const app = createApp(App);
app.config.productionTip = false;
app.use(Layout);
app.use(Button);
app.use(Card);
app.use(Divider);
app.use(Col);
app.use(Row);
app.mount('#app');
