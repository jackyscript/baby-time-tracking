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
  <h3>Activity log</h3>
  <ul tabindex="0" class="timekeeper-entry" v-for="(record, key) in timeRecords" :key="record.id">
    <li>
      <label :for="record.babyActivity.entryId">Activity:</label
      ><output :id="record.babyActivity.entryId">{{ record.babyActivity.entryValue }}</output>
    </li>
    <li>
      <label :for="record.entryDate.entryId">Entry date:</label
      ><output :id="record.entryDate.entryId">
        {{ new Date(record.entryDate.entryValue).toLocaleDateString() }}
      </output>
    </li>
    <li>
      <label :for="record.beginTime.entryId">Start:</label
      ><output :id="record.beginTime.entryId">{{ record.beginTime.entryValue }}</output>
    </li>
    <li>
      <label :for="record.endTime.entryId">End:</label
      ><output :id="record.endTime.entryId">{{ record.endTime.entryValue }}</output>
    </li>
    <li class="details-entry">
      <label :for="record.details.entryId">Details:</label
      ><output :id="record.details.entryId">{{ record.details.entryValue }}</output>
    </li>
    <li>
      <button role="button" title="Edit this record" @click="handleEdit(key)">
        <img
          aria-hidden="true"
          src="../../assets/icons/edit.svg"
          alt="Edit"
          width="30"
          height="30"
        />
        <span hidden>Edit</span>
      </button>

      <button role="button" title="Delete this record" @click="handleRemove(key)">
        <img
          aria-hidden="true"
          src="../../assets/icons/delete.svg"
          alt="Delete"
          width="30"
          height="30"
        />
        <span hidden>Delete</span>
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
