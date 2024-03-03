import { type Tables } from "@/lib/types/database.types"

type TTags = Tables<"tags">
type TMinimalTag = Pick<TTags, "id" | "tag_name">

/**
 * Finds records in the dbData array based on the provided tag names in the dataArray.
 * Returns an array of minimal tag information.
 *
 * @param dataArray - An array of tag names to search for.
 * @param dbData - An array of tag records to search in.
 * @returns An array of minimal tag information.
 */
export function findRecordsByTagName(
  dataArray: string[],
  dbData: TTags[]
): TMinimalTag[] {
  return dataArray.reduce((acc: TMinimalTag[], tagName: string) => {
    const foundRecord = dbData.find(
      (dbRecord) => dbRecord.tag_name.toLowerCase() === tagName.toLowerCase()
    )
    if (foundRecord)
      acc.push({ id: foundRecord.id, tag_name: foundRecord.tag_name }) // Return minimal record information
    return acc
  }, [])
}

/**
 * Filters out tag names from dataArray that are found in dbData.
 *
 * @param dataArray - An array of tag names to filter.
 * @param dbData - An array of tag records to filter against.
 * @returns An array of tag names not found in dbData.
 */
export function filterOutFoundTags(
  dataArray: string[],
  dbData: TTags[]
): string[] {
  // Create a lowercase copy of dbData tag_names for case-insensitive comparison
  const dbTagNamesLowercase = dbData.map((dbRecord) =>
    dbRecord.tag_name.toLowerCase()
  )

  // Filter dataArray to keep only those items not found in dbData
  // This inherently returns all tags from dataArray if none are found in dbData
  const notFoundRecords = dataArray.filter(
    (tagName) => !dbTagNamesLowercase.includes(tagName.toLowerCase())
  )

  // Explicit handling to return all tags if none are found is not necessary here,
  // as the filter condition naturally covers this scenario by including all items from dataArray
  // if none match the conditions for exclusion.

  return notFoundRecords
}
