import { findParentIds } from "../findParentIds"

const data = [
  {
    folder_id: 1,
    folder_name: "Contract for Sale",
    parent_folder_id: null,
    children: [],
    documents: [
      {
        document_id: 2,
        document_name: "LPT interest.pdf",
        document_created_at: "2024-02-10T09:29:25.187893+00:00",
        storage_object_path:
          "266ea10d-15b6-487b-b052-45e1dd531809/LPT interest.pdf",
      },
      {
        document_id: 4,
        document_name:
          "Update to Practice Note - Insurance company bonds in relation to lost documents and defects on title.pdf",
        document_created_at: "2024-02-10T09:31:17.659896+00:00",
        storage_object_path:
          "482b960d-2c73-4224-a7a2-68bee8fd7d62/Update to Practice Note - Insurance company bonds in relation to lost documents and defects on title.pdf",
      },
      {
        document_id: 6,
        document_name:
          "Update to Practice Note - Insurance company bonds in relation to lost documents and defects on title.pdf",
        document_created_at: "2024-02-10T09:37:33.493401+00:00",
        storage_object_path:
          "684a778a-0d76-434e-a285-4125d371710d/Update to Practice Note - Insurance company bonds in relation to lost documents and defects on title.pdf",
      },
      {
        document_id: 8,
        document_name:
          "Chapter 34_ Registration of Vesting Certificates _ Registration of Deeds and Title in Ireland.pdf",
        document_created_at: "2024-02-10T13:57:43.952718+00:00",
        storage_object_path:
          "d8276a97-0921-4dd9-9d29-8326c3f0070a/Chapter 34_ Registration of Vesting Certificates _ Registration of Deeds and Title in Ireland.pdf",
      },
      {
        document_id: 10,
        document_name:
          "General Condition 32 and declarations re no development and no planning breaches.pdf",
        document_created_at: "2024-02-10T14:02:46.138774+00:00",
        storage_object_path:
          "2db512d8-471d-44f6-a140-cab6a9d01266/General Condition 32 and declarations re no development and no planning breaches.pdf",
      },
    ],
  },
  {
    folder_id: 2,
    folder_name: "Circuit Court",
    parent_folder_id: null,
    children: [
      {
        folder_id: 3,
        folder_name: "District Court",
        parent_folder_id: 2,
        children: [],
        documents: [
          {
            document_id: 12,
            document_name: "eCG50 process update.pdf",
            document_created_at: "2024-02-12T12:01:53.293521+00:00",
            storage_object_path:
              "3c97482a-067d-4f26-82d7-1ba5d3a0ccd6/eCG50 process update.pdf",
          },
        ],
      },
    ],
    documents: [],
  },
]

// Test case 1: Top-level folder
test("findParentIds - Top-level folder", () => {
  const result = findParentIds(data, 1)
  expect(result).toEqual([1])
})

// Test case 2: Nested folder
test("findParentIds - Nested folder", () => {
  const result = findParentIds(data, 3)
  expect(result).toEqual([3, 2])
})

// Test case 3: Non-existent folder
test("findParentIds - Non-existent folder", () => {
  const result = findParentIds(data, 5)
  expect(result).toEqual([])
})
