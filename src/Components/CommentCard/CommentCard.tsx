import React from "react"
import SvgIndent from "../SvgIndent/SvgIndent"
import DefaultUserThumbnail from "../DefaultUserThumbnail/DefaultUserThumbnail"
import ReplyButton from "../ReplyButton/ReplyButton"
import { Comment } from "../../Types/types"
import "./CommentCard.scss"

interface CommentProps extends Comment {
  replies?: Comment[]
  allComments: Comment[]
  getNewCommentParentId: (parentId: string) => void
  selectedForReply: string
}

const CommentCard: React.FC<CommentProps> = ({
  id,
  author,
  text,
  timestamp,
  parent_id,
  replies,
  allComments,
  selectedForReply,
  getNewCommentParentId,
}) => {
  const commentInfoAndOptionsMargin = !!parent_id ? 78 : 44
  const commentMarginBottom = !replies?.length ? 32 : 0
  const commentDate = new Date(timestamp)
  const commentHours = commentDate.getHours()
  const commentMinutes = commentDate.getMinutes()

  const getReplies = (replyId: string) => {
    return allComments.filter((comment) => {
      return comment.parent_id === replyId
    })
  }

  const formatCommentTime = () => {
    let newHours = commentHours < 10 ? `0${commentHours}` : `${commentHours}`
    let newMinutes =
      commentMinutes < 10 ? `0${commentMinutes}` : `${commentMinutes}`

    return `${newHours}:${newMinutes}`
  }

  return (
    <div
      className="comment"
      style={{
        marginBottom: `${commentMarginBottom}px`,
      }}
    >
      <div className="comment-wrapper">
        {!!parent_id ? (
          <div className="reply-indent">
            <SvgIndent />
          </div>
        ) : (
          ""
        )}
        <div
          className={
            !!parent_id ? `thumbnail-wrapper added-margin` : "thumbnail-wrapper"
          }
        >
          {/* if real thumbnails were available my solution would look like this */}
          {/* <img
            className="user-picture"
            src={author.picture}
            alt={`${author.name}-${id}-thumbnail`}
          /> */}
          <DefaultUserThumbnail />
        </div>
        <div
          className={
            !!parent_id
              ? `comment-text-wrapper added-margin ${
                  selectedForReply === id && "selected"
                }`
              : `comment-text-wrapper ${selectedForReply === id && "selected"}`
          }
        >
          <h3 className="comment-author-name">{author.name}</h3>
          <p className="comment-text">{text}</p>
        </div>
      </div>
      <div
        className="comment-info-and-options"
        style={{ marginLeft: `${commentInfoAndOptionsMargin}px` }}
      >
        <p className="comment-timestamp">{formatCommentTime()}</p>
        <ReplyButton
          newCommentParentId={id}
          getNewCommentParentId={getNewCommentParentId}
          replyNumber={replies?.length && replies?.length}
        />
      </div>
      {replies?.length
        ? replies.map((reply) => {
            return (
              <CommentCard
                {...reply}
                allComments={allComments}
                getNewCommentParentId={getNewCommentParentId}
                replies={getReplies(reply.id)}
                selectedForReply={selectedForReply}
                key={`comment-${reply.id}`}
              />
            )
          })
        : ""}
    </div>
  )
}

export default CommentCard
