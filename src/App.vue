<script setup>
import TrackingComponent from './components/time/TrackingComponent.vue'
</script>

<template>
  <header role="banner">
    <h1>{{ $t('header.title') }}</h1>
  </header>
  <main role="main" class="container-fluid">
    <TrackingComponent></TrackingComponent>
  </main>
</template>
