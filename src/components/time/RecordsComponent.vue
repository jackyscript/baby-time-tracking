<script setup>
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
  <h3>Activity summary:</h3>
  <div class="summary-table">
    <div class="timekeeper-entry" v-for="(record, key) in timeRecords" :key="record.id">
      <div>Activity: {{ record.babyActivity }}</div>
      <div>Entry date: {{ record.entryDate }}</div>
      <div>Start: {{ record.beginTime }}</div>
      <div>End: {{ record.endTime }}</div>
      <div class="details-entry">Details: {{ record.details }}</div>
      <div>
        <button
          role="button"
          class="edit-entry"
          title="Click to edit this record"
          @click="handleEdit(key)"
        >
          Edit record
        </button>
        <button
          role="button"
          class="remove-entry"
          title="Click to remove this record"
          @click="handleRemove(key)"
        >
          Delete record
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timekeeper-entry:nth-child(odd) {
  background-color: gainsboro;
}

.details-entry {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .timekeeper-entry {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
}

.edit-entry:hover {
  cursor: pointer;
}
.remove-entry:hover {
  cursor: pointer;
}
</style>
