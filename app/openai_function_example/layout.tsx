type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="container mt-4">{children}</div>
    </>
  )
}

export default Layout
