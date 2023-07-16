"use client"

import { motion } from "framer-motion"
import { Building2, MoreHorizontal, UserSquare2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { DetailsDialog } from "./DetailsDialog"

const details = {
  ref: "ACCA01/0002",
  property: "98 Castle St., Killarney, County Kerry",
  vendor: "John Smith",
}

export function DetailsCard() {
  return (
    <motion.div
      className="hover:shadow-lg"
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Requisitions on Title</CardTitle>
          <CardDescription>{details.ref}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-2">
              <UserSquare2 className="mt-1 h-4 w-4 shrink-0 text-slate-600 dark:stroke-slate-500" />
              <p className="text-balance font-semibold text-slate-700 dark:text-slate-300">
                {details.vendor}
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <Building2 className="mt-1 h-4 w-4 shrink-0 text-slate-600 dark:stroke-slate-500" />
              <p className="text-balance font-semibold text-slate-700 dark:text-slate-300">
                {details.property}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative">
          <p>
            <Badge>Completed</Badge>
            <div className="absolute bottom-2 right-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DetailsDialog />
              </Dialog>
            </div>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
