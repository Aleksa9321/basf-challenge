import React, { useState, useEffect } from "react"
import CommentCard from "../CommentCard/CommentCard"
import { getData } from "../../Api/getData"
import { Author, Comment, Data } from "../../Types/types"
import { emptyMockResponse } from "../../Mock/response.mock"
import { weekDays } from "../../Utils/dateUtils"
import "./CommentContainer.scss"

const CommentContainer: React.FC = () => {
  // assuming that the user is logged in (implemented in this way so that the design follows the provided wireframe)
  const currentUser: Author = {
    name: "Ivan Martic",
    picture: "img/ivan.jpg",
  }
  const [data, setData] = useState<Data>(emptyMockResponse.data)
  const [apiCallStatus, setApiCallStatus] = useState<boolean>(false)
  const [commentText, setCommentText] = useState<string>("")
  const [newCommentParentId, setNewCommentParentId] = useState<string>("")
  const currentDate = new Date()
  const dateValue = `${
    weekDays[currentDate.getDay() - 1]
  }, ${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`

  const getNewCommentParentId = (parentId: string) => {
    newCommentParentId === parentId
      ? setNewCommentParentId("")
      : setNewCommentParentId(parentId)
  }

  const validateComment = () => {
    if (commentText) {
      // in normal conditions a call to the api would be made here
      addNewComment()
      setCommentText("")
      setNewCommentParentId("")
    }
  }

  const addNewComment = () => {
    const newCommentId = data.comments.length + 1
    const newCommentDate = new Date()
    const newCommentTimestamp = newCommentDate.getMilliseconds()

    const newComment: Comment = {
      id: newCommentId.toString(),
      author: currentUser,
      text: commentText,
      timestamp: newCommentTimestamp,
      parent_id: newCommentParentId,
    }

    const newData: Data = { ...data, comments: [...data.comments, newComment] }

    setData(newData)
  }

  const enterComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value)
  }

  useEffect(() => {
    const response = getData()

    setData(response.data)
    setApiCallStatus(true)
  }, [])

  return (
    <div className="comment-container">
      <div className="date-paragraph-container">
        <p className="date-paragraph">{dateValue}</p>
      </div>
      {apiCallStatus ? (
        data.comments.map((comment) => {
          const replies = data.comments.filter((com) => {
            return com.parent_id && com.parent_id === comment.id
          })

          return (
            !comment.parent_id && (
              <CommentCard
                {...comment}
                replies={replies}
                allComments={data.comments}
                getNewCommentParentId={getNewCommentParentId}
                selectedForReply={newCommentParentId}
                key={`comment-${comment.id}`}
              />
            )
          )
        })
      ) : (
        <h1>Loading...</h1>
      )}
      <div className="add-comment-container">
        <input
          className="add-comment-input"
          type="text"
          value={commentText}
          onChange={enterComment}
          placeholder="...type something"
          maxLength={150}
        />
        <button className="add-comment-button" onClick={validateComment}>
          Send
        </button>
      </div>
    </div>
  )
}

export default CommentContainer
