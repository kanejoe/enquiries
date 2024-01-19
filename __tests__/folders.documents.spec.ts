import { organizeFolders } from "@/lib/hooks/organise-folders";



import { raw_folders_documents } from "./data/folders.raw";


describe("Test Normalize Folders/Documents Outerjoin", () => {
  it("should return a normalized array of folders", () => {
    const normalized = organizeFolders(raw_folders_documents)
    expect(normalized).toHaveLength(4)
  })

  it("should return an empty array if input is empty", () => {
    const normalized = organizeFolders([])
    expect(normalized).toHaveLength(0)
  })

  it("should handle duplicate folder names (doesn't make a difference)", () => {
    const input = [
      {
        folder_id: 1,
        folder_name: "Folder 1",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
      {
        folder_id: 2,
        folder_name: "Folder 2",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
      {
        folder_id: 3,
        folder_name: "Folder 1",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
    ]
    const normalized = organizeFolders(input)
    expect(normalized).toHaveLength(3)
  })

  it("should handle missing documents", () => {
    const input = [
      {
        folder_id: 1,
        folder_name: "Folder 1",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
      {
        folder_id: 2,
        folder_name: "Folder 2",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
      {
        folder_id: 3,
        folder_name: "Folder 3",
        parent_folder_id: null,
        document_name: null,
        document_id: null,
      },
    ]
    const normalized = organizeFolders(input)
    expect(normalized).toHaveLength(3)
    expect((normalized[0] as any).documents).toHaveLength(0)
    expect((normalized[1] as any).documents).toHaveLength(0)
    expect((normalized[2] as any).documents).toHaveLength(0)
  })

  it("should handle folders with documents", () => {
    const input = [
      {
        folder_id: 1,
        folder_name: "Folder 1",
        parent_folder_id: null,
        document_name: "Document 1",
        document_id: 1,
      },
      {
        folder_id: 1,
        folder_name: "Folder 1",
        parent_folder_id: null,
        document_name: "Document 2",
        document_id: 2,
      },
      {
        folder_id: 3,
        folder_name: "Folder 3",
        parent_folder_id: null,
        document_name: "Document 3",
        document_id: 3,
      },
    ]
    const normalized = organizeFolders(input)
    expect(normalized).toHaveLength(2)
    expect((normalized[0] as any).documents).toHaveLength(2)
    expect((normalized[1] as any).documents).toHaveLength(1)
  })


   it("should return an empty array when input is empty", () => {
     const input: any[] = []
     const expectedOutput: any[] = []

     const result = organizeFolders(input)

     expect(result).toEqual(expectedOutput)
   })
})