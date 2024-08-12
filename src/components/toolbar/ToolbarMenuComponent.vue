<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const emit = defineEmits([
  'addRecord',
  'cancel',
  'showSaveRecordsConfirmation',
  'showDeleteRecordsConfirmation'
])

const addRecord = () => {
  onHandle('addRecord')
}

const cancel = () => {
  onHandle('cancel')
}

const showSaveRecordsConfirmation = () => {
  onHandle('showSaveRecordsConfirmation')
}

const showDeleteRecordsConfirmation = () => {
  onHandle('showDeleteRecordsConfirmation')
}

const onHandle = (action) => {
  emit(action)
}
</script>

<template>
  <menu role="toolbar" class="flex-container">
    <li>
      <button type="button" role="button" :title="t('toolbar.title.add')" @click="addRecord">
        <img aria-hidden="true" src="../../assets/icons/add.svg" :alt="t('toolbar.add')" />
        <span hidden>{{ t('toolbar.add') }}</span>
      </button>
    </li>
    <li>
      <button type="button" role="button" :title="t('toolbar.title.cancel')" @click="cancel">
        <img aria-hidden="true" src="../../assets/icons/cancel.svg" :alt="t('toolbar.cancel')" />
        <span hidden>{{ t('toolbar.cancel') }}</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        role="button"
        :title="t('toolbar.title.saveAll')"
        @click="showSaveRecordsConfirmation"
      >
        <img aria-hidden="true" src="../../assets/icons/save.svg" :alt="t('toolbar.saveAll')" />
        <span hidden>{{ t('toolbar.saveAll') }}</span>
      </button>
    </li>
    <li>
      <button
        type="button"
        role="button"
        :title="t('toolbar.title.deleteAll')"
        @click="showDeleteRecordsConfirmation"
      >
        <img
          aria-hidden="true"
          src="../../assets/icons/delete.svg"
          alt="{{ t('toolbar.deleteAll') }}"
        />
        <span hidden>{{ t('toolbar.deleteAll') }}</span>
      </button>
    </li>
  </menu>
</template>

<style scoped>
menu {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

button > img {
  width: 30px;
  height: 30px;
}
</style>
