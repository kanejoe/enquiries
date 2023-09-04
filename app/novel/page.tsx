import { Editor } from "novel"

export default function NovelPage() {
  return (
    <div className="container m-8 flex flex-col space-y-6">
      <div className="">
        <h1 className="text-2xl font-bold">Novel</h1>
      </div>
      <div className="">
        <Editor />
      </div>
    </div>
  )
}
