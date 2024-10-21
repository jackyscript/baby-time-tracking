import { computed, ref } from 'vue'

export function useRecordsFilter(timeRecords) {
  const noFilterValue = 'all'
  const todayFilterValue = 'today'
  const monthFilterValue = 'month'

  const entriesFilter = ref(noFilterValue)

  const filterRecords = function (filterCriterion) {
    const entries = {}
    Object.entries(timeRecords)
      .filter((record) => {
        const attributes = record[1]
        const entryDate = new Date(attributes.entryDate.entryValue)
        const today = new Date()
        return filterCriterion(entryDate, today)
      })
      .forEach((filteredEntry) => {
        const id = filteredEntry[0]
        const attributes = filteredEntry[1]
        entries[id] = attributes
      })
    return entries
  }

  const todaysRecords = computed(() => {
    return filterRecords(
      (entryDate, todayDate) => entryDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)
    )
  })

  const monthsRecords = computed(() => {
    return filterRecords(
      (entryDate, todayDate) =>
        entryDate.getMonth() === todayDate.getMonth() &&
        entryDate.getFullYear() === todayDate.getFullYear()
    )
  })

  const resultEntries = computed(() => {
    if (entriesFilter.value === todayFilterValue) {
      return todaysRecords.value
    } else if (entriesFilter.value === monthFilterValue) {
      return monthsRecords.value
    }
    return timeRecords
  })

  return { resultEntries, entriesFilter }
}
