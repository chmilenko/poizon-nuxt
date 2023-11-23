<template>
  <div>
    <v-app>
      <v-app-bar>
        <div>
          <img src="/2.png" alt="logo" class="logo" />
        </div>
        <div class="rightHeader">
          <!-- <div v-if="admin !== null">Заказы</div> -->
          <div @click="navigateTo('/sneakers')">Каталог</div>
          <div @click="navigateTo('/contacts')">Контакты</div>
          <!-- <button v-if="admin" @click="logout">Выйти</button> -->
        </div>
      </v-app-bar>
      <v-main>
        <slot></slot>
      </v-main>
    </v-app>
  </div>
</template>
<script setup>
import { useAdminStore } from "~/store/admin";
import { useSneakersStore } from "~/store/sneakers";
const adminStore = useAdminStore();
const sneakerStore = useSneakersStore();

await sneakerStore.getMarks();

const allMarks = computed(() => {
  sneakerStore.marks;
});
// await adminStore.verification();
// const admin = computed(() => adminStore.admin);
// console.log(admin.value);
// async function logout() {
//   await adminStore.logout();
// }
</script>
<style lang="css">
.logo {
  width: 50px;
  height: 50px;
}

.rightHeader {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-around;
  width: 20vh;
}
</style>
