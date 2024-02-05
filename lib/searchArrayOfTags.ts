import { type Tables } from "@/lib/database.types"

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
