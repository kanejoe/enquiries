"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface MotionWrapperProps {
  children: ReactNode
}

export function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <motion.li
      className=""
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.li>
  )
}
