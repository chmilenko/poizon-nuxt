<template>
  <div class="tableAdmin">
    <div class="btnAdmin">
      <add-sneaker-modal />
      <v-btn>Фильтры</v-btn>
    </div>
    <div class="tableSneakers">
      <v-table density="compact">
        <thead>
          <th class="text-left">Номер</th>
          <th class="text-left">Брэнд</th>
          <th class="text-left">Модель</th>
          <th class="text-left">Размеры</th>
          <th class="text-left">Цена</th>
        </thead>
        <tbody>
          <tr v-for="sneaker in allSneakers" :key="sneaker.id">
            <td>{{ sneaker.id }}</td>
            <td>{{ sneaker.Mark.name }}</td>
            <td>{{ sneaker.name }}</td>
            <td>{{ sneaker.Sizes.map((size) => size.size).join(", ") }}</td>
            <td>{{ sneaker.price }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script setup>
import { useSneakersStore } from "~/store/sneakers";
import AddSneakerModal from "./AddSneakerModal.vue";
const sneakerStore = useSneakersStore();
await sneakerStore.getSneakers();
const allSneakers = computed(() => sneakerStore.sneakers);
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
</style>
