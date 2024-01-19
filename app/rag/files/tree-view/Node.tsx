import { KeyboardEvent, useContext, useState } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

// import isHotkey from "is-hotkey"

import { cn } from "@/lib/utils"

import { Arrow } from "./Arrow"
import { MenuDialog } from "./MenuDialog"
import { useRovingTabindex } from "./RovingTabindex"
import { TreeNodeType } from "./TreeView"
import { TreeViewActionTypes, TreeViewContext } from "./TreeViewProvider"

type NodeProps = {
  node: TreeNodeType
}

export function Node({
  node: { folder_id, folder_name, children, documents },
}: NodeProps) {
  const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)
  const { isFocusable, getRovingProps, getOrderedItems } = useRovingTabindex(
    folder_id.toString()
  )
  const isOpen = open.get(folder_id.toString())

  return (
    <li
      {...getRovingProps<"li">({
        className:
          "flex flex-col cursor-pointer select-none focus:outline-none",
        /*onKeyDown: function (e: KeyboardEvent<HTMLLIElement>) {
          e.stopPropagation()
          const items = getOrderedItems()
          let nextItemToFocus: RovingTabindexItem | undefined

          if (isHotkey("up", e)) {
            e.preventDefault()
            nextItemToFocus = getPrevFocusableId(items, id.toString())
          } else if (isHotkey("down", e)) {
            e.preventDefault()
            nextItemToFocus = getNextFocusableId(items, id.toString())
          } else if (isHotkey("right", e)) {
            if (isOpen && children?.length) {
              nextItemToFocus = getNextFocusableId(items, id.toString())
            } else {
              dispatch({ type: TreeViewActionTypes.OPEN, id: id.toString() })
            }
          } else if (isHotkey("left", e)) {
            if (isOpen && children?.length) {
              dispatch({
                type: TreeViewActionTypes.CLOSE,
                id: id.toString(),
              })
            } else {
              nextItemToFocus = getParentFocusableId(items, id.toString())
            }
          } else if (isHotkey("home", e)) {
            e.preventDefault()
            nextItemToFocus = getFirstFocusableId(items)
          } else if (isHotkey("end", e)) {
            e.preventDefault()
            nextItemToFocus = getLastFocusableId(items)
          } else if (/^[a-z]$/i.test(e.key)) {
            nextItemToFocus = getNextFocusableIdByTypeahead(
              items,
              id.toString(),
              e.key
            )
          } else if (isHotkey("space", e)) {
            e.preventDefault()
            selectId(id.toString())
          }

          if (nextItemToFocus != null) {
            nextItemToFocus.element.focus()
            selectId(nextItemToFocus.id)
          }
        },*/
      })}
    >
      <MotionConfig
        transition={{ duration: 0.25, ease: [0.164, 0.84, 0.43, 1] }}
      >
        <div>
          <div
            className={cn(
              "group flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-[1.5px] border-transparent px-1 font-medium",
              "hover:rounded-md hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm",
              isFocusable && "group-focus:border-slate-300",
              selectedId === folder_id.toString()
                ? "bg-slate-100"
                : "bg-transparent"
            )}
            onClick={(e) => {
              open.get(folder_id.toString())
                ? dispatch({
                    type: TreeViewActionTypes.CLOSE,
                    id: folder_id.toString(),
                  })
                : dispatch({
                    type: TreeViewActionTypes.OPEN,
                    id: folder_id.toString(),
                  })
              selectId(folder_id.toString())
            }}
          >
            {children && children.length ? (
              <Arrow className="h-4 w-4 shrink-0 text-gray-500" open={isOpen} />
            ) : (
              <span className="h-4 w-4 shrink-0" />
            )}
            <div className="inline-flex w-full justify-between">
              <span className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {folder_name}
              </span>
              <span className="w-10">
                <MenuDialog id={folder_id} folder_name={folder_name} />
              </span>
            </div>
          </div>
        </div>
      </MotionConfig>
      <AnimatePresence initial={false}>
        {children?.length && open.get(folder_id.toString()) ? (
          <motion.ul
            className="pl-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.25 },
                opacity: { duration: 0.2, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25 },
                opacity: { duration: 0.2 },
              },
            }}
            key="ul"
          >
            {children.map((node) => (
              <Node node={node} key={node.folder_id} />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {documents?.length && open.get(folder_id.toString()) ? (
          <motion.ul
            className="pl-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.25 },
                opacity: { duration: 0.2, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25 },
                opacity: { duration: 0.2 },
              },
            }}
            key="ul"
          >
            {documents.map((document) => (
              <div
                key={document.document_id}
                className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-[1.5px] border-transparent px-1 font-medium"
              >
                <span className="h-4 w-4 shrink-0" />
                <span className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {document.document_name}
                </span>
              </div>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  )
}
