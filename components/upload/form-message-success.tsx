import { LightningBoltIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function FormMessageSuccess({ message }: { message: string }) {
  return (
    <Alert className="bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <LightningBoltIcon className="mr-8 mt-0.5 size-5" />
      <AlertTitle className="text-lg font-semibold">Save Successful</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export { FormMessageSuccess }
