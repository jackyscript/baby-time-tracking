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
  <h3>Summary:</h3>
  <div class="summary-table-header">
    <div>Activity</div>
    <div>Entry date</div>
    <div>Start</div>
    <div>End</div>
    <div>Details</div>
    <div>Action</div>
  </div>
  <div class="summary-table">
    <div class="timekeeper-entry" v-for="(record, key) in timeRecords" :key="record.id">
      <div>{{ record.babyActivity }}</div>
      <div>{{ record.entryDate }}</div>
      <div>{{ record.beginTime }}</div>
      <div>{{ record.endTime }}</div>
      <div>{{ record.details }}</div>
      <div>
        <span class="edit-entry" title="Click to edit this record" @click="handleEdit(key)"
          >🖊</span
        >
        <span class="remove-entry" title="Click to remove this record" @click="handleRemove(key)"
          >❌</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary-table-header {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.summary-table-header div {
  font-weight: bold;
}

.timekeeper-entry:nth-child(odd) {
  background-color: gainsboro;
}

.timekeeper-entry {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.edit-entry:hover {
  cursor: pointer;
}
.remove-entry:hover {
  cursor: pointer;
}
</style>
