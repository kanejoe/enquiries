"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bsHYCKcRM6C
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatV0() {
  return (
    <div className="flex h-screen flex-col border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-1 flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="container px-4 py-2">
            <div className="grid gap-2">
              <div className="text-center">
                <h1 className="text-lg font-semibold">
                  Conversation with GPT-4
                </h1>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 4rem)",
          }}
        >
          <div className="container space-y-6 px-4 py-6">
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday, 10:26 PM
                  </p>
                  <p className="text-base font-medium">
                    Hi, I have a few questions about the universe.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday, 10:26 PM
                  </p>
                  <p className="text-base font-medium">
                    Hi, I have a few questions about the universe.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday, 10:26 PM
                  </p>
                  <p className="text-base font-medium">
                    Hi, I have a few questions about the universe.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday, 10:26 PM
                  </p>
                  <p className="text-base font-medium">
                    Hi, I have a few questions about the universe.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday, 10:26 PM
                  </p>
                  <p className="text-base font-medium">
                    Hi, I have a few questions about the universe.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="GPT-4 avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Typing...
                  </p>
                  <p className="text-base font-medium">
                    Ask me anything. I'm here to help!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="User avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 mins ago
                  </p>
                  <p className="text-base font-medium">
                    What is the meaning of life, the universe, and everything?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  alt="GPT-4 avatar"
                  height={56}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width={56}
                />
              </div>
              <div className="grid gap-1.5">
                <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 min ago
                  </p>
                  <p className="text-base font-medium">
                    The answer to the ultimate question of life, the universe,
                    and everything is 42.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 py-4">
          <form className="flex gap-4">
            <Textarea
              className="min-h-[60px] flex-1"
              placeholder="Type your message here."
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
