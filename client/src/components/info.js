import React from "react";

function Info({contentObj}) {
  
  return (
    <>
      <h1>{contentObj.title}</h1>
      <p>{contentObj.text}</p>
    </>
  )
}

export default Info;