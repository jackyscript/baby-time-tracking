<script setup>
import { ref } from 'vue'
import RecordsComponent from './RecordsComponent.vue'
import AlertComponent from '../AlertComponent.vue'
import { v4 as uuid } from 'uuid'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const defaultTitle = 'main.title'

const activityTypes = [
  'main.activity.wasBreastFed',
  'main.activity.wasBottleFed',
  'main.activity.wasFed',
  'main.activity.drankWater',
  'main.activity.drankTea',
  'main.activity.bathing',
  'main.activity.playing',
  'main.activity.crying',
  'main.activity.tookANap'
]

let formTitle = ref('')
formTitle.value = defaultTitle

let entryDate = ref('')
let beginTime = ref('')
let endTime = ref('')
let babyActivity = ref('')
let details = ref('')
let deleteConfirmationText = ref('')

let deleteAllRecordsConfirmation = ref(false)

let activeRecord = ''
let toolbarActionInfo = ref('')

const currentDate = new Date()
const currentDay = currentDate.toISOString().substring(0, 10)
const currentTime = currentDate.toISOString().substring(11, 16)

entryDate.value = currentDay
beginTime.value = currentTime
endTime.value = currentTime

const saveToLocalStorageKey = 'savedRecords'
const timeRecords = ref(JSON.parse(localStorage.getItem(saveToLocalStorageKey) ?? '{}'))

function addRecord() {
  if (babyActivity.value === '') {
    toolbarActionInfo.value = t('main.activity.unselected')
  } else {
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

    formTitle.value = defaultTitle
    toolbarActionInfo.value = t('record.added')
  }
}

function saveRecords() {
  localStorage.setItem(saveToLocalStorageKey, JSON.stringify(timeRecords.value))
  toolbarActionInfo.value = t('records.saved')
}

function showDeleteRecordsConfirmation() {
  deleteAllRecordsConfirmation.value = true
}

function resetDeleteAll() {
  deleteConfirmationText.value = ''
  deleteAllRecordsConfirmation.value = false
}
function confirmDeleteAll() {
  if (t('delete.records.confirm').toLowerCase() === deleteConfirmationText.value.toLowerCase()) {
    localStorage.removeItem(saveToLocalStorageKey)
    toolbarActionInfo.value = t('records.deleted')
    resetDeleteAll()
  }
}

function cancel() {
  babyActivity.value = ''

  activeRecord = ''

  formTitle.value = defaultTitle
  toolbarActionInfo.value = t('record.canceled')
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

  formTitle.value = 'main.edit.title'
}

function removeRecord(key) {
  delete timeRecords.value[key]

  formTitle.value = defaultTitle
}
</script>

<template>
  <h2>{{ t(formTitle) }}</h2>
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
      <button type="button" role="button" :title="t('toolbar.title.saveAll')" @click="saveRecords">
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
    <AlertComponent
      alert-id="toolbarInfo"
      action-info-id="toolbarActionInfo"
      :alert-text="toolbarActionInfo"
    />
  </menu>
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
        <button type="button" class="secondary" role="button" @click="resetDeleteAll">
          {{ t('delete.records.cancel') }}
        </button>
        <button type="button" class="contrast" role="button" @click="confirmDeleteAll">
          {{ t('delete.records.confirm') }}
        </button>
      </div>
    </form>
  </section>
  <form role="form">
    <label for="activities">{{ t('main.form.label.activity') }}</label>
    <select
      name="activities"
      id="activities"
      v-model="babyActivity"
      :aria-invalid="babyActivity === ''"
      aria-describedby="invalid-helper"
    >
      <option value="" disabled selected>{{ t('main.activityPlaceHolder') }}</option>
      <option v-for="(activityType, index) in activityTypes" :key="index" :value="activityType">
        {{ t(activityType) }}
      </option></select
    ><small id="invalid-helper" v-if="babyActivity === ''">
      {{ t('main.activity.unselected') }}
    </small>

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

  <aside role="complementary">
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
