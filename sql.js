let pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL); client.connect()
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
  getStars: (id, res) => {
    let sql = `Select * FROM article WHERE id=$1`
    client.query(sql, [id]).then(
      (sqlRes) => {
        if (sqlRes.rowCount > 0) {
          console.log(sqlRes)
          res.send(sqlRes[0].stars);
        } else {
          return res.send(404);
        }
      }
    ).catch(error => {
      console.error(error);
      return res.send(500);
    })
  },
  patchStars: (id, newNumberOfStars) => {

    //TODO update number of stars.
    return 'patch stars';
  }
}
