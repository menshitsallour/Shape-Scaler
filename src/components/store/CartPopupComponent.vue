<template>
  <q-card class="cart-popup">
    <q-card-section>
      <div class="text-h6">Your Cart</div>
    </q-card-section>
    <q-card-section>
      <q-list bordered>
        <q-item v-for="item in cartItems" :key="item.id" class="q-my-sm">
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>Price: ${{ item.price }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-input
              v-model.number="item.quantity"
              type="number"
              dense
              filled
              style="width: 60px"
              @update:model-value="updateQuantity(item.id, $event)"
            />
            <q-btn flat round icon="delete" @click="removeFromCart(item.id)" />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="cartItems.length === 0" class="text-center q-py-md">Your cart is empty.</div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">Total: ${{ totalPrice.toFixed(2) }}</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
      <q-btn color="green" label="Buy" :disable="cartItems.length === 0" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '../../stores/cartStore';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const removeFromCart = (productId: number) => {
  cartStore.removeItem(productId);
};

const updateQuantity = (productId: number, value: string | number | null) => {
  const quantity = value === null || value === '' ? 0 : Number(value);

  if (quantity < 1) {
    cartStore.removeItem(productId);
  } else {
    cartStore.updateQuantity(productId, quantity);
  }
};
</script>

<style lang="scss" scoped>
.cart-popup {
  width: 500px;
  max-width: 90vw;

  .q-list {
    background: #f9f9f9;
  }

  .q-item {
    border-bottom: 1px solid #ddd;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
