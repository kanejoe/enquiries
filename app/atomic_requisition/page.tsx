export default function AtomicRequisitionPage() {
  return (
    <section className="mt-16">
      <h1 className="text-xl font-semibold">Atomic Requisition</h1>
      <div className="mt-6 rounded p-6">
        <Table />
      </div>
    </section>
  )
}

function Table() {
  return (
    <div className="w-full border border-gray-100">
      <div className="flex flex-row space-x-1 items-stretch">
        <div className="w-1/2 flex-grow border-r border-gray-100">
          <div className="flex flex-row ">
            <div className="w-1/12 p-4">(i)</div>
            <div className="w-11/12 p-4">
              if so, state whether by Irish Water mains, on-site domestic septic
              tank or other on-site domestic waste water treatment system, or
              other
            </div>
          </div>
        </div>
        <div className="w-1/2 flex-grow border-l border-gray-100">
          <div className="flex flex-row">
            <div className="w-2/12 p-4 font-semibold">2.1.a.(i)</div>
            <div className="w-8/12 p-4">mains</div>
            <div className="w-2/12 p-4">options</div>
          </div>
        </div>
      </div>
    </div>
  )
}
