import { useFormContext } from "react-hook-form"

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
  sequence: string
  sequence_in_levels: number[] // this is an array of the level which the sequence finds itself in the tree e.g. [1, 2, 1]
  siblings: string[]
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Order</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={sequence}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sequence" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {siblings
                  ?.sort((a, b) => Number(a) - Number(b))
                  .map((sibling: any, idx: number) => {
                    return (
                      <SelectItem value={sibling} key={idx}>
                        {sibling}
                      </SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Badge
        variant="secondary"
        className="mb-0.5 h-8 self-end rounded text-base"
      >
        {transformSequenceArray(sequence_in_levels?.map((v) => Number(v)))}
        {/* Assuming the sequence_array is a string array and you want it in 'x.x.x' format */}
      </Badge>
    </div>
  )
}

export { SequenceSelect }
