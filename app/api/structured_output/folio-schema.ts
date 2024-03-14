import * as z from "zod"

export const folio_schema = z.object({
  folio: z.object({
    folio_number: z
      .string()
      .describe("The folio number of the property. For example, 12345F."),
    folio_county: z
      .string()
      .describe("The county of the property. For example, Dublin."),
  }),
  /*charges: z
    .array(
      z.object({
        charge_number: z
          .string()
          .describe(
            "the charge number, which is a number in the form 001 or 1 in the left column"
          ),
        full_details: z.string().describe("full details of the charge"),
        charge_registered_owner: z
          .string()
          .describe("registered owner of the charge"),
        charge_registered_date: z.string().describe("date of the charge"),
        dealing_number: z
          .string()
          .describe(
            "dealing number, which can be in the form LR 2683, or D2003DN022169P for example"
          ),
        charge_cancelled: z
          .boolean()
          .describe(
            "whether the charge is cancelled or not. If cancelled, it should say 'cancelled' under the name"
          ),
        charge_cancelled_details: z
          .string()
          .describe(
            "if the charge has been cancelled, give the dealing number of the cancellation"
          ),
        charge_cancelled_date: z
          .string()
          .describe(
            "if the charge has been cancelled, give the date of the cancellation in the form DD/MM/YYYY"
          ),
      })
    )
    .describe(
      "Give a list of the charges on page 3 of the document. Start at 001 or 1 and go to the end.  List the charge number in each case. Charges will only follow the heading 'Part 3 - Burdens and Notices of Burdens' and will be in the form of a table. If there are no charges, say 'no charges' under the name"
    ),
  registered_owner: z
    .array(
      z.object({
        owner_name: z
          .array(z.string().describe("the name of each owner if joint owners"))
          .describe("registered owner name or names"),
        owner_address: z
          .string()
          .describe("registered owner address or addresses"),
        ownership_cancelled: z
          .boolean()
          .describe(
            "whether the ownership is cancelled or not. If cancelled, it should say 'Cancelled' usually with a date after or under the name and details of ownership on 'Part 2 - Ownership', if and only if it states 'cancelled', then reply true, otherwise false."
          ),
        ownership_share: z
          .string()
          .describe(
            "The share of ownership, for example tenant-in-common of 6317 undivided 1/100000 share(s) or as joint tenants."
          ),
      })
    )
    .describe(
      "List the registered owner(s) and their details under 'Part 2 - Ownership'. Each entry should be a separate object. Each owner should have a number beside their name, starting at 001 or 1 which indicates their chain in the title."
    ),
  property_address: z
    .string()
    .describe(
      "The address of the property. It should be at Part 1(A) - The Property and is a single string."
    ),
  property_eircode: z
    .string()
    .describe(
      "The Eircode of the property. If it is not available, leave blank. It should be at Part 1(A) - The Property and if it exists will be in the form 'D08 C6T2'."
    ),
  tenure: z
    .string()
    .describe(
      "The tenure of the property. For example, freehold. If the folio number ends with 'F' it is freehold, if it ends with 'L' it is leasehold.  If no letter at the end it is freehold"
    ),
  leasehold: z
    .object({
      lease_start_date: z.string().describe("The start date of the lease"),
      lease_end_date: z
        .string()
        .describe(
          "The end date of the lease, which is the term of the lease added to the start date of the lease."
        ),
      lease_term: z.string().describe("The term of the lease"),
      lease_rent: z.string().describe("The rent of the lease"),
      lease_rent_review: z.string().describe("The rent review of the lease"),
      lease_covenants: z.string().describe("The covenants of the lease"),
      lease_remaining_period: z
        .string()
        .describe(
          `The remaining term of the lease. Find the number of years between the lease end year and today's year, which is ${new Date().getFullYear}. If the lease end year is in the past, say 'expired'`
        ),
      lease_parties: z
        .array(z.string().describe("the name of each party to the lease"))
        .describe("The parties to the lease"),
    })
    .describe(
      "If the property is leasehold, give the details of the lease. If not leasehold, leave blank"
    ),*/
})
