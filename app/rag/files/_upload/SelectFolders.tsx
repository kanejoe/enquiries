import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { buildFolderPath } from "@/lib/buildFolderPath"
import { useFolders } from "@/lib/hooks/useFolders"
import { cn } from "@/lib/utils"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/Spinner"

interface SelectFoldersProps {
  file_ext: string
}

const SelectFolders: FC<SelectFoldersProps> = ({ file_ext = "pdf" }) => {
  const methods = useFormContext()
  const {
    data: folders,
    error: foldersError,
    isPending: foldersPending,
  } = useFolders()

  const builtFolders = buildFolderPath(folders || [])

  if (foldersPending)
    return (
      <div>
        <Spinner className="size-5" />
      </div>
    )

  return (
    <FormField
      control={methods.control}
      name="folder_id"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className={cn(
                "w-full",
                file_ext === "pdf" && "border-red-500 bg-red-50",
                (file_ext === "doc" || file_ext === "docx") &&
                  "border-sky-500 bg-sky-50"
              )}
            >
              <SelectValue placeholder="Select a Folder..." />
            </SelectTrigger>
            <SelectContent>
              {builtFolders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id.toString()}>
                  {folder.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  )
}

export { SelectFolders }
