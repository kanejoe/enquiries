"use client"

import { ButtonHTMLAttributes, FC, ReactNode, useEffect, useState } from "react"
import { motion, MotionProps } from "framer-motion"
// @ts-expect-error
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
  children: ReactNode
}

/**
 *
 * @param param0
 * @returns
 */
const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const isPending = useMinPendingTime(1500)
  return (
    <SlideOverButton isSpinning={isPending} type="submit">
      {children}
    </SlideOverButton>
  )
}

function useMinPendingTime(timeMs: number) {
  let { pending } = useFormStatus()
  let [locked, setLocked] = useState(pending)
  let [returnValue, setReturnValue] = useState(pending)

  useEffect(() => {
    if (!locked) {
      setReturnValue(pending)
    }
  }, [pending, locked])

  useEffect(() => {
    setLocked(pending || locked)
    let timeoutId = setTimeout(() => {
      setLocked(false)
    }, timeMs)

    return () => clearTimeout(timeoutId)
  }, [pending, locked, timeMs])

  return returnValue
}

function SlideOverButton({
  children,
  isSpinning,
  ...props
}: {
  children: ReactNode
  isSpinning: boolean
} & MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button asChild>
      <motion.button
        initial={isSpinning ? "saving" : "idle"}
        animate={isSpinning ? "saving" : "idle"}
        variants={{
          idle: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          saving: {
            transition: {
              staggerChildren: 0.2,
              staggerDirection: -1,
            },
          },
        }}
        {...props}
      >
        <span className="relative inline-flex items-center px-2.5">
          <Spinner
            variants={{
              saving: {
                opacity: 1,
              },
              idle: {
                opacity: 0,
              },
            }}
            className="absolute h-4 w-4 animate-spin"
            style={{ marginLeft: "-11px" }}
          />
          <motion.span
            variants={{
              idle: {
                x: 0,
              },
              saving: {
                x: 11,
              },
            }}
          >
            {children}
          </motion.span>
        </span>
      </motion.button>
    </Button>
  )
}

export function Spinner({ ...props }) {
  return (
    <motion.svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </motion.svg>
  )
}

export { SubmitButton }
