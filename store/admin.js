import { defineStore } from "pinia";
import { opFetch } from "~/composables/opFetch";

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
        } = opFetch("/api/authenication", {
          method: "POST",
          body: JSON.stringify(data),
        });
        // return _rawValue;
console.log('login:', _rawValue);
      } catch (error) {
        console.error(error);
      }
    },
    async verification() {
      const {
        data: { _rawValue },
      } = await opFetch("/api/verification", { method: "GET" });
      this.admin = _rawValue;
    },
    async logout() {
      await opFetch("/api/logout", {
        method: "POST",
      });
    },
  },
});
