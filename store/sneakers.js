import { defineStore } from "pinia";
import { opFetch } from "~/composables/opFetch";

export const useSneakersStore = defineStore("sneakersStore", {
  state: () => ({
    sneakers: null,
    oneSneaker: null,
    models: null,
    marks: null,
    newSneaker: null,
    loading: false,
    modelId: null,
    putSneaker: null,
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
      } catch (error) {
        console.error(error);
      }
      this.setLoading(false);
    },
    async getOneSneaker(id) {
      this.setLoading(true);
      try {
        const {
          data: { _rawValue },
        } = await opFetch(`/api/sneakers/${id}`, { method: "get" });
        this.oneSneaker = _rawValue;
        console.log(this.oneSneaker);
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
          body: data,
        });
        this.modelId = _rawValue.id;
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
        });
        this.newSneaker = _rawValue;
      } catch (error) {
        console.error(error);
      }
    },
    async putSneakers(data) {
      try {
        console.log(data);
        const {
          data: { _rawValue },
        } = await opFetch(`/api/sneakers/${this.oneSneaker.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        this.putSneaker = _rawValue;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
