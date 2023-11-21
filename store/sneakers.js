import { defineStore } from "pinia";
import { opFetch } from "~/composables/opFetch";

export const useSneakersStore = defineStore("sneakersStore", {
  state: () => ({
    sneakers: [],
    models: [],
    marks: [],
    newSneaker: [],
    loading: false,
    modelId: null,
  }),
  actions: {
    setLoading(option) {
      this.loading = option;
    },
    async getSneakers() {
      this.setLoading(true);
      try {
        const {
          data: { _rawValue },
        } = await opFetch("/api/sneakers", { method: "get" });
        this.sneakers = _rawValue;
        // console.log("store:", _rawValue);
      } catch (error) {
        console.error(error);
      }
      this.setLoading(false);
    },
    async getModels() {
      this.setLoading(true);
      try {
        const {
          data: { _rawValue },
        } = await opFetch("/api/sneakers/models", { method: "get" });
        this.models = _rawValue;
      } catch (error) {
        console.error(error);
      }
      this.setLoading(false);
    },
    async getMarks() {
      this.setLoading(true);
      try {
        const {
          data: { _rawValue },
        } = await opFetch("/api/sneakers/mark", { method: "get" });
        this.marks = _rawValue;
      } catch (error) {
        console.error(error);
      }
      this.setLoading(false);
    },
    async addNewSneaker(data) {
      try {
        const {
          data: { _rawValue },
        } = await opFetch("/api/sneakers", {
          method: "POST",
          body: JSON.stringify(data),
        });
        this.modelId = _rawValue.id;
        console.log("AAIIIIDII:", this.modelId);
      } catch (error) {
        console.error(error);
      }
    },
    async addPhotosSneaker(data) {
      try {
        const {
          data: { _rawValue },
        } = await opFetch(`/api/sneakers/photos/${this.modelId}`, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.newSneaker = _rawValue;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
