import { useFormContext } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

/**
 *
 * @returns
 */

export function IsReplyRequired() {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="is_required"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Is a Reply Required for this Requisition</FormLabel>
            <FormDescription>
              If not, this may be a heading only.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}
