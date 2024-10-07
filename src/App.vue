<template>
  <div>
    <Pagination :items="items" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '@/components/Pagination.vue';

const items = ref(Array.from({ length: 100 }, (_, index) => ({ id: index, name: `Item ${index + 1}` })));
</script>
