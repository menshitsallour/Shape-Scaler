<template>
  <div id="#app">
    <Header />
    <Hero />
    <Features />
    <ContactForm />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import ContactForm from '../components/landing/ContactFormComponent.vue';
import Features from '../components/landing/FeatureComponent.vue';
import Footer from '../components/landing/FooterComponent.vue';
import Header from '../components/landing/HeaderComponent.vue';
import Hero from '../components/landing/HeroComponent.vue';
</script>

<style lang="scss">
@import '../css/app.scss';
</style>
