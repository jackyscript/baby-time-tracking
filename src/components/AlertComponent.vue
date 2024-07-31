<script setup>
defineProps({
  alertId: {
    type: String,
    required: true
  },
  actionInfoId: {
    type: String,
    required: true
  },
  alertText: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div role="alert" :id="alertId" aria-live="polite" aria-relevant="all">
    <p class="visually-hidden" :id="actionInfoId">{{ alertText }}</p>
  </div>
</template>

<style scoped>
.visually-hidden {
  top: 0;
  left: -2px;
  width: 1px;
  height: 1px;
  position: absolute;
  overflow: hidden;
}
</style>
