import { searchFolders } from "@/lib/hooks/organise-folders"

const data = [
  {
    folder_id: 2,
    folder_name: "Contract for Sale",
    parent_folder_id: null,
    children: [
      {
        folder_id: 3,
        folder_name: "Practice Notes",
        parent_folder_id: 2,
        children: [],
        documents: [
          {
            document_id: 6,
            document_name: "Practice Note General Condition 48.pdf",
          },
        ],
      },
    ],
    documents: [
      {
        document_id: 2,
        document_name: "conditions-of-sale-2023.pdf",
      },
      {
        document_id: 4,
        document_name: "explanatory-memorandum-conditions-of-sale-2023.pdf",
      },
    ],
  },
  {
    folder_id: 4,
    folder_name: "Litigation",
    parent_folder_id: null,
    children: [
      {
        folder_id: 5,
        folder_name: "High Court",
        parent_folder_id: 4,
        children: [],
        documents: [],
      },
      {
        folder_id: 6,
        folder_name: "Circuit Court",
        parent_folder_id: 4,
        children: [],
        documents: [],
      },
    ],
    documents: [],
  },
  {
    folder_id: 7,
    folder_name: "Corporate",
    parent_folder_id: null,
    children: [],
    documents: [],
  },
]

describe("searchFolders", () => {
  it("should return folders and documents containing the text 'con'", () => {
    const searchTerm = "con"
    const results = searchFolders(data, searchTerm)

    // Assert that the results contain the expected folders and documents
    expect(results).toEqual([
      {
        folder_id: 2,
        folder_name: "Contract for Sale",
        parent_folder_id: null,
        children: [
          {
            folder_id: 3,
            folder_name: "Practice Notes",
            parent_folder_id: 2,
            children: [],
            documents: [
              {
                document_id: 6,
                document_name: "Practice Note General Condition 48.pdf",
              },
            ],
          },
        ],
        documents: [
          {
            document_id: 2,
            document_name: "conditions-of-sale-2023.pdf",
          },
          {
            document_id: 4,
            document_name: "explanatory-memorandum-conditions-of-sale-2023.pdf",
          },
        ],
      },
    ])
  })
})
