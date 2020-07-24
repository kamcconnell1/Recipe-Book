import React from 'react'
import { isOwner } from '../../lib/auth'

const CommentCard = ({ comment, onClick }) => {
  const date = comment.createdAt.slice(0, 10).split('-').reverse().join('-')

  return (
    <article className="message commentcard">
      <div className="message-header">
        <span className='icon'><i className="fas fa-user"></i></span>
        <div className="message-header left">
          <p>{comment.user.username}</p>
          <p>{date}</p>
        </div>
        {isOwner(comment.user._id) &&
          <button
            className="delete"
            onClick={onClick}
            value={comment._id}
          ></button>
        }
      </div>
      <div className="message-body">
        {comment.text}
      </div>
      <hr />
    </article>
  )
}

export default CommentCard;