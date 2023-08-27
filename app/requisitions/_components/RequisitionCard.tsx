"use client"

import Link from "next/link"
import { ArrowBottomRightIcon, Pencil1Icon } from "@radix-ui/react-icons"

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
    <div className="flex w-full flex-row">
      {data.level ? <SectionSpacer level={data?.level} /> : null}
      <div className="flex-grow">
        <Card
          className={cn("mb-6 border-muted shadow-sm hover:border-primary", {
            "border-primary": data.level === 1,
          })}
        >
          <CardHeader>
            <CardTitle
              className={cn("text-base font-normal", {
                "text-4xl font-bold uppercase": data.level === 1,
              })}
            >
              <div className="flex">
                <div className="w-[72px] shrink-0 font-semibold tabular-nums">
                  {transformSequenceArray(data.sequence_array)}
                </div>
                <div className="whitespace-pre-line">{data.query}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-row space-x-4">
              <Button variant="outline" size="xs" asChild>
                <Link href={`/requisitions/create/form/${data.id}`}>
                  <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="secondary" size="xs" asChild>
                <Link href={`/requisitions/create/form/?pid=${data.id}`}>
                  <ArrowBottomRightIcon className="mr-2 h-4 w-4" /> Add Child
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export { RequisitionCard }

function SectionSpacer({ level }: { level: number }) {
  console.log(
    "🚀 ~ file: RequisitionCard.tsx:64 ~ SectionSpacer ~ level:",
    level
  )
  return (
    <div
      className={cn({
        "shrink-0": true,
        "": level === 1,
        "w-[36px]": level === 2,
        "w-[72px]": level === 3,
        "w-[108px]": level === 4,
      })}
    >
      {" "}
      &nbsp;{" "}
    </div>
  )
}
