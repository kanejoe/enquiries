"use client"

import React, { FC, useState } from "react"

const ICONS = {
  addChild: "+Child",
  addSibling: "+Sibling",
  edit: "✎", // You can replace this with an actual icon if preferred.
}

interface TreeNodeProps {
  title: string
  level: number
}

const TreeNode: FC<TreeNodeProps> = ({ title: initialTitle, level }) => {
  const [children, setChildren] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState<"child" | "sibling" | null>(null)
  const [inputValue, setInputValue] = useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(initialTitle)

  const handleSubmit = () => {
    if (inputValue) {
      if (type === "child") {
        setChildren((prevChildren) => [...prevChildren, inputValue])
      } else if (type === "sibling") {
        // Implement sibling logic if needed
      }
      setShowForm(false)
      setInputValue("")
    }
  }

  const handleEditSave = () => {
    setTitle(inputValue)
    setInputValue("")
    setIsEditing(false)
  }

  return (
    <div className={`ml-${level * 5} mt-2`}>
      {isEditing ? (
        <div className="flex">
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="focus:shadow-outline ml-2 rounded bg-blue-500 px-2 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleEditSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          <div className="flex space-x-2">
            <span
              className="cursor-pointer rounded px-2 text-blue-600 hover:bg-blue-100"
              onClick={() => {
                setIsEditing(true)
                setInputValue(title)
              }}
            >
              {ICONS.edit}
            </span>
            <span
              className="cursor-pointer rounded px-2 text-blue-600 hover:bg-blue-100"
              onClick={() => {
                setShowForm(true)
                setType("child")
              }}
            >
              {ICONS.addChild}
            </span>
            <span
              className="cursor-pointer rounded px-2 text-blue-600 hover:bg-blue-100"
              onClick={() => {
                setShowForm(true)
                setType("sibling")
              }}
            >
              {ICONS.addSibling}
            </span>
          </div>
        </div>
      )}

      {showForm && (
        <div className="mt-2">
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="mt-2 flex justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className="focus:shadow-outline rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400 focus:outline-none"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {children.map((child, idx) => (
        <TreeNode key={idx} title={`${idx + 1}. ${child}`} level={level + 1} />
      ))}
    </div>
  )
}

const TreeComponent: FC = () => {
  return <TreeNode title="1. Water Services" level={0} />
}

export default TreeComponent
