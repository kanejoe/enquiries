import { Cross2Icon } from "@radix-ui/react-icons"

import { getFileExtension, getIconForFileType } from "@/lib/fileIcons"
import { cn, convertFileSize } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ExtendedFile = File & { preview: string }

export function PdfOrDocFileComponent({
  file,
  removeAll,
}: {
  file: ExtendedFile
  removeAll: () => void
}) {
  return (
    <div
      className={cn(
        `h-64 w-full rounded-xl border border-dotted p-2 text-center`,
        getFileExtension(file.name) === "pdf" &&
          "border-red-400 bg-red-50 shadow-red-400",
        (getFileExtension(file.name) === "doc" ||
          getFileExtension(file.name) === "docx") &&
          "border-sky-200 bg-sky-50 shadow-sky-400"
      )}
    >
      <div className="relative flex h-full flex-col items-center justify-center gap-y-4">
        <Button
          className={cn(
            `border shadow-sm absolute right-2 top-2 rounded-full transition`,
            getFileExtension(file.name) === "pdf" &&
              "border-red-400 bg-red-50 shadow-red-400 hover:bg-red-100",
            (getFileExtension(file.name) === "doc" ||
              getFileExtension(file.name) === "docx") &&
              "border-sky-200 bg-sky-50 shadow-sky-400 hover:bg-sky-100"
          )}
          variant="ghost"
          size="sm"
          onClick={removeAll}
        >
          <Cross2Icon />
        </Button>
        <div className="">{file && getIconForFileType(file.name, 8)}</div>

        <div className="max-w-48 truncate text-balance font-geistsans text-sm font-semibold text-red-800">
          {file && file.name}
        </div>

        <div className="text-sm text-gray-500">
          {file && convertFileSize(file.size)}
        </div>
      </div>
    </div>
  )
}
