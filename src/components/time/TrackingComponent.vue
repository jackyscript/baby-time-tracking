<script setup>
import { ref } from 'vue'
import RecordsComponent from './RecordsComponent.vue'
import { v4 as uuid } from 'uuid'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const activityTypes = [
  'main.activity.wasBreastFed',
  'main.activity.wasFed',
  'main.activity.playing',
  'main.activity.crying',
  'main.activity.tookANap'
]

let formTitle = ref('')
formTitle.value = t('main.title')

let entryDate = ref('')
let beginTime = ref('')
let endTime = ref('')
let babyActivity = ref('')
let details = ref('')

let activeRecord = ''

const currentDate = new Date()
const currentDay = currentDate.toISOString().substring(0, 10)
const currentTime = currentDate.toISOString().substring(11, 16)

entryDate.value = currentDay
beginTime.value = currentTime
endTime.value = currentTime

const saveToLocalStorageKey = 'savedRecords'
const timeRecords = ref(JSON.parse(localStorage.getItem(saveToLocalStorageKey) ?? '{}'))

function addRecord() {
  let id = activeRecord === '' ? uuid() : activeRecord

  let currentRecord = {
    entryDate: { entryId: uuid(), entryValue: entryDate.value },
    beginTime: { entryId: uuid(), entryValue: beginTime.value },
    endTime: { entryId: uuid(), entryValue: endTime.value },
    babyActivity: { entryId: uuid(), entryValue: babyActivity.value },
    details: { entryId: uuid(), entryValue: details.value }
  }

  timeRecords.value[id] = currentRecord
  activeRecord = ''

  formTitle.value = t('main.title')
}

function saveRecords() {
  localStorage.setItem(saveToLocalStorageKey, JSON.stringify(timeRecords.value))
}

function deleteRecords() {
  localStorage.removeItem(saveToLocalStorageKey)
}

function cancel() {
  babyActivity.value = ''

  activeRecord = ''

  formTitle.value = t('main.title')
}

function editRecord(key) {
  activeRecord = key
  ;(function setRecordToForm(timeRecord) {
    beginTime.value = timeRecord.beginTime.entryValue
    endTime.value = timeRecord.endTime.entryValue
    entryDate.value = timeRecord.entryDate.entryValue
    babyActivity.value = timeRecord.babyActivity.entryValue
    details.value = timeRecord.details.entryValue
  })(timeRecords.value[activeRecord])

  formTitle.value = t('main.edit.title')
}

function removeRecord(key) {
  delete timeRecords.value[key]

  formTitle.value = t.main.title
}
</script>

<template>
  <menu role="toolbar" class="flex-container">
    <li>
      <button class="flex-item" role="button" :title="t('toolbar.title.add')" @click="addRecord">
        <img aria-hidden="true" src="../../assets/icons/add.svg" :alt="t('toolbar.add')" />
        <span hidden>{{ t('toolbar.add') }}</span>
      </button>
    </li>
    <li>
      <button class="flex-item" role="button" :title="t('toolbar.title.cancel')" @click="cancel">
        <img aria-hidden="true" src="../../assets/icons/cancel.svg" :alt="t('toolbar.cancel')" />
        <span hidden>{{ t('toolbar.cancel') }}</span>
      </button>
    </li>
    <li>
      <button
        class="flex-item"
        role="button"
        :title="t('toolbar.title.saveAll')"
        @click="saveRecords"
      >
        <img aria-hidden="true" src="../../assets/icons/save.svg" :alt="t('toolbar.saveAll')" />
        <span hidden>{{ t('toolbar.saveAll') }}</span>
      </button>
    </li>
    <li>
      <button
        class="flex-item"
        role="button"
        :title="t('toolbar.title.deleteAll')"
        @click="deleteRecords"
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
  <h2>{{ formTitle }}</h2>
  <form role="form">
    <label for="activities">{{ t('main.form.label.activity') }}</label>
    <select name="activities" id="activities" v-model="babyActivity">
      <option value="" disabled selected>{{ t('main.activityPlaceHolder') }}</option>
      <option v-for="(activityType, index) in activityTypes" :key="index" :value="activityType">
        {{ t(activityType) }}
      </option>
    </select>

    <label for="current-day">{{ t('main.form.label.date') }}</label>
    <input type="date" id="current-day" name="time-tracker-day" v-model="entryDate" />

    <label for="start-time">{{ t('main.form.label.start') }}</label>
    <input type="time" id="start-time" name="time-tracker-start" v-model="beginTime" />

    <label for="end-time">{{ t('main.form.label.end') }}</label>
    <input type="time" id="end-time" name="time-tracker-end" v-model="endTime" />

    <label for="notes">{{ t('main.form.label.details') }}:</label>
    <textarea
      id="notes"
      name="notes-text"
      rows="10"
      :placeholder="t('main.detailsPlaceHolder')"
      maxlength="1000"
      v-model="details"
    ></textarea>
  </form>

  <aside>
    <RecordsComponent
      :timeRecords="timeRecords"
      @edit-record="editRecord"
      @remove-record="removeRecord"
    />
  </aside>
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

textarea {
  resize: none;
}

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
