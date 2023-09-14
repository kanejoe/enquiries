"use client"

import { useCallback, type ChangeEvent } from "react"

import { useCompletion } from "./use-completion"

function FormUpload() {
  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/folio",
  })

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return
      } else {
        const formData = new FormData()
        const pdf = e.target.files[0]

        if (pdf) {
          // Check if pdf is not undefined
          formData.append("folio", pdf)
          //   complete("folio", { body: formData })
          complete("folio")
        } else {
          console.log("No file selected!")
        }

        // file && setUrl(URL.createObjectURL(file))
      }
    },
    [complete]
  )

  return (
    <div className="flex flex-col space-y-12">
      <label htmlFor="" className="">
        <input
          type="file"
          className="duration-250 block w-full text-sm text-slate-500 transition
        ease-in-out file:mr-4 file:cursor-pointer
        file:rounded-full file:border-0
                            file:bg-primary file:to-slate-100 file:px-4
                            file:py-2 file:text-sm
                            file:font-semibold hover:file:bg-primary/75"
          disabled={isLoading}
          style={{ opacity: isLoading ? "0.5" : "1" }}
          onChange={handleInputChange}
        />
      </label>
      {completion ? (
        <div className="my-6 whitespace-pre-wrap">{completion}</div>
      ) : null}
    </div>
  )
}

export { FormUpload }
