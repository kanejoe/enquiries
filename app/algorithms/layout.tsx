interface AlgorithmLayoutProps {
  children: React.ReactNode
}

export default function AlgorithmLayout({ children }: AlgorithmLayoutProps) {
  return <div className="container font-albertsans">{children}</div>
}
