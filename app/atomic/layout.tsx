import { DetailsCard } from "../atomic_requisition/detail_card"

interface AtomicLayoutProps {
  children: React.ReactNode
}

function AtomicLayout({ children }: AtomicLayoutProps) {
  return (
    <>
      <div className="container font-albertsans">
        <section className="mt-4 lg:flex lg:gap-x-8">
          <div className="mt-8 hidden lg:block lg:w-1/5">
            <div className="flex flex-col gap-y-6">
              <DetailsCard />
            </div>
          </div>
        </section>
        <section>{children}</section>
      </div>
    </>
  )
}

export default AtomicLayout
