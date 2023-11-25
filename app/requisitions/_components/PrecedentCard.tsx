import { HomeModernIcon } from "@heroicons/react/20/solid"

import { Button } from "@/components/ui/button"

interface PrecedentCardProps {
  name: string
  subname: string
  archived?: boolean
}

export const PrecedentCard: React.FC<PrecedentCardProps> = ({
  name,
  subname,
  archived = false,
}) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-64 rounded-lg shadow-lg">
        <div
          className={`h-24 rounded-t-lg ${
            archived === false ? "bg-primary" : "bg-muted"
          }`}
        />

        {/* Center HomeModernIcon */}
        <div className="mx-auto -mt-12 flex justify-center rounded-full ">
          <HomeModernIcon
            className={`h-20 w-20 rounded-full border-4 border-white fill-gray-800 p-3 shadow ${
              archived === true
                ? "bg-muted ring-muted/10"
                : "bg-primary ring-primary/10"
            }}`}
          />
        </div>
        <div className="mt-2 text-center">
          <h2 className="text-xl font-semibold">Requisitions on Title</h2>
          <p className="text-gray-600">(2019 Edition)</p>
        </div>
        <div className="my-4 flex justify-around">
          <div className="text-center">
            <h3 className="text-lg font-semibold">500</h3>
            <p className="text-card-foreground">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">300</h3>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <Button
            className={`w-full rounded-lg bg-primary    transition duration-300 active:-translate-y-1 ${
              archived === true
                ? "bg-muted hover:bg-accent-foreground/20"
                : "bg-primary text-card-foreground"
            }`}
          >
            Open
          </Button>
        </div>
      </div>
    </div>
  )
}
