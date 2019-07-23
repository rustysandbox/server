const express = require('express');
const app = express();
require('dotenv').config();
const dbInteractions = require('./sql.js').dbInteraction;
const superagent = require('superagent')

const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

const port = process.env.PORT || 3000;
const enviroment = process.env.enviroment || 'dev';


app.get('/', (req, res) => {
  res.send('not done')
})
app.get('/news', (req, res) => {
  //super agent reddit
  let formattedResponse = [];
  superagent.get('https://www.reddit.com/r/animenews.json').then(result => {
    result.body.data.children.forEach(el => {
      console.log('element', el)
      let foo = {
        id: el.data.id,
        url: el.data.url,
        title: el.data.title,
        source: el.data.subreddit_name_prefixed,
        thumbnailurl: el.data.thumbnail,
        created: el.data.created,
        stars: 0
      }
      formattedResponse.push(foo)
    })
    res.send(formattedResponse)
  })

})

//comments

app.get('/comments', (req, res) => {
  const animeComments = req.query.data;
  const url = `https://www.reddit.com/r/animenews.json`

  client.query(`SELECT * FROM Article WHERE reddit.gen.id=$1`, [animeComments])
    .then (sqlResult => {
      if (sqlResult.rowCount === 0) {
        superagent.get(url)
          .then(result => {
            let comment = new Comment (animeComments, result);
            client.query(`INSERT INTO comments (
              UserID,
              user_comments,
              article_id,
              ) VALUES ($1, $2, $3)`, [comment.UserID, comment.user_comments, comment.article_id]
            )
            console.log('sending from googles');
            res.send(comment);

          })
        res.send('Not Done');
      } else {
        console.log ('sending from db');
        res.send(sqlResult.rows[0]);
      }
    });
  res.send(dbInteractions.getComments()
  );
});

app.post('/comments', (req, res) => {
  // TODO check if in cookies the user has a userId
  // TODO if !userId => generate random userId
  // TODO dbInteractionss.postComments(id, comment, userId)
  // TODO res.send 200
  res.send('not done');
});

//stars

app.get('/stars', (req, res) => {
  let foo = dbInteractions;
  console.log(foo)
  // TODO dbInteractionss.getStars(id)
  res.send(dbInteractions.getStars())
  // res.send(dbInteractionss.getComments());
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
