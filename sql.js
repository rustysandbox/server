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
  getNews: (element) => {
    let sql =
      `SELECT * FROM article
    WHERE reddit_gen_id=$1`
    client.query(sql, [
      element.id
    ]
    ).then(sqlResponse => {
      if (sqlResponse.rowCount > 0) {
        return sqlResponse.rows[0];
      } else {
        sql =
          `INSERT INTO article(reddit_gen_id, url, title, source, thumbnailurl, created, stars) 
          VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
        client.query(sql, [
          element.id,
          element.url,
          element.title,
          element.source,
          element.thumbnailurl,
          element.created,
          element.stars
        ]).then(sqlResponse => {
          return sqlResponse.rows[0];
        }).catch(e => {
          console.error('getNews', e)
        })

        return null;
      }
    }).catch(error => {
      console.error('getNews', error);
    })
  },
  getComments: (id) => {
    let sql =
      `SELECT * FROM comments
    WHERE article_id=$1`
    client.query(sql, [id], (err, res) => {
      if (err) {
        return null;
      } else {
        return res;
      }
    })
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
          // console.log(sqlRes)
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
