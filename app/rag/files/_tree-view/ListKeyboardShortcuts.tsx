import { KeyboardEvent, useContext } from "react"
import isHotkey from "is-hotkey"

import {
  TreeViewActionTypes,
  TreeViewContext,
  TreeViewState,
} from "../../../../lib/context/TreeViewProvider/TreeViewProvider"
import {
  getFirstFocusableId,
  getLastFocusableId,
  getNextFocusableId,
  getNextFocusableIdByTypeahead,
  getParentFocusableId,
  getPrevFocusableId,
  RovingTabindexItem,
  useRovingTabindex,
} from "./RovingTabindex"

/*
export function ListKeyBoardShortCuts ({
  node: { folder_id, folder_name, children, documents }, e, items
}: any) {
        //   e.stopPropagation()
            const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)

  const { isFocusable, getRovingProps, getOrderedItems } = useRovingTabindex(
    folder_id.toString()
  )
          let nextItemToFocus: RovingTabindexItem | undefined

            const isOpen = open.get(folder_id.toString())


          if (isHotkey("up", e)) {
            e.preventDefault()
            nextItemToFocus = getPrevFocusableId(items, folder_id.toString())
          } else if (isHotkey("down", e)) {
            e.preventDefault()
            nextItemToFocus = getNextFocusableId(items, folder_id.toString())
          } else if (isHotkey("right", e)) {
            if (isOpen && children?.length) {
              nextItemToFocus = getNextFocusableId(items, folder_id.toString())
            } else {
              dispatch({
                type: TreeViewActionTypes.OPEN,
                id: folder_id.toString(),
              })
            }
          } else if (isHotkey("left", e)) {
            if (isOpen && children?.length) {
              dispatch({
                type: TreeViewActionTypes.CLOSE,
                id: folder_id.toString(),
              })
            } else {
              nextItemToFocus = getParentFocusableId(
                items,
                folder_id.toString()
              )
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
              folder_id.toString(),
              e.key
            )
          } else if (isHotkey("space", e)) {
            e.preventDefault()
            selectId(folder_id.toString())
          }

          if (nextItemToFocus != null) {
            nextItemToFocus.element.focus()
            selectId(nextItemToFocus.id)
          }
        },


*/
