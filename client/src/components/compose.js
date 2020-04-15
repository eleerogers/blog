import React from "react";
import { withRouter } from "react-router-dom";
import useForm from "../hooks/useForm";
import axios from "axios";

function Compose({setPosts, history}) {
  const { values, handleChange, handleSubmit } = useForm(addPost);

  async function addPost() {
    try {
      const {data} = await axios.post('/api/posts', values);
      setPosts(posts => [...posts, data.rows[0]]);
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
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Post</label>
          <textarea
            rows="4"
            id="post"
            name="text"
            type="text"
            value={values.text || ""}
            className="form-control"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </>
  )
}

export default withRouter(Compose);