<script setup>
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRecordsFilter } from '@/composables/time/recordsFilter.js'
import { useRecordsComparator } from '@/composables/time/recordsComparator.js'
import { useRecordsValidator } from '@/composables/time/recordsValidator.js'
import { useTimeRecordsStore } from '@/composables/stores/timeRecordsStore.js'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const emit = defineEmits(['editRecord', 'removeRecord'])

const store = useTimeRecordsStore()
const { timeRecords } = storeToRefs(store)
const { resultEntries, entriesFilter } = toRefs(useRecordsFilter(timeRecords.value))
const { filterValues } = useRecordsFilter(timeRecords.value)
const sortedEntries = useRecordsComparator(resultEntries)

const entriesEmpty = useRecordsValidator(sortedEntries)

const handleEdit = (key) => {
  onHandle('editRecord', key)
}

const handleRemove = (key) => {
  delete timeRecords.value[key]
  onHandle('removeRecord', key)
}

const onHandle = (action, key) => {
  emit(action, key)
}
</script>

<template>
  <h3>{{ t('aside.title') }}</h3>
  <label for="filters">{{ t('aside.entry.filter.legend') }}:</label>
  <select id="filters" v-model="entriesFilter">
    <option
      v-for="filterValue in Object.keys(filterValues)"
      :key="filterValue"
      :value="filterValue"
    >
      {{ t(filterValues[filterValue]) }}
    </option>
  </select>
  <section v-if="entriesEmpty">{{ t('aside.result.entries.empty') }}</section>
  <section
    v-else
    v-for="(record, key) in sortedEntries"
    :key="record.entryId"
    :id="record.entryId"
    :href="'#' + record.entryId"
  >
    <ul tabindex="0" class="timekeeper-entry">
      <li>
        <label :for="record.babyActivity.entryId">{{ t('aside.entry.activity') }}</label
        ><output :id="record.babyActivity.entryId">{{ t(record.babyActivity.entryValue) }}</output>
      </li>
      <li>
        <label :for="record.entryDate.entryId">{{ t('aside.entry.entryDate') }}</label
        ><output :id="record.entryDate.entryId">
          {{ new Date(record.entryDate.entryValue).toLocaleDateString() }}
        </output>
      </li>
      <li>
        <label :for="record.beginTime.entryId">{{ t('aside.entry.start') }}</label
        ><output :id="record.beginTime.entryId">{{ record.beginTime.entryValue }}</output>
      </li>
      <li>
        <label :for="record.endTime.entryId">{{ t('aside.entry.end') }}</label
        ><output :id="record.endTime.entryId">{{ record.endTime.entryValue }}</output>
      </li>
      <li class="details-entry">
        <label :for="record.details.entryId">{{ t('aside.entry.details') }}</label
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
  </section>
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

@media (min-width: 768px) {
  ul.timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

.filter-selection-buttons {
  display: flex;
  gap: 3rem;
}
fieldset {
  display: inline-flex;
  gap: 16px;
  border: none;
  padding: 0;
  margin: 0;
}
legend {
  display: contents;
}
</style>
