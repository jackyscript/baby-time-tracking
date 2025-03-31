import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimeRecordsStore = defineStore('useTimeRecords', () => {
  const timeRecords = ref(getSavedRecords())

  function savedRecordsExist() {
    return getRecordsFromLocalStorage() !== null
  }

  function getRecordsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(StorageConstants.recordsStorageKey))
  }

  function getSavedRecords() {
    return savedRecordsExist() ? getRecordsFromLocalStorage() : {}
  }

  function storeRecords() {
    localStorage.setItem(StorageConstants.recordsStorageKey, JSON.stringify(timeRecords.value))
  }

  function removeRecords() {
    localStorage.removeItem(StorageConstants.recordsStorageKey)
    Object.keys(timeRecords.value).forEach((key) => delete timeRecords.value[key])
  }

  return { timeRecords, savedRecordsExist, getSavedRecords, storeRecords, removeRecords }
})

const saveToLocalStorageKey = 'savedRecords'

const StorageConstants = {
  recordsStorageKey: saveToLocalStorageKey
}
