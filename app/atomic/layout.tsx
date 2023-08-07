
interface AtomicLayoutProps {
  children: React.ReactNode
}

function AtomicLayout({ children }: AtomicLayoutProps) {
  
  return (
    <>
      <div className="container font-albertsans">
        <section className="mt-4 lg:flex lg:gap-x-8">
          <div className="mt-8 hidden lg:block lg:w-1/5">
            <div className="flex h-24 flex-col gap-y-6">Details Card</div>
          </div>
        </section>
        <section>{children}</section>
      </div>
    </>
  )
}

export default AtomicLayout
