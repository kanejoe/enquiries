"use client"

export default function Error() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl">This page could not be found</h1>
        <p className="my-4 text-xl text-white/60">
          Looks like you&apos;ve followed a broken link or entered a URL that
          doesn&apos;t exist on this site.
        </p>
        <a
          href="/"
          className="inline-block rounded-md border border-current px-4 py-2 text-white/50"
        >
          Go home
        </a>
      </div>
    </main>
  )
}
