<script setup>
import { ref } from 'vue'
import RecordsComponent from './RecordsComponent.vue'
import SaveRecordsConfirmationComponent from '../confirmation/SaveRecordsConfirmationComponent.vue'
import ToolbarMenuComponent from '../toolbar/ToolbarMenuComponent.vue'
import AlertComponent from '../AlertComponent.vue'
import { v4 as uuid } from 'uuid'
import { useI18n } from 'vue-i18n'
import { createNotification } from '@/utils/notification.js'
import { resetConfirmationForm } from '@/utils/confirmation.js'
import { activityTypes } from '@/activities/activities.js'

const { t } = useI18n()

const defaultTitle = 'main.title'

let formTitle = ref('')
formTitle.value = defaultTitle

let entryDate = ref('')
let beginTime = ref('')
let endTime = ref('')
let babyActivity = ref('')
let details = ref('')
let deleteConfirmationText = ref('')
let saveConfirmationText = ref('')

let deleteAllRecordsConfirmation = ref(false)
let saveRecordsConfirmation = ref(false)

let activeRecord = ''
let toolbarActionInfo = ref('')

const currentDate = new Date()
const currentDay = currentDate.toISOString().substring(0, 10)

entryDate.value = currentDay

const saveToLocalStorageKey = 'savedRecords'
const timeRecords = ref(JSON.parse(localStorage.getItem(saveToLocalStorageKey) ?? '{}'))

function addRecord() {
  if (babyActivity.value === '') {
    toolbarActionInfo.value = t('main.activity.unselected')
    createNotification(t('notify.entry.mandatory'), t('main.activity.unselected'))
  } else {
    let id = activeRecord === '' ? uuid() : activeRecord

    let currentRecord = {
      entryId: uuid(),
      entryDate: { entryId: uuid(), entryValue: entryDate.value },
      beginTime: { entryId: uuid(), entryValue: beginTime.value ? beginTime.value : null },
      endTime: { entryId: uuid(), entryValue: endTime.value ? endTime.value : null },
      babyActivity: { entryId: uuid(), entryValue: babyActivity.value },
      details: { entryId: uuid(), entryValue: details.value }
    }

    timeRecords.value[id] = currentRecord
    activeRecord = ''

    formTitle.value = defaultTitle
    toolbarActionInfo.value = t('record.added')
    createNotification(t('notify.addRecord'), t('record.added'))
  }
}

function showSaveRecordsConfirmation() {
  resetDeleteAll()
  const localStorageDataExists = JSON.parse(localStorage.getItem(saveToLocalStorageKey))
  if (!localStorageDataExists) {
    saveRecordsConfirmation.value = true
  } else {
    saveRecords()
  }
}

function showDeleteRecordsConfirmation() {
  resetConfirmSaveRecords()
  deleteAllRecordsConfirmation.value = true
}

function resetConfirmSaveRecords() {
  resetConfirmationForm(saveConfirmationText, saveRecordsConfirmation)
}

function resetDeleteAll() {
  resetConfirmationForm(deleteConfirmationText, deleteAllRecordsConfirmation)
}

function saveRecords() {
  localStorage.setItem(saveToLocalStorageKey, JSON.stringify(timeRecords.value))
  toolbarActionInfo.value = t('records.saved')

  createNotification(t('notify.saveRecords'), t('records.saved'))
  resetConfirmSaveRecords()
}

function confirmSaveRecords() {
  saveRecords()
}

function confirmDeleteAll() {
  if (t('delete.records.confirm').toLowerCase() === deleteConfirmationText.value.toLowerCase()) {
    localStorage.removeItem(saveToLocalStorageKey)
    Object.keys(timeRecords.value).forEach((key) => delete timeRecords.value[key])
    toolbarActionInfo.value = t('records.deleted')

    createNotification(t('notify.deleteAll'), t('records.deleted'))
    resetDeleteAll()
  }
}

function cancel() {
  babyActivity.value = ''

  activeRecord = ''

  formTitle.value = defaultTitle
  toolbarActionInfo.value = t('record.canceled')

  createNotification(t('notify.canceled'), t('record.canceled'))
}

function editRecord(key) {
  activeRecord = key
  ;(function setRecordToForm(timeRecord) {
    beginTime.value = timeRecord.beginTime.entryValue
    endTime.value = timeRecord.endTime.entryValue
    entryDate.value = timeRecord.entryDate.entryValue
    babyActivity.value = timeRecord.babyActivity.entryValue
    details.value = timeRecord.details.entryValue

    createNotification(t('notify.editRecord'), t('record.edit'))
  })(timeRecords.value[activeRecord])

  formTitle.value = 'main.edit.title'
}

function removeRecord(key) {
  delete timeRecords.value[key]

  createNotification(t('notify.deleteRecord'), t('record.deleted'))
  formTitle.value = defaultTitle
}
</script>

<template>
  <h2>{{ t(formTitle) }}</h2>
  <ToolbarMenuComponent
    @add-record="addRecord"
    @cancel="cancel"
    @show-save-records-confirmation="showSaveRecordsConfirmation"
    @show-delete-records-confirmation="showDeleteRecordsConfirmation"
  />
  <AlertComponent
    alert-id="toolbarInfo"
    action-info-id="toolbarActionInfo"
    :alert-text="toolbarActionInfo"
  />
  <SaveRecordsConfirmationComponent
    :saveRecordsConfirmation
    @confirm-save-records="confirmSaveRecords"
    @reset-confirm-save-records="resetConfirmSaveRecords"
  />
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
</style>
