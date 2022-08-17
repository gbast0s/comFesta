import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import loader from "vue-ui-preloader";
import store from "./store"
import axios from "axios"
import Toaster from "@meforma/vue-toaster";
import vSelect from "vue-select";
import Pagination from "./components/Pagination.vue";
import Dialog from "./components/Dialog.vue";
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';

import 'v-calendar/dist/style.css';


import "vue-select/dist/vue-select.css";

axios.defaults.baseURL = "http://festabackend.test/api/"



const app = createApp(App)
  .use(router)
  .use(loader)
  .use(store)
  .use(Toaster)
  .use(SetupCalendar, {})

app.config.globalProperties.$axios = axios

app.component('v-select', vSelect)
app.component("pagination", Pagination)
app.component("inputDialog", Dialog)
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)

app.mount("#app")
