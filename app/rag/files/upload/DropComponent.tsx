import { FC } from "react"

import { getUploadedFilesData } from "@/lib/hooks/useStorageFiles"

import { FileUpload } from "./FileUpload"

interface DropComponentProps {}

const DropComponent: FC<DropComponentProps> = (props) => {
  return (
    <div className="grid h-full grid-rows-2 gap-4 rounded-lg border-[1.5px] border-slate-100">
      <div className="">
        <FileUpload />
      </div>
      <div className="mx-8 mb-8">
        <Dropzone />
      </div>
    </div>
  )
}

export { DropComponent }

export function Dropzone() {
  const data = getUploadedFilesData()

  return (
    <div className="flex max-w-72 items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[2px] border-dashed border-primary bg-primary/5 hover:bg-primary/10"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-base text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or{" "}
            <span className="font-semibold">drag and drop</span>
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            PDF or DOCX
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  )
}
