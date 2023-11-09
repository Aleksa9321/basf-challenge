import React from "react"
import "./ReplyButton.scss"

interface ReplyButtonProps {
  newCommentParentId: string
  getNewCommentParentId: (parentId: string) => void
  replyNumber?: number
}

const ReplyButton: React.FC<ReplyButtonProps> = ({
  newCommentParentId,
  getNewCommentParentId,
  replyNumber,
}) => {
  const sendParentId = () => {
    getNewCommentParentId(newCommentParentId)
  }

  return (
    <button className="reply-button" onClick={sendParentId}>{`Reply${
      replyNumber ? ` (${replyNumber})` : ""
    }`}</button>
  )
}

export default ReplyButton
