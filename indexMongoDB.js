require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
  title: String,
  text: String,
  type: String
}) 

const Blog = mongoose.model("Blog", blogSchema);

const INIT_DATA = [
  {
    title: "Home",
    text: process.env.INIT_HOME_TXT,
    type: "page_info"
  },
  {
    title: "About",
    text: process.env.INIT_ABOUT_TXT,
    type: "page_info"
  },
  {
    title: "Contact",
    text: process.env.INIT_CONTACT_TXT,
    type: "page_info"
  },
]

app.get('/api/pageInfos', (req, res) => {
  Blog.find({ type: "page_info" }, (error, results) => {
    if (!results || results.length === 0) {
      Blog.insertMany(INIT_DATA, (error, docs) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`inserted ${docs}`);
          res.redirect('/api/pageInfos');
        }
      })
    }
    if (results.length > 0) {
      const homeStartingContent = results.find(row => row.title === 'Home')
      const aboutContent = results.find(row => row.title === 'About')
      const contactContent = results.find(row => row.title === 'Contact')
      res.send({homeStartingContent, aboutContent, contactContent});
    }
  })
})

app.post('/api/pageInfos', (req, res) => {
  console.log('post pageInfos!');
  const pageInfos = req.body;
  console.log('pageInfos: ', pageInfos);
  Blog.insertMany(pageInfos, (error, docs) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`inserted ${docs}`);
      res.send(docs);
    }
  })
})

app.get('/api/posts', (req, res) => {
  Blog.find({ type: "post" }, (error, results) => {
    res.send(results);
  })
})

app.post('/api/posts', (req, res) => {
  const { title, text } = req.body;
  const newPost = new Blog({ title, text, type: "post" });
  newPost.save((err, item) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`succesfully added ${item.title}`);
    }
    res.send(item);
  })
})


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Blog listening on ${port}`);