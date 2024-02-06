import { memo, useMemo } from "react"
import { Viewer, Worker } from "@react-pdf-viewer/core"
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

// import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight'

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

const PdfViewer = memo(
  ({ signedUrl }: { signedUrl: string }) => {
    // const defaultLayoutPluginInstance = defaultLayoutPlugin()
    const defaultLayoutPluginInstance = useMemo(() => defaultLayoutPlugin(), [])

    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="h-[calc(90vh-50px)] w-full"
        >
          <Viewer fileUrl={signedUrl} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    )
  },
  (prevProps, nextProps) => {
    // This function is used to compare props and determine if the component should re-render.
    // In this case, it re-renders only if signedUrl changes.
    return prevProps.signedUrl === nextProps.signedUrl
  }
)

export { PdfViewer }
