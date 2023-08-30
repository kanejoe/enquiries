"use client"

import Link from "next/link"
import {
  ArrowBottomRightIcon,
  ArrowRightIcon,
  CheckIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface RequisitionCardProps {
  data: Requisition
}

const RequisitionCard: React.FC<RequisitionCardProps> = ({ data }) => {
  const arrayOfChildren = generateArrayofChildren(data?.children?.length)
  const addToSiblings = [...data.siblings, data.siblings.length + 1]
  // const { hasPreviousSibling, hasNextSibling } = getSiblingsInfo(data)

  return (
    <div className="flex w-full flex-row" id={`card-${data.id}`}>
      {data.level ? <SectionSpacer level={data?.level} /> : null}
      <div className="relative flex-grow">
        {/* Put in the tree lines component below */}

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
                  {transformSequenceArray(data.sequence_in_levels)}
                </div>
                {data.level === 1 ? <div className="">{data.query}</div> : null}
              </div>
            </CardTitle>
            {data.level === 1 ? null : (
              <CardDescription className="whitespace-pre-line font-albertsans text-secondary-foreground">
                {data.query ? (
                  <div className="text-sml">{data.query}</div>
                ) : (
                  <Badge variant="default" className="rounded">
                    Deliberately Left Blank
                  </Badge>
                )}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="grid gap-4 font-albertsans">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <CheckIcon className="h-6 w-6 text-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Reply Required?
                </p>
                <p className="text-sm text-muted-foreground">
                  Yes, reply is required.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-row space-x-4">
              <Button variant="secondary" size="xs" asChild>
                <Link
                  href={`/requisitions/create/form/${data.id}`}
                  scroll={false}
                >
                  <Pencil1Icon className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>

              {/* this button links to the form page to create a new requistion */}
              {/* it sends the parent_id, a default sequence of 1 and an array created from the no. of children + 1 */}
              <Button variant="ghost" size="xs" asChild>
                <Link
                  href={`/requisitions/create/form/?pid=${data.id}&sequence=1&siblings=${arrayOfChildren}`}
                >
                  <ArrowBottomRightIcon className="mr-2 h-4 w-4" /> Add Child
                </Link>
              </Button>

              {/* this button links to the form page to create a new requistion */}
              {/* it sends the parent_id, the current sequence + 1 and an array created from the current siblings + 1 */}
              <Button
                variant="ghost"
                size="xs"
                asChild
                className="text-secondary-foreground"
              >
                <Link
                  href={`/requisitions/create/form/?pid=${data.id}&sequence=${
                    Number(data.sequence) + 1
                  }&siblings=${addToSiblings}`}
                  scroll={false}
                >
                  <ArrowRightIcon className="mr-2 h-4 w-4" /> Add Sibling
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
      &nbsp;
    </div>
  )
}

function generateArrayofChildren(n?: number): number[] {
  // If n is undefined or not provided, set it to 0
  if (n === undefined) {
    n = 0
  }

  let result: number[] = []
  for (let i = 1; i <= n + 1; i++) {
    result.push(i)
  }
  return result
}

/**
 *
 * @param data
 * @returns
 */
function getSiblingsInfo(data: Requisition): {
  hasPreviousSibling: boolean
  hasNextSibling: boolean
} {
  // Default values
  let hasPreviousSibling = false
  let hasNextSibling = false

  if (data.siblings) {
    hasPreviousSibling = data.siblings.some(
      (siblingSequence) => siblingSequence < data.sequence
    )
    hasNextSibling = data.siblings.some(
      (siblingSequence) => siblingSequence > data.sequence
    )
  }

  return { hasPreviousSibling, hasNextSibling }
}

interface TreeLinesProps {
  data: {
    level?: number
  }
  hasPreviousSibling: boolean
  hasNextSibling: boolean
}

const TreeLines: React.FC<TreeLinesProps> = ({
  data,
  hasPreviousSibling,
  hasNextSibling,
}) => (
  <>
    {hasPreviousSibling && (
      <div
        className={cn("absolute -left-6 top-1/2 h-0.5 w-6", {
          "bg-primary": data?.level && data?.level >= 2,
        })}
      ></div>
    )}

    {hasNextSibling && (
      <div
        className={cn("absolute -left-6 bottom-0 h-1/2 w-0.5", {
          "bg-primary": data?.level && data?.level >= 2,
        })}
      ></div>
    )}

    {hasPreviousSibling && (
      <div
        className={cn("absolute -left-6 top-0 h-1/2 w-0.5", {
          "bg-primary": data?.level && data?.level >= 2,
        })}
      ></div>
    )}

    <div
      className={cn("absolute -left-6 top-1/2 h-0.5 w-6", {
        "bg-primary": data?.level && data?.level >= 2,
        "-left-[60px] w-[60px] bg-secondary": data?.level === 4,
      })}
    ></div>

    <div
      className={cn("absolute -left-[60px] bottom-0 h-full w-0.5", {
        "bg-secondary": data?.level && data?.level === 4,
      })}
    ></div>
  </>
)
