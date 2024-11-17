import { computed } from 'vue'

export function useRecordsValidator(records) {
  return computed(isEmpty(records))
}
function isEmpty(records) {
  return () => Object.keys(records.value).length == 0
}
