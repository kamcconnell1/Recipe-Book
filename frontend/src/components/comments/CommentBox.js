import React from 'react'


const CommentBox = ({handleAddComment, handleChange, comments}) => {

      
    return (
      <div className="commentbox">
      <form onSubmit={handleAddComment}>
          <input 
          className="input is-small"  
          type="text"
          name="text"
          placeholder="Add a comment..." 
          value={comments.text}
          onChange={handleChange}
          />
            <button 
            type="submit"
            className="button is-light is-small"
            >Submit</button>
      </form>
    </div>
)
}



export default CommentBox