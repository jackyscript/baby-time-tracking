<script setup>
import { ref } from 'vue'
import RecordsComponent from './RecordsComponent.vue'
import { v4 as uuid } from 'uuid'
import { LangConstants } from '@/constants/LangConstants.js'

let formTitle = ref('')
formTitle.value = LangConstants.defaultTitle

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

  formTitle.value = LangConstants.defaultTitle
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

  formTitle.value = LangConstants.defaultTitle
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

  formTitle.value = LangConstants.editTitle
}

function removeRecord(key) {
  delete timeRecords.value[key]

  formTitle.value = LangConstants.defaultTitle
}
</script>

<template>
  <menu role="toolbar" class="flex-container">
    <li>
      <button class="flex-item" role="button" title="Add this record" @click="addRecord">
        <span>Add</span>
      </button>
    </li>
    <li>
      <button class="flex-item" role="button" title="Cancel current record" @click="cancel">
        <span>Cancel</span>
      </button>
    </li>
    <li>
      <button class="flex-item" role="button" title="Save all records" @click="saveRecords">
        <span>Save all</span>
      </button>
    </li>
    <li>
      <button class="flex-item" role="button" title="Delete all records" @click="deleteRecords">
        <span>Delete all</span>
      </button>
    </li>
  </menu>
  <h2>{{ formTitle }}</h2>
  <form role="form">
    <label for="activities">What did your baby do?</label>
    <select name="activities" id="activities" v-model="babyActivity">
      <option value="" disabled selected>Select the activity</option>
      <option
        v-for="(activityType, index) in LangConstants.activityTypes"
        :key="index"
        :value="activityType"
      >
        {{ activityType }}
      </option>
    </select>

    <label for="current-day">On which day:</label>
    <input type="date" id="current-day" name="time-tracker-day" v-model="entryDate" />

    <label for="start-time">When did it start?</label>
    <input type="time" id="start-time" name="time-tracker-start" v-model="beginTime" />

    <label for="end-time">When did it finish?</label>
    <input type="time" id="end-time" name="time-tracker-end" v-model="endTime" />

    <label for="notes">You can tell me more about it:</label>
    <textarea
      id="notes"
      name="notes-text"
      rows="10"
      :placeholder="LangConstants.detailsPlaceHolder"
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
</style>
