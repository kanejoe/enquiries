import { LightningBoltIcon } from "@radix-ui/react-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function FormMessageSuccess({ message }: { message: string }) {
  return (
    <Alert>
      <LightningBoltIcon className="size-5" />
      <AlertTitle>Save Successful</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export { FormMessageSuccess }
