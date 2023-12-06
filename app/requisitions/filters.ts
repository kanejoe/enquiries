import { Precedent } from "@/types/RequisitionType"

export type FilterOptions = {
  filterType: "all" | "active" | "createdBy"
  createdBy?: string
}

export function filterPrecedents(
  items: Precedent[],
  options: FilterOptions
): Precedent[] {
  return items.filter((item) => {
    if (options.filterType === "all") {
      return true
    }

    if (options.filterType === "active" && item.is_archived) {
      return false
    }

    if (
      options.filterType === "createdBy" &&
      item.created_by !== options.createdBy
    ) {
      return false
    }

    return true
  })
}
