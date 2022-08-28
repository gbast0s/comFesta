import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import loader from "vue-ui-preloader";
import store from "./store"
import axios from "axios"
import vSelect from "vue-select";
import Pagination from "./components/Pagination.vue";
import Dialog from "./components/Dialog.vue";
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import Toast, { useToast } from "vue-toastification"


//import Toaster from "@meforma/vue-toaster";

import 'v-calendar/dist/style.css';
import "vue-toastification/dist/index.css"
import "vue-select/dist/vue-select.css";

axios.defaults.baseURL = "http://festabackend.test/api/"

const toast = useToast();

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  position: "top-center",
  timeout: 5000,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
};

const app = createApp(App)
  .use(router)
  .use(loader)
  .use(store)
  .use(Toast, options)
  .use(SetupCalendar, {})

app.config.globalProperties.$axios = axios
app.config.globalProperties.$toast = toast;

app.component('v-select', vSelect)
app.component("pagination", Pagination)
app.component("inputDialog", Dialog)
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)

app.mount("#app")
