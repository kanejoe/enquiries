"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"

import { useDocument } from "@/lib/hooks/useFolders"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {
  const { id } = useParams()
  const { data: document } = useDocument(id?.toString() || "")

  if (!document) return null
  return (
    <Suspense fallback={"loading..."}>
      <Card>
        <CardHeader>
          <CardTitle>Document</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{document?.name}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Suspense>
  )
}

export default Page
