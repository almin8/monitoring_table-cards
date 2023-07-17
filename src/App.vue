<template>
  <div>
    <div
      class="flex flex-wrap sm:justify-content-between md:justify-content-between flex-wrap"
    >
      <SelectButton
        class="m-2"
        v-model="value"
        unselectable="true"
        :options="options"
      />
      <div class="m-2">
        <InputText
          class="sm:w-15rem md:w-15rem"
          v-model.trim="inputValue"
          type="text"
        />
        <Button @click="searchInput" class="ml-2" label="Поиск" />
      </div>
    </div>
    <DataTable
      v-if="value == 'Таблица'"
      showGridlines
      stripedRows
      :value="productsFilter"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      class="cursor-pointer m-2"
    >
      <Column field="date" header="Дата" style="width: 16%"></Column>
      <Column field="important" header="Важность" style="width: 8%"></Column>
      <Column
        field="equipment"
        header="Оборудование"
        style="width: 11%"
      ></Column>
      <Column
        sortable
        field="message"
        header="Сообщение"
        style="width: 45%"
      ></Column>
      <Column
        sortable
        field="responsibility"
        header="Ответственность"
        style="width: 17%"
      ></Column>
    </DataTable>
    <div v-else>
      <div class="flex flex-wrap justify-content-center">
        <div
          v-for="el in productsFilter"
          :key="el.id"
          :class="{
            'bg-yellow-400': Select == el.id,
            'bg-primary': 'Yes' == el.read,
          }"
          tabindex="-1"
          @click="'Yes' !== el.read && reading(el)"
          @keydown.prevent.space="Select == el.id && cons(el)"
          class="flex flex-column surface-300 font-bold m-5 p-3 cursor-pointer sm:w-39rem border-2 w-29rem"
        >
          <div class="flex justify-content-between top">
            <div class="info">
              <div class="flex">
                <div class="w-9rem h-3rem">Дата</div>
                <div>{{ el.date }}</div>
              </div>
              <div class="flex">
                <div class="w-9rem h-3rem">Важность</div>
                <div>{{ el.important }}</div>
              </div>
              <div class="flex">
                <div class="w-9rem h-3rem">Оборудование</div>
                <div>{{ el.equipment }}</div>
              </div>
            </div>
            <div
              class="flex flex-column align-items-center justify-content-start avatar"
            >
              <Avatar
                icon="pi pi-user"
                size="xlarge"
                class="mb-2"
                style="background-color: #debde3; color: #ffffff"
                shape="circle"
              />
              <div>{{ el.responsibility }}</div>
            </div>
          </div>
          <div class="flex bottom">
            <div class="w-9rem h-3rem">Сообщение</div>
            <div>{{ el.message }}</div>
          </div>
        </div>
      </div>
    </div>
    <Paginator
      class="flex justify-content-end"
      v-model:first="first"
      @page="getPagiData"
      :rows="6"
      :totalRecords="sizeProducts"
    ></Paginator>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      first: 0,
      inputValue: "",
      products: [],
      productsFilter: [],
      value: "Таблица",
      options: ["Таблица", "Карточка"],
      Select: 0,
      sizeProducts: 0,
    };
  },
  methods: {
    getPagiData() {
      this.productsFilter = this.products.slice(this.first, this.first + 6);
    },
    async getServData() {
      try {
        const resp = await axios(
          "https://64b519eaf3dbab5a95c6b431.mockapi.io/products/"
        );
        this.products = resp.data;
        this.sizeProducts = this.products.length;
        this.productsFilter = this.products.slice(this.first, this.first + 6);
      } catch (e) {
        console.error(e);
      }
    },

    cons(el) {
      el.read = "Yes";
      this.Select = null;
    },
    reading(el) {
      if (this.Select === el.id) {
        this.Select = null;
      } else {
        this.Select = el.id;
      }
    },
    searchInput() {
      if (this.inputValue === "") {
        this.productsFilter = this.products.slice(this.first, this.first + 6);
      } else {
        this.productsFilter = this.products.filter((el) =>
          el.message.toLowerCase().includes(this.inputValue.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.getServData();
  },
};
</script>
