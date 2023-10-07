"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { PropertyFormActions } from "./PropertyFormActions"

export const shape = {
  //   client: z.string().min(2, {
  //     message: "Client name must be at least 2 characters.",
  //   }),
  property: z.string().min(3, {
    message: "Property must be at least 3 characters.",
  }),
}
export const formSchema = z.object(shape)

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //   client: "",
      property: "",
    },
  })

  // 2. Define a submit handler.
  async function formAction() {
    const result = formSchema.safeParse(form.getValues())
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (result.success) {
      try {
        await PropertyFormActions(result.data)
        // showSuccessToast(result.data)
        // router.push(`/requisitions/create#card-${result.data.id}`)
      } catch (error: unknown) {
        console.log(
          "🚀 ~ file: NewPropertyForm.tsx:49 ~ formAction ~ error:",
          error
        )
      }
    }
  }

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
        className="space-y-8"
        // style={{ formSizing: "normal" }}
      >
        <FormField
          control={form.control}
          name="property"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  )
}

function SubmitButton({ pending }: { pending?: boolean }) {
  return (
    <Button type="submit" aria-disabled={pending}>
      Submit
    </Button>
  )
}
