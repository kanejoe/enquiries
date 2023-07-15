"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const details = {
  ref: "ACCA01/0002",
  property: "98 Castle St., Killarney, County Kerry",
}

export function DetailsCard() {
  return (
    <motion.div
      className=""
      whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Requisitions on Title</CardTitle>
          <CardDescription>{details.ref}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{details.property}</p>
        </CardContent>
        <CardFooter>
          <p>
            <Badge>Completed</Badge>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
