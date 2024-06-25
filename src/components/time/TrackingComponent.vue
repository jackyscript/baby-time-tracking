<script setup>
import { ref } from 'vue'
import RecordsComponent from './RecordsComponent.vue'
import { v4 as uuid } from 'uuid'

const defaultTitle = 'Baby time tracking'
const editTitle = 'Forgot something?'
const activityTypes = ['Was breastfed', 'Was fed', 'Playing', 'Crying', 'Took a nap']
let formTitle = ref('')
formTitle.value = defaultTitle

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

const timeRecords = ref({})

function setTimeRecord() {
  let id = activeRecord === '' ? uuid() : activeRecord

  let currentRecord = {
    entryDate: entryDate.value,
    beginTime: beginTime.value,
    endTime: endTime.value,
    babyActivity: babyActivity.value,
    details: details.value
  }

  timeRecords.value[id] = currentRecord
  activeRecord = ''

  formTitle.value = defaultTitle
}

function cancel() {
  babyActivity.value = ''
  activeRecord = ''

  formTitle.value = defaultTitle
}

function editRecord(key) {
  activeRecord = key
  ;(function setRecordToForm(timeRecord) {
    beginTime.value = timeRecord.beginTime
    endTime.value = timeRecord.endTime
    entryDate.value = timeRecord.entryDate
    babyActivity.value = timeRecord.babyActivity
    details.value = timeRecord.details
  })(timeRecords.value[activeRecord])

  formTitle.value = editTitle
}

function removeRecord(key) {
  delete timeRecords.value[key]

  formTitle.value = defaultTitle
}
</script>

<template>
  <div class="flex-container">
    <div class="flex-item">
      <button title="Save this!" @click="setTimeRecord">💾</button>
      <button title="Cancel" @click="cancel">❌</button>
    </div>
  </div>
  <h1>{{ formTitle }}</h1>
  <div class="time-tracker">
    <label for="activities">What did your baby do?</label>
    <select name="activities" id="activities" v-model="babyActivity">
      <option value="" disabled selected>Select the activity</option>
      <option v-for="(activityType, index) in activityTypes" :key="index" :value="activityType">
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
      placeholder="Said a new word, spit a small amount of milk, laughing with daddy..."
      maxlength="1000"
      v-model="details"
    ></textarea>
  </div>

  <RecordsComponent
    :timeRecords="timeRecords"
    @edit-record="editRecord"
    @remove-record="removeRecord"
  />
</template>

<style scoped>
.time-tracker-header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  column-gap: 300px;
}

.flex-container {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-content: stretch;
  align-items: flex-start;
}

.flex-item:nth-child(1) {
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
}

.time-tracker {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(5, 1fr);
  column-gap: 0px;
  row-gap: 1vmin;
}

label {
  margin: 0px;
}

textarea:not([cols]) {
  width: 100%;
}

textarea {
  margin-right: auto;
  resize: none;
}
</style>
