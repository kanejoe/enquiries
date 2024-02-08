import { TDocument, TTags } from "@/lib/hooks/useTags"

import { PotentialTag } from "../../tags/PotentialTag"

type BadgeRendererProps = {
  text: string
  documentId: TDocument["id"]
  currentTags: TTags[]
}

const BadgeRenderer: React.FC<BadgeRendererProps> = ({
  text,
  documentId,
  currentTags,
}) => {
  // Splitting the text by semicolon and filtering out empty strings
  const aiTags = text.split(";").filter((item) => item.trim())
  const potentialTags = filterAiTagNames(currentTags, aiTags)

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-3">
      {potentialTags.map((item, index) => (
        <PotentialTag key={index} tag_name={item} documentId={documentId} />
      ))}
    </div>
  )
}

export { BadgeRenderer }

/**
 * Filters the given array of AI tag names based on the existing tag names in the tagObjects array.
 *
 * @param tagObjects - An array of tag objects.
 * @param aiTagNames - An array of AI tag names to filter.
 * @returns An array of filtered AI tag names.
 */
function filterAiTagNames(tagObjects: TTags[], aiTagNames: string[]): string[] {
  // Collect all tag_names from tagObjects
  const existingTagNames = tagObjects.map((tagObject) => tagObject.tag_name)

  // Filter aiTagNames to exclude those that exist in tagObjects
  return aiTagNames
    .filter((tagName) => !existingTagNames.includes(tagName.trim()))
    .map((tagName) => tagName.trim())
}
