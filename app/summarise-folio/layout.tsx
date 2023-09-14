interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="container font-albertsans">
        <section>{children}</section>
      </div>
    </>
  )
}

export default Layout
