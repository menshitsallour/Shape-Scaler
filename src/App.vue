<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>App</q-toolbar-title>
        <q-btn flat label="Animation" to="/" />
        <q-btn flat label="Landing" to="/landing" />
        <q-btn flat label="Catalog" to="/catalog" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
