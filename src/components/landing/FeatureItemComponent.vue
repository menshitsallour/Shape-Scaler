<template>
  <div class="feature">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  description: String,
});
</script>

<style scoped lang="scss"></style>
