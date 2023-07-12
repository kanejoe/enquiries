import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function IsApplicableSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="heading-applicable-mode">
        Is this Requisition Applicable?
      </Label>
      <Switch id="heading-applicable-mode" />
    </div>
  )
}
