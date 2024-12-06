const saveToLocalStorageKey = 'savedRecords'

const StorageConstants = {
  recordsStorageKey: saveToLocalStorageKey
}

export function savedRecordsExist() {
  return getRecordsFromLocalStorage() !== null
}

function getRecordsFromLocalStorage() {
  return JSON.parse(localStorage.getItem(StorageConstants.recordsStorageKey))
}

export function getSavedRecords() {
  return savedRecordsExist() ? getRecordsFromLocalStorage() : {}
}

export function storeRecords(records) {
  localStorage.setItem(StorageConstants.recordsStorageKey, JSON.stringify(records))
}

export function removeRecords() {
  localStorage.removeItem(StorageConstants.recordsStorageKey)
}
