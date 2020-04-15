import React from "react";
import Posts from './posts';
import Info from './info';

function Home({posts, homeStartingContent}) {
  return (
    <>
      <Info contentObj={homeStartingContent} />
      <Posts posts={posts} />
    </>
  )
}

export default Home;