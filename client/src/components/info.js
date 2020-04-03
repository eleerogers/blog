import React from "react";

function Info({content}) {
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.text}</p>
    </>
  )
}

export default Info;