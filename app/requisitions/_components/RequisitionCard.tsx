"use client"

import Link from "next/link"
import { Pencil1Icon } from "@radix-ui/react-icons"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface RequisitionCardProps {
  data: Requisition
}

const RequisitionCard: React.FC<RequisitionCardProps> = ({ data }) => {
  return (
    <Card
      className={cn(
        "mb-6 w-[480px] border-muted shadow-sm hover:border-primary",
        {
          "border-primary uppercase": data.level === 1,
        }
      )}
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
            <div className="whitespace-pre-line">{data.query}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <div>
          <Button variant="outline" size="xs" asChild>
            <Link href={`/requisitions/create/form/${data.id}`}>
              <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { RequisitionCard }
