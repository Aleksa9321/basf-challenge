import React from "react"

const DefaultUserThumbnail: React.FC = () => {
  // const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <circle cx="17.5" cy="17.5" r="17.5" fill="#B62323" />
    </svg>
  )
}

export default DefaultUserThumbnail
