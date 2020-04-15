import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Info from "./components/info";
import Compose from "./components/compose";
import Post from './components/post';
import './App.css';
import axios from 'axios';


function App() {    
  const [posts, setPosts] = useState([]);
  const [pageInfos, setPageInfos] = useState({
    homeStartingContent: "",
    aboutContent: "",
    contactContent: ""
  });
  
  const {homeStartingContent, aboutContent, contactContent} = pageInfos;
  
  useEffect(() => {
    async function getPosts() {
      const {data} = await axios.get('/api/posts');
      console.log('app getPosts: ', data);
      setPosts(data);
    }
    getPosts(); 
  }, [])

  useEffect(() => {
    async function fetchPageInfos() {
      try {
        let {data} = await axios('/api/pageInfos');
        setPageInfos(data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchPageInfos();
  }, [])

  return (
    <div className="container App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home homeStartingContent={homeStartingContent} posts={posts} />
          </Route>
          <Route path="/about">
            <Info contentObj={aboutContent} />
          </Route>
          <Route path="/compose">
            <Compose setPosts={setPosts} />
          </Route>
          <Route path="/contact">
            <Info contentObj={contactContent} />
          </Route>
          <Route path="/post/:_id">
            <Post />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
