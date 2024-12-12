<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const deleteConfirmationText = defineModel()
defineProps(['deleteAllRecordsConfirmation'])
const emit = defineEmits(['confirmDeleteAll', 'resetDeleteAll'])

const confirmDeleteAll = () => {
  onHandle('confirmDeleteAll')
}

const resetDeleteAll = () => {
  onHandle('resetDeleteAll')
}

const onHandle = (action) => {
  emit(action)
}
</script>

<template>
  <section v-if="deleteAllRecordsConfirmation">
    <form role="form" @submit.prevent="confirmDeleteAll">
      <label for="deleteAllRecordsConfirmation">{{ t('delete.records.confirmation') }}</label>
      <input
        type="text"
        name="deleteAllRecordsConfirmation"
        id="deleteAllRecordsConfirmation"
        v-model="deleteConfirmationText"
      />
      <div class="grid">
        <button type="button" class="contrast" role="button" @click="confirmDeleteAll">
          {{ t('delete.records.confirm') }}
        </button>
        <button type="button" class="secondary" role="button" @click="resetDeleteAll">
          {{ t('delete.records.cancel') }}
        </button>
      </div>
    </form>
  </section>
</template>
