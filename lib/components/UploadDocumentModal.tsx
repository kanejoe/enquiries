import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { Modal } from "./ui/Modal"

type UploadDocumentModalProps = {}

const UploadDocumentModal = ({}: UploadDocumentModalProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="">
      <button
        className="rounded border bg-red-500 p-4"
        onClick={() => setOpen(true)}
      >
        click
        <AiOutlineLoading3Quarters className="animate-spin self-center text-2xl md:text-3xl" />
      </button>
      <Modal open={open} onOpenChange={setOpen} title="Upload Document">
        <div className="">something in the modal</div>
      </Modal>
    </div>
  )
}

export { UploadDocumentModal }
