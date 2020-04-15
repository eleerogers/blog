import React from "react";
import { Link } from "react-router-dom";

function Posts({posts}) {
  const postDivs = posts.map(post => (
    <div key={post._id}>
      <h3><Link to={{
        pathname: `/post/${post._id}`,
        state: {
          post: post
        }
      }}>{post.title}</Link></h3>
      <p>{post.text}</p>
    </div>
  ))

  return (
    <>
      {postDivs}
    </>
  )
}

export default Posts;