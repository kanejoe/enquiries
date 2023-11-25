import { PrecedentCard } from "./_components/PrecedentCard"

export default async function ServerComponent() {
  return (
    <main className="flex flex-col gap-y-2 font-albertsans">
      <section className="grid grid-cols-2 gap-4">
        <PrecedentCard />
        <PrecedentCard archived={true} />
      </section>
    </main>
  )
}
