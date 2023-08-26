import { UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { FormData } from "./formTypes"
import { ResizableTextarea } from "./ResizeableTextarea" // Update the path accordingly

interface QueryFieldProps {
  form: UseFormReturn<FormData>
}

const QueryField: React.FC<QueryFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="query"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Query</FormLabel>
          <FormControl>
            <ResizableTextarea
              field={field}
              placeholder="type in the query..."
              className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { QueryField }
