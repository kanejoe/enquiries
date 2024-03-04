"use client"

import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const contents = [
  {
    id: "toc001",
    url: "files",
    description: "files",
  },
  {
    id: "toc002",
    url: "chat",
    description: "chat",
  },
  {
    id: "toc003",
    url: "tags",
    description: "tags",
  },
  {
    id: "toc004",
    url: "query",
    description: "query",
  },
  {
    id: "toc005",
    url: "upload",
    description: "upload",
  },
]

export function TOC() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[320px]">Description</TableHead>
          <TableHead>url</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell>
              <Link href={`rag/${item.url}`}>{item.url}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
