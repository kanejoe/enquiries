import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"

import PropertiesPage from "@/app/page"

it("renders the properties page", () => {
  render(<PropertiesPage />)

  expect(screen.getByText("Enquiries Home Page")).toBeInTheDocument()
})
