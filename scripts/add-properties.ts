import { faker } from "@faker-js/faker"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://lzbkmmebsqyknmnnqoez.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6YmttbWVic3F5a25tbm5xb2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3MDEyMTAsImV4cCI6MjAwNzI3NzIxMH0.eyOAJboMgjKHh0tRQ1wLw88kUJF5WqP4YLFfE7k0zNg"
)

faker.seed(213)

async function main() {
  for (let i = 0; i < 223; i++) {
    let property =
      faker.location.buildingNumber() +
      ", " +
      faker.location.streetAddress() +
      ", " +
      faker.location.city()
    let vendor = faker.person.fullName()
    let eircode = faker.location.zipCode()

    // category
    const myArray = ["agricultural", "residential", "commercial"]
    let category = faker.string.fromCharacters(myArray)

    // status
    const statusArray = ["In Progress", "Completed", "Cancelled"]
    let status = faker.string.fromCharacters(statusArray)

    const { error } = await supabase
      .from("properties")
      .insert({ property, vendor, eircode, category, status })
      .select()
  }
}

main()
// run with: yarn ts-node scripts/add-properties.ts
