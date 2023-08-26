// toastHelpers.tsx

import { toast } from "@/components/ui/use-toast"

export const showErrorToast = (errors: any) => {
  toast({
    title: "The following errors occurred:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white/80">{JSON.stringify(errors, null, 2)}</code>
      </pre>
    ),
  })
}

export const showSuccessToast = (data: any) => {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white/80">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
