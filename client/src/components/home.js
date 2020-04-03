import React, { useEffect, useState } from "react";
import axios from 'axios';
import Posts from './posts';

function Home({posts}) {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log('fetchData')
      try {
        const {data} = await axios('/api/home');
        console.log({data});
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
      <Posts posts={posts} />
    </>
  )
}

export default Home;