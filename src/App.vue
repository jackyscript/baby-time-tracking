<script setup>
import NavComponent from './components/NavComponent.vue'
import TrackingComponent from './components/time/TrackingComponent.vue'
</script>

<template>
  <header role="banner" class="container-fluid">
    <h1>{{ $t('header.title') }}</h1>
    <a href="#main">{{ $t('header.main') }}</a>
    <NavComponent></NavComponent>
  </header>
  <main id="main" role="main" class="container-fluid">
    <TrackingComponent></TrackingComponent>
  </main>
  <footer>
    <a href="#top">{{ $t('footer.top') }}</a>
  </footer>
  <notifications ignoreDuplicates="true" />
</template>
