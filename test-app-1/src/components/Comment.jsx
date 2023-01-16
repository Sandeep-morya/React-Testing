import React from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  const [list, setList] = React.useState([]);

  const handleList = (comment) => {
    
  }

  const handleStatus = (id) => {
   
  }

 
  
  return <div>
    <CommentInput {...{ handleList }} />
    <CommentList {...{ list, handleStatus }} />
  </div>;
};

export default Comment;
