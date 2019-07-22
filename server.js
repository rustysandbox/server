let express = require('express');
let app = express();
require('dotenv').config();
let dbInteractions = require('./sql.js')

let port = process.env.PORT || 3000;
let enviroment = process.env.enviroment || 'dev';

app.get('/', (req, res) => {
  res.send('alksdfljksdflkjfdslkjsdf not done')
})
app.get('/news', (req, res) => {
  res.send(
    'not done'
  )
})

//comments
app.get('/comments', (req, res) => {
  //todo dbInteractions.getComments(id)
  res.send('not done');
});
app.post('/comments', (req, res) => {
  // todo dbInteractions.postComments(id, comment, userId)
  res.send('not done');
});

//stars

app.get('/stars', (req, res) => {
  // todo dbInteractions.getStars(id)
  // res.send('not done');
});
app.patch('/stars', (req, res) => {
  // todo dbInteractions.patchStar(id, newNumberOfStars)
  res.send('not done');
});

app.use('*', (req, res) => {
  res.status(404).send('nope. no. no. no.');
})
app.listen(port, () => {
  if (enviroment !== 'prod') console.log(`on port ${port}`);

});
