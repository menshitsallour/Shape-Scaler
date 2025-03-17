<template>
  <section id="features" class="features">
    <div class="container">
      <FeatureItem
        v-for="(feature, index) in featureStores.features"
        :key="index"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFeaturesStore } from '../../stores/featuresStore';
import FeatureItem from './FeatureItemComponent.vue';
const featureStores = useFeaturesStore();
</script>

<style scoped lang="scss">
@import '../../css/variables';
@import '../../css/components/_features';

.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
