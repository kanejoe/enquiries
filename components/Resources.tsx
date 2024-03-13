"use client"

import {
  ComponentPropsWithoutRef,
  ComponentType,
  MouseEvent,
  ReactNode,
} from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion"

import { GridPattern } from "@/components/GridPattern"

interface Resource {
  name: string
  description: string
  icon: ComponentType<{ className?: string }>
  pattern: Omit<
    ComponentPropsWithoutRef<typeof GridPattern>,
    "width" | "height" | "x"
  >
}

export function ResourceIcon({
  icon: Icon,
}: {
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/25 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
      <Icon className="size-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
    </div>
  )
}

function ResourcePattern({
  mouseX,
  mouseY,
  ...gridProps
}: Resource["pattern"] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

interface ResourceProps {
  children: ReactNode
  icon: ComponentType<{ className?: string }>
  pattern: Resource["pattern"]
}

export function Resource({
  children,
  icon,
  pattern = {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3],
    ],
  },
}: ResourceProps) {
  // let mouseX = useMotionValue(0)
  // let mouseY = useMotionValue(0)

  // function onMouseMove({
  //   currentTarget,
  //   clientX,
  //   clientY,
  // }: MouseEvent<HTMLDivElement>) {
  //   let { left, top } = currentTarget.getBoundingClientRect()
  //   mouseX.set(clientX - left)
  //   mouseY.set(clientY - top)
  // }

  return (
    <div
      // onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5"
    >
      {/* <ResourcePattern {...pattern} mouseX={mouseX} mouseY={mouseY} /> */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/75 group-hover:ring-zinc-900/10" />
      <div className="relative rounded-2xl px-4 pb-4 pt-8">
        <ResourceIcon icon={icon} />
        <h2 className="mt-4 text-xl font-semibold leading-7 text-zinc-900">
          <span className="absolute inset-0 rounded-2xl" />
          AI Chatbot
        </h2>
        <div className="mt-1 text-sm text-zinc-600">{children}</div>
      </div>
    </div>
  )
}
