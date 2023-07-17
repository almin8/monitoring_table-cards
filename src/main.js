import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Row from "primevue/row";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Avatar from "primevue/avatar";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

createApp(App)
  .use(PrimeVue)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Row", Row)
  .component("SelectButton", SelectButton)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("Paginator", Paginator)
  .component("Avatar", Avatar)
  .mount("#app");
