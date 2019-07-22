let pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL);client.connect()
client.on('error', error => {
  console.error(error);
})
//TODO set up db
//TODO get connection strings working
//TODO set up schema


module.exports.dbInteraction = {
  getComments: (id) => {
    // TODO search db for comments w/ id as its forign key
    return 'get comments';
  },
  postComments: (id, comment, userId) => {
    //TODO post new comment w/ comment and user id  and forign key matching article
    return 'post comments';
  },
  getStars: (id) => {
    //TODO get stars 
    return 'get stars';
  },
  patchStars: (id, newNumberOfStars) => {
    //TODO update number of stars.
    return 'patch stars';
  }
}
