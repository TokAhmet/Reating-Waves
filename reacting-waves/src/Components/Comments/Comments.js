import React, { Component } from "react";
import CommentController from './CommentController';

//Component to render out comments made on shows.
//Looping through the firebase list of comments to get the information I want to render.
  
  function Comments(props) {
      
      const submit = (e) => {
          e.preventDefault();
          props.onSubmit(props.entryID);
          console.log(props.entryID);
        };
        
        return (
            <div className="comment-form">
            <form onSubmit={submit}> 
            <div className="comment-inputs">
                <input type="text" onChange={props.onChange} name="commentVal" value={props.commentVal} placeholder="Enter your Comment" required/> 
                <div>                 
                    <button type="submit">Add Comment</button>
                </div>
            </div>
            </form>
        
            <CommentController 
                entryID={props.entryID} 
                commentVal={props.commentVal} 
                comments={props.comments}
                removeComment={props.removeComment}
            />  
        </div>
    );
}    

export default Comments;

