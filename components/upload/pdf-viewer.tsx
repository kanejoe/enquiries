import { Viewer, Worker } from "@react-pdf-viewer/core"
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

import { cn } from "@/lib/utils"

// import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight'

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

/**
 * Renders a PDF viewer component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.signedUrl - The signed URL of the PDF file.
 * @param {string} [props.className] - The optional CSS class name for the component.
 * @returns {JSX.Element} The PDF viewer component.
 */
const PdfViewer = ({
    signedUrl,
    className,
}: {
    signedUrl: string
    className?: string
}): JSX.Element => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                // className="h-[calc(50vh-70px)] w-full"
                className={cn(`w-full`, className)}
            >
                <Viewer fileUrl={signedUrl} plugins={[defaultLayoutPluginInstance]} />
            </div>
        </Worker>
    )
}

export { PdfViewer }
