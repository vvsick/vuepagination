<template>
  <ul class="container">
    <li v-for="item in paginatedItems" :key="item.id">{{ item.name }}</li>
  </ul>
  <div class="pagination">
    <button 
      @click="goToPreviousPage" 
      :disabled="currentPage === 1"
      class="pagination-item" 
    >
      <
    </button>
    <template v-if="totalPages <= 5">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        class="pagination-item"
        :class="{'active': currentPage === page}"
        @click="goToPage(page)" 
      >
        {{ page }}
      </button>
    </template>
    <template v-else>
      <button 
        @click="goToPage(1)" 
        :class="{'active': currentPage === 1}"
        class="pagination-item"
      >
        1
      </button>
      <span v-if="currentPage > 3" class="pagination-item">...</span>
      <button 
        v-for="page in visiblePages" 
        :key="page" 
        @click="goToPage(page)" 
        :class="{'active': currentPage === page}"
        class="pagination-item"
      >
        {{ page }}
      </button>
      <span v-if="currentPage < totalPages - 2" class="pagination-item">...</span>
      <button 
        @click="goToPage(totalPages)" 
        :class="{'active': currentPage === totalPages}"
        class="pagination-item"
      >
        {{ totalPages }}
      </button>
    </template>
    <button 
      @click="goToNextPage" 
      :disabled="currentPage === totalPages"
      class="pagination-item"
    >
      >
    </button>
    <select v-model="itemsPerPage" class="pagination-item">
      <option 
        v-for="option in itemsPerPageOptions" 
        :key="option" 
        :value="option"
      >
        {{ option }} items per page
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePaginationStore } from '@/stores/pagination';

const props = defineProps<{
  items: any[],
}>()

const paginationStore = usePaginationStore();

const paginatedItems = computed(() => {
  const start = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
  const end = start + paginationStore.itemsPerPage;
  return props.items.slice(start, end);
});
paginationStore.setTotalItems(props.items.length);
const currentPage = computed(() => paginationStore.currentPage);
const totalPages = computed(() => paginationStore.totalPages);
const itemsPerPage = computed({
  get: () => paginationStore.itemsPerPage,
  set: (value) => paginationStore.setItemsPerPage(value),
});
const itemsPerPageOptions = [10, 20, 50];

const visiblePages = computed(() => {
  const pages = [];
  if (currentPage.value <= 3) {
    pages.push(2, 3, 4);
  } else if (currentPage.value >= totalPages.value - 2) {
    pages.push(totalPages.value - 3, totalPages.value - 2, totalPages.value - 1);
  } else {
    pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1);
  }
  return pages;
});

const goToPreviousPage = () => paginationStore.setCurrentPage(currentPage.value - 1);
const goToNextPage = () => paginationStore.setCurrentPage(currentPage.value + 1);
const goToPage = (page: number) => paginationStore.setCurrentPage(page);
</script>

<style scoped>
.container {
  max-height: 500px;
  overflow-y: auto;
}

.pagination {
  margin-top: 10px;
  display: flex;
}

.pagination-item {
  font-size: 16px;
  border: 1px solid #DEDED5;
  padding: 16px;
  background-color: #161618;
  color: #DEDED5;
  transition: all .1s ease;
}

.pagination-item.active {
  color: #fff;
  background-color: #414853;
}

.pagination-item:hover {
  background-color: #414853;
}

.pagination-item:disabled {
  color: #dbdbdb;
  background-color: #414853;
}
</style>