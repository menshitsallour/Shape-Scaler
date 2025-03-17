<template>
  <q-page class="cart-page">
    <q-header elevated style="background-color: seagreen">
      <q-toolbar>
        <q-toolbar-title>Online Store</q-toolbar-title>
        <q-btn flat round dense icon="shopping_cart" @click="showCart = true" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <Catalog />
      </q-page>
    </q-page-container>

    <q-dialog v-model="showCart">
      <CartPopup />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CartPopup from '../components/store/CartPopupComponent.vue';
import Catalog from '../components/store/CatalogComponent.vue';

const showCart = ref<boolean>(false);
</script>
