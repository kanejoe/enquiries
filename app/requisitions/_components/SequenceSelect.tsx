import { useFormContext } from "react-hook-form"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { Badge } from "@/components/ui/badge"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SequenceSelectProps {
  sequence: Requisition["sequence"]
  sequence_in_levels: Requisition["sequence_in_levels"]
  siblings: Requisition["siblings"]
}

const SequenceSelect: React.FC<SequenceSelectProps> = ({
  sequence,
  sequence_in_levels,
  siblings,
}) => {
  const { control } = useFormContext()

  return (
    <div className="flex space-x-4">
      <FormField
        control={control}
        name="sequence"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Select Order</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sequence" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {siblings
                    ?.sort((a, b) => Number(a) - Number(b))
                    .map((sibling: number, idx: number) => {
                      return (
                        <SelectItem value={sibling.toString()} key={idx}>
                          {sibling.toString()}
                        </SelectItem>
                      )
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )
        }}
      />
      {sequence_in_levels ? (
        <Badge
          variant="secondary"
          className="mb-0.5 h-8 self-end rounded text-base"
        >
          {transformSequenceArray(sequence_in_levels?.map((v) => Number(v)))}
          {/* Assuming the sequence_array is a string array and you want it in 'x.x.x' format */}
        </Badge>
      ) : null}
    </div>
  )
}

export { SequenceSelect }
