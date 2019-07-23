const express = require('express');
const app = express();
require('dotenv').config();
const dbInteractions = require('./sql.js').dbInteraction;
const superagent = require('superagent')
const port = process.env.PORT || 3000;
const enviroment = process.env.enviroment || 'dev';
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('not done')
})
app.get('/news', (req, res) => {
  //super agent reddit
  let formattedResponse = [];
  superagent.get('https://www.reddit.com/r/animenews.json').then(result => {
    result.body.data.children.forEach(el => {
      let formattedElement = {
        id: el.data.id,
        url: el.data.url,
        title: el.data.title,
        source: el.data.subreddit_name_prefixed,
        thumbnailurl: el.data.thumbnail,
        created: el.data.created,
        stars: 0
      }
      //add news item to db
      let dbRes = dbInteractions.getNews(formattedElement);
      if (dbRes) {
        dbRes.title;
        formattedResponse.push(dbRes)
      } else {
        formattedResponse.push(formattedElement)
      }

    })
    res.send(formattedResponse)
  })

})

//comments
app.get('/comments', (req, res) => {
  let queryId = req.query.id;
  dbInteractions.getComments(queryId, res)
});
app.post('/comments', (req, res) => {
  let queryId = req.query.id;
  let message = req.query.message;
  if (message.length < 1) {
    res.send(400);
  }
  let userId = req.cookies.user;
  if (!userId) {
    userId = Math.floor((Math.random() + 1) * 10000);
  }
  dbInteractions.postComments(queryId, message, userId, res)
});

//stars
app.get('/stars', (req, res) => {

  if (!req.query.id) res.send(400)
  dbInteractions.getStars(req.query.id, res);
});
app.patch('/stars', (req, res) => {
  // TODO dbInteractionss.patchStar(id, newNumberOfStars)
  res.send('not done');
});

app.use('*', (req, res) => {
  res.status(404).send('nope. no. no. no.');
})
app.listen(port, () => {
  if (enviroment !== 'prod') console.log(`on port ${port}`);

});
