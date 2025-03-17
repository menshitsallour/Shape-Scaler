<template>
  <div class="catalog-page q-pa-md">
    <h1 class="text-h4 q-mb-md">Product Catalog</h1>
    <div class="product-grid">
      <q-card v-for="product in filteredProducts" :key="product.id" class="product-card">
        <q-img src="https://via.placeholder.com/300x200" class="product-image" />
        <q-card-section>
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-caption text-grey">{{ product.description }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-bold text-primary">${{ product.price }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Add to Cart" @click="addToCart(product)" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types/product.types';

const searchQuery = ref<string>('');
const cartStore = useCartStore();

const products = ref<Product[]>([
  { id: 1, name: 'Product 1', description: 'Description 1', price: 29.99 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 39.99 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 19.99 },
]);

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const addToCart = (product: Product) => {
  cartStore.addItem(product);
};
</script>

<style lang="scss" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
}

.product-card {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.product-image {
  height: 200px;
  object-fit: cover;
}
</style>
