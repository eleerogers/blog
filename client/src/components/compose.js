import React from "react";
import { withRouter } from "react-router-dom";
import useForm from "../hooks/useForm";
import axios from "axios";

function Compose({setPosts, history}) {
  const { values, handleChange, handleSubmit } = useForm(addPost);

  async function addPost() {
    try {
      const {data} = await axios.post('/api/posts', values);
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
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            value={values.title || ""} 
            className="form-control" 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="post">Post</label>
          <textarea
            rows="4"
            id="post"
            name="post"
            type="text"
            value={values.post || ""}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </>
  )
}

export default withRouter(Compose);