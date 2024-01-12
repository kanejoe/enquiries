import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type IconProps = {
  open?: boolean
  className?: string
}

export function Arrow({ open, className }: IconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={cn("origin-center", className)}
      animate={{ rotate: open ? 90 : 0 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </motion.svg>
  )
}
