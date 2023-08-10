import { type AtomicRequisition } from "@/types"

interface SectionReplyProps {
  reply: AtomicRequisition["reply"]
  reqId: AtomicRequisition["reqId"]
}

function SectionReply({ reply, reqId }: SectionReplyProps) {
  return (
    <div className="lg:mr-6 lg:w-9/12">
      {/* <ReplyForm reply={reply} reqId={reqId} /> */}
    </div>
  )
}
