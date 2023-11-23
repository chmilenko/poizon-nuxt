import { defineStore } from "pinia";
import { authFetch } from "~/composables/opFetch";

export const useAdminStore = defineStore("adminStore", {
  state: () => ({
    admin: null,
    loading: false,
  }),
  actions: {
    setLoading(option) {
      this.loading = option;
    },
    async loginAdmin(data) {
      try {
        const {
          data: { _rawValue },
        } = await authFetch("/api/authenication", {
          method: "POST",
          body: data,
          
        });
        console.log(_rawValue);
        if(_rawValue) {
          await this.verification()
            await navigateTo('/admin/table')
          
        }
        console.log("login:", _rawValue);
      } catch (error) {
        console.error(error);
      }
    },
    async verification() {
      try {
        const {
          data: { _rawValue },
        }= await authFetch("/api/verification", { method: "GET" });
        console.log(_rawValue);
        this.admin = _rawValue;
      }catch (error) {
        console.error(error)
      }

    },
    async logout() {
      await authFetch("/api/logout", {
        method: "POST",
      });
    },
  },
});
