import { useFormContext } from "react-hook-form"

import { EnhancedRequisition } from "@/types/RequisitionType"
import { replaceValueAtLevel, transformSequenceArray } from "@/lib/tree"
import { getSequenceString } from "@/lib/treeUtils"
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
  level: EnhancedRequisition["level"]
  sequence_in_levels: EnhancedRequisition["sequence_in_levels"]
  siblings: EnhancedRequisition["siblings"]
}

const SequenceSelect: React.FC<SequenceSelectProps> = ({
  level,
  sequence_in_levels,
  siblings,
}) => {
  const { control, watch } = useFormContext()
  const sequenceValue = watch("sequence") // watch the 'query' field
  let updatedSequence = sequence_in_levels

  if (sequenceValue !== undefined && level !== undefined) {
    updatedSequence = replaceValueAtLevel(
      sequence_in_levels,
      level,
      Number(sequenceValue)
    )
  }

  return (
    <div className="flex space-x-4">
      <FormField
        control={control}
        name="sequence"
        render={({ field }) => {
          // const uniqueSiblings = [...new Set(siblings)]
          const uniqueSiblings = createSequence(siblings)
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
                  {uniqueSiblings
                    ?.sort((a, b) => Number(a) - Number(b))
                    .map((sibling: number, idx: number) => {
                      return (
                        <SelectItem value={sibling.toString()} key={idx}>
                          {getSequenceString(sibling, level)}
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
          {transformSequenceArray(updatedSequence)}
          {/* Assuming the sequence_array is a string array and you want it in 'x.x.x' format */}
        </Badge>
      ) : null}
    </div>
  )
}

export { SequenceSelect }

// Helper function to create an array of numbers from an array of numbers
// if there are duplicates, will re-sequence depending on length of array
function createSequence(inputArray: number[]): number[] {
  // The output array will start at 1 and increment by 1 for each element in the input array
  return inputArray.map((_, index) => index + 1)
}
