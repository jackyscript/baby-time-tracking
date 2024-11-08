<script setup>
import { useI18n } from 'vue-i18n'
import { useRecordsFilter } from '@/composables/time/recordsFilter.js'
const { t } = useI18n()
const props = defineProps(['timeRecords'])
const timeRecords = props.timeRecords
const emit = defineEmits(['editRecord', 'removeRecord'])

const { resultEntries, entriesFilter, filterValues } = useRecordsFilter(timeRecords)

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
  <h3>{{ t('aside.title') }}</h3>
  <fieldset>
    <legend>{{ t('aside.entry.filter.legend') }}:</legend>
    <div class="filter-selection-buttons">
      <div>
        <label for="show-all">{{ t('aside.entry.filter.all') }}</label>
        <input
          type="radio"
          id="show-all"
          name="show-all-filter"
          :value="filterValues.noFilter"
          v-model="entriesFilter"
          checked
        />
      </div>
      <div>
        <label for="show-last-three-months">{{ t('aside.entry.filter.last.three.months') }}</label>
        <input
          type="radio"
          id="show-last-three-months"
          name="show-last-three-months-filter"
          :value="filterValues.threeMonthsFilter"
          v-model="entriesFilter"
        />
      </div>
      <div>
        <label for="show-last-six-months">{{ t('aside.entry.filter.last.six.months') }}</label>
        <input
          type="radio"
          id="show-last-six-months"
          name="show-last-six-months-filter"
          :value="filterValues.sixMonthsFilter"
          v-model="entriesFilter"
        />
      </div>
    </div>
  </fieldset>
  <div v-if="Object.keys(resultEntries).length == 0">{{ t('aside.result.entries.empty') }}</div>
  <ul
    v-else
    tabindex="0"
    class="timekeeper-entry"
    v-for="(record, key) in resultEntries"
    :key="record.id"
  >
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
