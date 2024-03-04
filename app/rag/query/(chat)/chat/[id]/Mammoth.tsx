import { SetStateAction, useEffect, useState } from "react"
import mammoth from "mammoth/mammoth.browser"

function DocxParser({ file }: { file: File }) {
  const [htmlContent, setHtmlContent] = useState("")
  const [textContent, setTextContent] = useState("")

  useEffect(() => {
    if (!file) return // Exit if no file is provided

    console.time("File Processing Time")
    const reader = new FileReader()
    reader.onloadend = function (event) {
      const arrayBuffer = reader.result

      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function (resultObject: { value: SetStateAction<string> }) {
          setHtmlContent(resultObject.value)
          // console.log(resultObject.value)
        })

      mammoth
        .extractRawText({ arrayBuffer: arrayBuffer })
        .then(function (resultObject: { value: SetStateAction<string> }) {
          setTextContent(resultObject.value)
          console.log(resultObject.value)
        })

      console.timeEnd("File Processing Time")
    }
    reader.readAsArrayBuffer(file)
  }, [file]) // This ensures the effect runs only when the file prop changes

  return (
    <div>
      <div className="max-h-[20em] overflow-y-auto rounded border p-8 shadow-md">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      {/* <div>
        <h2>Text Content</h2>
        <pre>{textContent}</pre>
      </div> */}
    </div>
  )
}

export { DocxParser }
