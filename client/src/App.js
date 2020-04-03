import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Compose from "./components/compose";
import Contact from "./components/contact";
import './App.css';
import axios from 'axios';

function App() {    
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function getPosts() {
      const {data} = await axios.get('/api/posts');
      setPosts(data);
    }
    getPosts();
  }, [])

  return (
    <div className="container App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/compose">
            <Compose setPosts={setPosts} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
