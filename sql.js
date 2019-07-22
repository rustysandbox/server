let pg = require('pg');
//todo set up db
//todo get connection strings working
//todo set up schema


exports.dbInteraction = {
  getComments: (id) => {
    // todo search db for comments w/ id as its forign key
    return null;
  },
  postComments: (id, comment, userId) => {
    //todo post new comment w/ comment and user id  and forign key matching article
    return null;
  },
  getStars: (id) => {
    //todo get stars 
    return null;
  },
  patchStars: (id, newNumberOfStars) => {
    //todo update number of stars.
    return null;
  }
}
