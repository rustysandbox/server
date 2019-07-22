let express = require('express');
let app = express();
require('dotenv').config();
let dbInteractions = require('./sql.js').dbInteraction;

let port = process.env.PORT || 3000;
let enviroment = process.env.enviroment || 'dev';

app.get('/', (req, res) => {
  res.send('alksdfljksdflkjfdslkjsdf not done')
})
app.get('/news', (req, res) => {
  //super agent reddit
  res.send(
    dbInteractions.getComments()
  )
})

//comments
app.get('/comments', (req, res) => {
  //TODO dbInteractionss.getComments(id)
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
