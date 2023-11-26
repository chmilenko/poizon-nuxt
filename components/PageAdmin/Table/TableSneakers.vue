<template>
  <div class="tableAdmin">
    <div class="btnAdmin">
      <add-sneaker-modal />
      <v-btn @click="clickShowFilters">Фильтры</v-btn>
    </div>
    <div class="filters-block" v-if="showFilters">
      <div class="filters">
        <div class="filter-price">
          <div class="filter">
            <v-text-field
              label="Цена от"
              variant="solo"
              v-model="priceFromFilter"
              density="compact"
              single-line
              hide-details
            ></v-text-field>
          </div>
          <div class="filter">
            <v-text-field
              label="Цена до"
              variant="solo"
              v-model="priceToFilter"
              density="compact"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </div>
        <div class="filter-model-size">
          <div class="filter">
            <v-text-field
              label="Модель"
              variant="solo"
              v-model="modelFilter"
              density="compact"
              single-line
              hide-details
            ></v-text-field>
          </div>
          <div class="filter">
            <v-select
              label="По размеру"
              multiple
              variant="solo"
              :items="allSizes"
              v-model="filterSize"
              item-title="size"
              item-value="id"
              density="compact"
              single-line
              hide-details
            ></v-select>
          </div>
        </div>
      </div>
      <div class="delete-filters">
        <v-btn size="large" @click="deleteFilters" class="delFilters"
          >Сбросить</v-btn
        >
      </div>
    </div>
    <div class="tableSneakers">
      <v-table density="compact">
        <thead>
          <th class="text-left id-column">
            <span>Номер</span>
            <img
              alt="sort"
              src="/sort.png"
              class="icon-sort"
              @click="sortSneakers('id')"
            />
          </th>
          <th class="text-сenter">Брэнд</th>
          <th class="text-сenter">Модель</th>
          <th class="text-сenter">Размеры и Кол-во</th>
          <th class="text-сenter price-column">
            <span>Цена</span>
            <img
              alt="sort"
              src="/sort.png"
              class="icon-sort"
              @click="sortSneakers('price')"
            />
          </th>
        </thead>
        <tbody>
          <tr v-for="sneaker in filteredSneakers" :key="sneaker.id">
            <td>{{ sneaker.id }}</td>
            <td>{{ sneaker.Mark.name }}</td>
            <td>{{ sneaker.name }}</td>
            <div
              v-for="size in sneaker.Sizes"
              :key="size.id"
              class="sizes-count"
            >
              <td class="size">{{ size.size }}</td>
              <td class="count">{{ size.count }}</td>
            </div>
            <td>{{ sneaker.price }}</td>
            <td>
              <put-sneaker-modal :id="sneaker.id"  />
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
import { useSneakersStore } from "~/store/sneakers";
import PutSneakerModal from "./PutSneakerModal";
import AddSneakerModal from "./AddSneakerModal.vue";
import _ from "lodash";
const sneakerStore = useSneakersStore();
await sneakerStore.getSneakers();



const sortField = ref("id");
const sortOrder = ref(1);
const allSneakers = computed(() => {
  let sneakers = sneakerStore.sneakers;
  if (sneakers) {
    return sneakers.sort((a, b) => {
      if (a[sortField.value] < b[sortField.value]) return -sortOrder.value;
      if (a[sortField.value] > b[sortField.value]) return sortOrder.value;
      return 0;
    });
  }
});
const allSizes = computed(() => {
  let sizes = sneakerStore.sneakers
    .reduce((acc, el) => acc.concat(el.Sizes), [])
    .sort((a, b) => a.size - b.size);
  sizes = _.uniqBy(sizes, "size");
  return sizes;
});

const showFilters = ref(false);
const clickShowFilters = () => {
  showFilters.value = !showFilters.value;
};

const sortSneakers = (field) => {
  if (sortField.value === field) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortField.value = field;
    sortOrder.value = 1;
  }
};



const priceFromFilter = ref("");
const priceToFilter = ref("");
const modelFilter = ref("");
const filterSize = ref([]);

const filteredSneakers = computed(() => {
  if (allSneakers.value) {
    return allSneakers.value.filter((sneaker) => {
      const priceFrom =
        priceFromFilter.value !== ""
          ? Number(priceFromFilter.value)
          : -Infinity;
      const priceTo =
        priceToFilter.value !== "" ? Number(priceToFilter.value) : Infinity;
      const model =
        modelFilter.value !== ""
          ? modelFilter.value.toLowerCase().trim()
          : null;
      const size =
        filterSize.value !== undefined && filterSize.value.length > 0
          ? filterSize.value
          : null;

      return (
        (priceFrom ? sneaker.price >= priceFrom : true) &&
        (priceTo ? sneaker.price <= priceTo : true) &&
        (model ? sneaker.name.toLowerCase().trim().includes(model) : true) &&
        (size ? sneaker.Sizes.some((e) => size.includes(e.id)) : true)
      );
    });
  }
});

const deleteFilters = () => {
  priceFromFilter.value = null;
  priceToFilter.value = null;
  modelFilter.value = null;
  filterSize.value = null;
};
</script>
<style scoped>
.tableAdmin {
  height: 100vh;
  font-size: 2.3vh;
}
.btnAdmin {
  margin: 2vh auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.tableSneakers {
  margin: 8vh auto;
}
.v-row {
  display: block !important;
  margin: 2px;
}
td,
th {
  border: 1px solid rgb(92, 89, 89);
  text-align: center;
}
.sizes-count {
  display: flex;
  justify-content: space-between;
}
.size,
.count {
  width: 50%;
}
.icon-sort {
  height: 20px;
  width: 20px;
  float: right;
}
.id-column,
.price-column {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: baseline;
}

.filters {
  display: flex;
  justify-content: space-between;
}
.filter-price,
.filter-model-size {
  flex: 1;
}
.filter {
  margin: 1vh;
}
.delete-filters {
  text-align: center;
  margin-top: 1vh;
}
</style>
