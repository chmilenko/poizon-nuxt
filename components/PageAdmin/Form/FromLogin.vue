<template>
  <div class="adminLogin">
    <v-form @submit.prevent="loginAdmin">
      <v-text-field
        label="Логин"
        variant="outlined"
        v-model="login"
      ></v-text-field>
      <v-text-field
        label="Пароль"
        variant="outlined"
        v-model="password"
      ></v-text-field>
      <v-btn :disabled="!active" type="submit">Войти</v-btn>
    </v-form>
  </div>
</template>
<script setup>
import { useAdminStore } from "~/store/admin";
const adminStore = useAdminStore();
const login = ref(null);
const password = ref(null);

const active = computed(() => login.value && password.value);

async function loginAdmin() {
  const body = {
    login: login.value,
    password: password.value,
  };
  await adminStore.loginAdmin(body);
}
console.log(adminStore.admin);
</script>
<style scoped>
.adminLogin {
  margin: 20px auto;
}
</style>
