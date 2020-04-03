import React from "react";
import { Link } from "react-router-dom";

function Posts({posts}) {

  const postDivs = posts.map(post => (
    <div key={post.id}>
      <h3><Link to={{
        pathname: `/post/${post.id}`,
        state: {
          post: post
        }
      }}>{post.title}</Link></h3>
      <p>{post.post}</p>
    </div>
  ))

  return (
    <>
      {postDivs}
    </>
  )
}

export default Posts;