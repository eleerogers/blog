import React, { useEffect, useState } from "react";
import axios from 'axios';

function Home({posts}) {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios('/api/home');
        setText(data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <h1>Home</h1>
      <p>{text}</p>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.post}</p>
        </div>
      ))}
    </>
  )
}

export default Home;