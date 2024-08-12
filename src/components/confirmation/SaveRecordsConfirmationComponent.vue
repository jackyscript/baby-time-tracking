<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps(['saveRecordsConfirmation'])
const emit = defineEmits(['confirmSaveRecords', 'resetConfirmSaveRecords'])

const confirmSaveRecords = () => {
  onHandle('confirmSaveRecords')
}

const resetConfirmSaveRecords = () => {
  onHandle('resetConfirmSaveRecords')
}

const onHandle = (action) => {
  emit(action)
}
</script>

<template>
  <section v-if="saveRecordsConfirmation">
    <form role="form" @submit.prevent="confirmSaveRecords">
      <p>{{ t('save.records.confirmation') }}</p>
      <div class="grid">
        <button type="button" class="contrast" role="button" @click="confirmSaveRecords">
          {{ t('save.records.confirm') }}
        </button>
        <button type="button" class="secondary" role="button" @click="resetConfirmSaveRecords">
          {{ t('save.records.cancel') }}
        </button>
      </div>
    </form>
  </section>
</template>
