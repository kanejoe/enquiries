import { useFormContext } from "react-hook-form"

import { Requisition } from "@/types/RequisitionType"
import { Badge } from "@/components/ui/badge"
import {
  Form,
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
  selectedNode: Requisition | null
  sequence_array: string[]
}

const SequenceSelect: React.FC<SequenceSelectProps> = ({
  selectedNode,
  sequence_array,
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sequence" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedNode?.siblings
                  ?.sort((a, b) => a - b)
                  .map((sibling: any, idx: number) => {
                    return (
                      <SelectItem value={sibling.toString()} key={idx}>
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
        {sequence_array.join(".")}
        {/* Assuming the sequence_array is a string array and you want it in 'x.x.x' format */}
      </Badge>
    </div>
  )
}

export { SequenceSelect }
