import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PropertiesPage() {
  const links = [
    {
      key: 0,
      folder: "requisitions",
      title: "Create Requisitions Template",
      summary:
        "Create a template for a requisition. This is a form with a number of fields.  Includes a tree view of the fields.",
      created: "October 2023",
    },
    {
      key: 1,
      folder: "properties",
      title: "Property Set Table",
      summary:
        "taken from BuildUI, this is a table of properties with a search bar and filters",
      created: "October 2023",
    },
    {
      key: 2,
      folder: "openai_function_example",
      title: "OpenAI Function",
      summary:
        "An example of an openai function set up using current location and weather. Does not benefit from streaming.",
      created: "17 October 2023",
    },
    {
      key: 3,
      folder: "summarise-folio",
      title: "Summarise a Folio",
      summary: "....",
      created: "1 October 2023",
    },
    {
      key: 4,
      folder: "chat-hn",
      title: "Chat with Hacker News",
      summary:
        "Chat with Hacker News using natural language. Built with OpenAI Functions and Vercel AI SDK.",
      created: "September 2023",
    },
    {
      key: 5,
      folder: "copilot-textarea",
      title: "Copilot-Textarea",
      summary: "https://docs.copilotkit.ai/getting-started/quickstart-textarea",
      created: "27 December 2023",
    },
    {
      key: 6,
      folder: "rag",
      title: "RAG",
      summary: "Retrieval Augmented Generation",
      created: "27 December 2023",
    },
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-6">
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Enquiries Home Page
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Development of Enquiries, a web application for managing enquiries
              and other AI applications
            </p>
          </div>
          <div className="my-6 flex gap-4">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="flex">
          <Table>
            {/* <TableCaption>App Links</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[160px]">Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links
                .sort((a, b) => {
                  if (a.key < b.key) {
                    return -1
                  }
                  if (a.key > b.key) {
                    return 1
                  }
                  return 0
                })
                .map((link) => (
                  <TableRow key={link.key}>
                    <TableCell className="min-w-[60px] font-medium">
                      {link.title}
                    </TableCell>
                    <TableCell className="">{link.summary}</TableCell>
                    <TableCell>{link.created}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={link.folder}
                        className="text-blue-700 hover:underline"
                      >
                        {link.folder}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
