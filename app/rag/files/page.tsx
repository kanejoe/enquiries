import { FC } from "react"

import { TreeViewWrapper } from "./_tree-view"
import { Dropzone } from "./_upload/Dropzone"

interface FilePageProps {}

const FilePage: FC<FilePageProps> = (props) => {
  return (
    <div className="grid h-128 grid-cols-12 gap-x-12">
      <div className="col-span-7">
        <TreeViewWrapper />
      </div>
      <div className="col-span-5">
        <Dropzone />
      </div>
    </div>
  )
}

export default FilePage
