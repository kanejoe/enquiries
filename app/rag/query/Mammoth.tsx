import React, { useState } from "react"
import mammoth from "mammoth/mammoth.browser"

function DocxParser() {
  const [htmlContent, setHtmlContent] = useState("")
  const [textContent, setTextContent] = useState("")
  const [markdownContent, setMarkdownContent] = useState("")

  const parseWordDocxFile = (event) => {
    const inputElement = event.target
    const files = inputElement.files || []
    if (!files.length) return
    const file = files[0]

    console.time("File Processing Time")
    const reader = new FileReader()
    reader.onloadend = function (event) {
      const arrayBuffer = reader.result

      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function (resultObject) {
          setHtmlContent(resultObject.value)
          console.log(resultObject.value)
        })

      mammoth
        .extractRawText({ arrayBuffer: arrayBuffer })
        .then(function (resultObject) {
          setTextContent(resultObject.value)
          console.log(resultObject.value)
        })

      console.timeEnd("File Processing Time")
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div>
      <input type="file" onChange={parseWordDocxFile} />
      <div>
        <h2>HTML Content</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <div>
        <h2>Text Content</h2>
        <pre>{textContent}</pre>
      </div>
    </div>
  )
}

export default DocxParser
