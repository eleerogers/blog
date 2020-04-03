import React from "react";
import { withRouter } from "react-router-dom";
import useForm from "../hooks/useForm";
import axios from "axios";

function Compose({setPosts, history}) {
  const { values, handleChange, handleSubmit } = useForm(addPost);

  async function addPost() {
    try {
      const {data} = await axios.post('/api/posts', values);
      console.log({data})
      setPosts(data);
      history.push('/');
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Compose</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Title" 
          type="text" 
          name="title" 
          value={values.title || ""} 
          onChange={handleChange} 
        /> <br />
        <input 
          placeholder="Post" 
          type="text" 
          name="post" 
          value={values.post || ""} 
          onChange={handleChange} 
        /> <br />
        <button type="submit">Post</button>
      </form>
    </>
  )
}

export default withRouter(Compose);