import { FC } from "react"
import Link from "next/link"
import { FileText, TagsIcon } from "lucide-react"

import { TTags, useFetchDocumentsByTagName } from "@/lib/hooks/useTags"

import { HeaderTag } from "./HeaderTag"

interface TagsTableProps {
  tags: TTags[]
  tagName: string
}

const TagsTable: FC<TagsTableProps> = ({ tags, tagName }) => {
  const { data: documents } = useFetchDocumentsByTagName(tagName)

  return (
    <div className="inline-block min-w-full pb-2 pl-6 align-middle">
      <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                <span className="flex">
                  <TagsIcon className="mr-4 size-5" />
                  {tagName ? (
                    <>
                      <HeaderTag tag_name={tagName} />
                    </>
                  ) : (
                    "Tags"
                  )}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {documents && documents.length
              ? documents.map((data) => (
                  <tr
                    key={data.id}
                    className="delay-50 transition hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900">
                      <span className="flex">
                        <FileText className="mr-2 size-4 text-blue-800" />
                        <Link
                          href={`/rag/files/${data.id}`}
                          className="font-semibold text-blue-800 hover:text-blue-600"
                        >
                          {data.name}
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { TagsTable }
