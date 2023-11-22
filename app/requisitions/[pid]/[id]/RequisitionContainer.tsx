"use client"

import { useState } from "react"
import { Pencil1Icon } from "@radix-ui/react-icons"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface RequisitionContainerProps {
  data: Requisition
}

const RequisitionContainer: React.FC<RequisitionContainerProps> = ({
  data,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedQuery, setEditedQuery] = useState<string | null>(
    data.query || ""
  )

  return (
    <Card
      className={cn("mb-6 w-[380px] border-muted shadow-sm", {
        "border-primary uppercase": data.level === 1,
      })}
    >
      <CardHeader>
        <CardTitle
          className={cn("text-base font-normal", {
            "text-4xl font-bold": data.level === 1,
          })}
        >
          <div className="flex">
            <div className="min-w-[48px] shrink-0 tabular-nums">
              {transformSequenceArray(data.sequence_array)}
            </div>
            <div className="">{data.query}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div>
          <Button variant="outline" size="xs">
            <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { RequisitionContainer }
