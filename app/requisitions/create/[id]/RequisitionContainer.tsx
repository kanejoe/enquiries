"use client"

import { useState } from "react"
import { Button, Callout } from "@radix-ui/themes"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { cn } from "@/lib/utils"

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
    <div>
      {isEditing ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // You can dispatch an action here or make an API call to save the edited query
              setIsEditing(false)
            }}
          >
            <input
              type="text"
              value={editedQuery || ""}
              onChange={(e) => setEditedQuery(e.target.value)}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-4 flex flex-col gap-y-2">
          <Callout.Root variant="outline">
            <Callout.Text>
              {transformSequenceArray(data.sequence_array)} {data.query}
            </Callout.Text>
          </Callout.Root>
          <p className="">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </p>
        </div>
      )}
    </div>
  )
}

export { RequisitionContainer }
