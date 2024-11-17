import { computed } from 'vue'

export function useRecordsComparator(records) {
  return computed(() => {
    const sortedEntries = Object.entries(records.value).toSorted(recordsAscendingComparator)
    const sortedRecords = Object.fromEntries(sortedEntries)
    return sortedRecords
  })
}

const recordsAscendingComparator = (recordBefore, recordAfter) => {
  const attributesBefore = recordBefore[1]
  const attributesAfter = recordAfter[1]

  const recordBeforeDate = parseRecordDateValue(attributesBefore)
  const recordAfterDate = parseRecordDateValue(attributesAfter)

  return recordBeforeDate < recordAfterDate
}

function parseRecordDateValue(recordAttributes) {
  const recordDateValue = recordAttributes['entryDate'].entryValue
  const recordBeginTimeValue = recordAttributes['beginTime'].entryValue
  const dateTimeValue = `${recordDateValue}T${recordBeginTimeValue}` // Format: 2019-01-01T00:00:00

  if (recordBeginTimeValue) {
    return Date.parse(dateTimeValue)
  } else {
    return Date.parse(recordDateValue) // discard time if not defined
  }
}
