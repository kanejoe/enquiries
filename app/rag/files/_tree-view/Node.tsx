import { useContext } from "react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  TreeViewActionTypes,
  TreeViewContext,
} from "../../../../lib/context/TreeViewProvider/TreeViewProvider"
import { Arrow } from "./Arrow"
import { DocumentsList } from "./DocumentsList"
import { MenuDialog } from "./MenuDialog"
import { useRovingTabindex } from "./RovingTabindex"
import { TreeNodeType } from "./TreeView"

type NodeProps = {
  node: TreeNodeType
}

export function Node({
  node: { folder_id, folder_name, children, documents },
}: NodeProps) {
  const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)
  const { isFocusable, getRovingProps } = useRovingTabindex(
    folder_id.toString()
  )
  const isOpen = open.get(folder_id)

  return (
    <li
      {...getRovingProps<"li">({
        className:
          "flex flex-col cursor-pointer select-none focus:outline-none",
        // onKeyDown:
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
              isFocusable && "group-focus:border-slate-300"
            )}
            onClick={() => {
              open.get(folder_id)
                ? dispatch({
                    type: TreeViewActionTypes.CLOSE,
                    id: folder_id,
                  })
                : dispatch({
                    type: TreeViewActionTypes.OPEN,
                    id: folder_id,
                  })
              selectId(folder_id)
            }}
          >
            {(children && children.length) ||
            (documents && documents.length > 0) ? (
              <Arrow className="h-4 w-4 shrink-0 text-gray-500" open={isOpen} />
            ) : (
              // <span className="h-4 w-4 shrink-0" />
              <Dot className="h-4 w-4 shrink-0 text-gray-500" />
            )}
            <div className="inline-flex w-full justify-between">
              <span className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {folder_name}{" "}
                {documents?.length ? (
                  <span className="ml-0.5 text-right text-xs text-slate-500">
                    {documents.length === 1
                      ? `(${documents.length} document)`
                      : `(${documents.length} documents)`}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <span className="w-10">
                <MenuDialog id={folder_id} folder_name={folder_name} />
              </span>
            </div>
          </div>
        </div>
      </MotionConfig>
      <AnimatePresence initial={false}>
        {(children?.length || documents?.length) && open.get(folder_id) ? (
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
            {documents?.length > 0 ? (
              <DocumentsList documents={documents} />
            ) : null}
            {children.map((node) => (
              <Node node={node} key={node.folder_id} />
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </li>
  )
}
