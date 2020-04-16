require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const connectionString = process.env.SQL_CONNECTION_STRING;

const pool = new Pool({
  connectionString
});

app.get('/api/pageInfos', (req, res) => {
  pool.query('SELECT * FROM blog WHERE type = $1', ["page_info"], (error, results) => {
    const homeStartingContent = results.rows.find(row => row.title === 'Home')
    const aboutContent = results.rows.find(row => row.title === 'About')
    const contactContent = results.rows.find(row => row.title === 'Contact')
    res.send({homeStartingContent, aboutContent, contactContent});
  })
})

app.get('/api/posts', (req, res) => {
  pool.query('SELECT * FROM blog WHERE type = $1', ["post"], (error, results) => {
    if (error) {
      console.error(error);
      throw error;
    }
    res.send(results.rows);
  })
})

app.post('/api/posts', (req, res) => {
  console.log('posting');
  const { title, text } = req.body;
  console.log({title});
  console.log({text});
  pool.query('INSERT INTO blog (title, text, type) VALUES ($1, $2, $3) RETURNING *', [title, text, "post"], (error, results) => {
    if (error) {
      console.error(error);
      throw error;
    }
    console.log({results});
    res.send(results);
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
