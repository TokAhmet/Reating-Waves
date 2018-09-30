import React, { Component } from "react";

//Component to render out comments made on shows.
//Looping through the firebase list of comments to get the information I want to render.

function CommentController(props) {
    let cList = [];
    for (let comment in props.comments){
        cList.push(
            <div key={comment} className="user-comment">
            <p><strong>Comment: </strong>{props.comments[comment].comment}</p>
            <p><strong>Date: </strong>{props.comments[comment].commentDate}</p>
            <p><strong>CreatedBy: </strong>{props.comments[comment].createdBy}</p>
            <button onClick={() => props.removeComment}>Remove Comment!</button>
        </div>
        );
    }
    

        return(
            <div className= "comment-holder">
                 {cList}
            </div>
        )
    }
    
    export default CommentController;
