<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps(['timeRecords'])
const emit = defineEmits(['editRecord', 'removeRecord'])

const handleEdit = (key) => {
  onHandle('editRecord', key)
}

const handleRemove = (key) => {
  onHandle('removeRecord', key)
}

const onHandle = (action, key) => {
  emit(action, key)
}
</script>

<template>
  <h3>t('aside.title')</h3>
  <ul tabindex="0" class="timekeeper-entry" v-for="(record, key) in timeRecords" :key="record.id">
    <li>
      <label :for="record.babyActivity.entryId">{{ t('aside.entry.activity') }}:</label
      ><output :id="record.babyActivity.entryId">{{ record.babyActivity.entryValue }}</output>
    </li>
    <li>
      <label :for="record.entryDate.entryId">{{ t('aside.entry.entryDate') }}:</label
      ><output :id="record.entryDate.entryId">
        {{ new Date(record.entryDate.entryValue).toLocaleDateString() }}
      </output>
    </li>
    <li>
      <label :for="record.beginTime.entryId">{{ t('aside.entry.start') }}:</label
      ><output :id="record.beginTime.entryId">{{ record.beginTime.entryValue }}</output>
    </li>
    <li>
      <label :for="record.endTime.entryId">{{ t('aside.entry.end') }}:</label
      ><output :id="record.endTime.entryId">{{ record.endTime.entryValue }}</output>
    </li>
    <li class="details-entry">
      <label :for="record.details.entryId">{{ t('aside.entry.details') }}:</label
      ><output :id="record.details.entryId">{{ record.details.entryValue }}</output>
    </li>
    <li>
      <button role="button" :title="t('aside.buttonTitle.edit')" @click="handleEdit(key)">
        <img
          aria-hidden="true"
          src="../../assets/icons/edit.svg"
          alt="{{t('aside.edit')}}"
          width="30"
          height="30"
        />
        <span hidden>{{ t('aside.edit') }}</span>
      </button>

      <button role="button" :title="t('aside.buttonTitle.delete')" @click="handleRemove(key)">
        <img
          aria-hidden="true"
          src="../../assets/icons/delete.svg"
          alt="{{t('aside.delete')}}"
          width="30"
          height="30"
        />
        <span hidden>{{ t('aside.delete') }}</span>
      </button>
    </li>
  </ul>
</template>

<style scoped>
ul.timekeeper-entry {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

.details-entry {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
