import React from "react";
import { useLocation } from "react-router-dom";

function Post() {
  const {state} = useLocation();
  const {post} = state;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
    </>
  )
}

export default Post;