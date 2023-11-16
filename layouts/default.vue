<template>
  <div>
    <v-app>
      <v-app-bar>
        <div>
          <img src="2.png" alt="logo" class="logo" />
        </div>
        <div class="rightHeader">
          <div v-if="admin !== null">Заказы</div>
          <div @click="navigateTo('/sneakers')">Каталог</div>
          <div @click="navigateTo('/contacts')">Контакты</div>
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
const adminStore = useAdminStore();

await adminStore.verification();
const admin = computed(() => adminStore.admin);
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
