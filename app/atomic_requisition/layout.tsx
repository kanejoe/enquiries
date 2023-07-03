interface AtomicRequisitionLayoutProps {
  children: React.ReactNode
}

export default function AtomicRequisitionLayout({
  children,
}: AtomicRequisitionLayoutProps) {
  return (
    <>
      <div className="container">{children}</div>
    </>
  )
}
