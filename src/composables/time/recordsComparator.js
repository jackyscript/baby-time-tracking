export function useRecordsComparator(records) {
  const sortedEntries = Object.entries(records.value).sort(recordsComparator())
  const sortedRecords = Object.fromEntries(sortedEntries)
  return sortedRecords
}

function recordsComparator() {
  return (recordBefore, recordAfter) => {
    const attributesBefore = recordBefore[1]
    const attributesAfter = recordAfter[1]
    const recordBeforeDate = parseRecordDateValue(attributesBefore)
    const recordAfterDate = parseRecordDateValue(attributesAfter)
    return recordBeforeDate < recordAfterDate
  }
}

function parseRecordDateValue(recordAttributes) {
  return Date.parse(recordAttributes['entryDate'].entryValue)
}
