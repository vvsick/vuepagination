import { defineStore } from 'pinia';

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  }),
  getters: {
    totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
  },
  actions: {
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setTotalItems(total: number) {
      this.totalItems = total;
    },
    setItemsPerPage(itemsPerPage: number) {
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
    },
  },
});
