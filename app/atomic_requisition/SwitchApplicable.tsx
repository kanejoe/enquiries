import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function IsApplicableSwitch() {
  return (
    <div className="flex flex-row-reverse items-center space-x-2 lg:flex-row">
      <Label htmlFor="heading-applicable-mode" className="ml-2">
        Is this Requisition Applicable?
      </Label>
      <Switch id="heading-applicable-mode" className="" />
    </div>
  )
}
