<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>Зв'яжіться з нами</h2>
      <form @submit.prevent="submitForm">
        <input v-model="formData.name" type="text" placeholder="Ваше ім'я" required />
        <input v-model="formData.email" type="email" placeholder="Ваш Email" required />
        <textarea v-model="formData.message" placeholder="Ваше повідомлення" required></textarea>
        <button type="submit" class="btn">Відправити</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  alert(`Дякуємо, ${formData.name}! Ваше повідомлення відправлено.`);
  formData.name = '';
  formData.email = '';
  formData.message = '';
};
</script>

<style scoped lang="scss">
@import '../../css/variables';
@import '../../css/components/_contact';
</style>
