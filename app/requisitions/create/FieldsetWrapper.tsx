// @ts-expect-error
import { useFormStatus } from "react-dom"

export function FieldsetWrapper({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <fieldset disabled={pending} className="group space-y-4">
      {children}
    </fieldset>
  )
}
