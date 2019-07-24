const express = require('express');
const app = express();
require('dotenv').config();

const superagent = require('superagent')
const port = process.env.PORT || 3000;
const enviroment = process.env.enviroment || 'dev';
const cookieParser = require('cookie-parser');

const dbInteractions = require('./sql.js').dbInteraction;

app.use(cookieParser());
app.get('/', (req, res) => {
  //TODO return site map w/ endpoints
  res.send('not done')
})
app.get('/news', (req, res) => {
  //super agent reddit
  superagent.get('https://www.reddit.com/r/animenews.json').then(result => {
    dbInteractions.getNews(result, res);
  }).catch(error => console.error('get news server.js', error))

})
//comments
app.get('/comments', (req, res) => {
  let queryId = req.query.id;
  dbInteractions.getComments(queryId, res)
});

app.post('/comments', (req, res) => {
  let queryId = req.query.id;
  let message = req.query.message;
  //If there is no message, return bad request.
  if (message.length < 1) {
    res.send(400);
  }
  //Gets the user ID from the cookies
  let userId = req.cookies.user;
  //If there's no id Generate one.
  if (!userId) {
    userId = Math.floor((Math.random() + 1) * 10000);
  }
  //Passes the info to our db module.
  dbInteractions.postComments(queryId, message, userId, res)
});

//stars
app.get('/stars', (req, res) => {
  //If there's no id, return bad request, else
  if (!req.query.id) res.send(400)
  dbInteractions.getStars(req.query.id, res);
});
app.patch('/stars', (req, res) => {
  //pass info to db layer
  dbInteractions.patchStar(req.query.id, res)
});
//return 404 for everything else.
app.use('*', (req, res) => {
  res.status(404).send('nope. no. no. no.');
})
app.listen(port, () => {
  if (enviroment !== 'prod') console.log(`on port ${port}`);

});
