let pg = require('pg');
require('dotenv').config();
const client = new pg.Client(process.env.DATABASE_URL); client.connect()
client.on('error', error => {
  console.error(error);
})
module.exports.dbInteraction = {
  getNews: (elements, res) => {
    let formattedResponse = [];
    //Wrap in promise
    elements.body.data.children.forEach(el => {
      if (el.over_18) {
        return
      }
      let formattedElement = {
        id: el.data.id,
        url: el.data.url,
        title: el.data.title,
        source: el.data.subreddit_name_prefixed,
        thumbnailurl: el.data.thumbnail,
        created: el.data.created,
        stars: 0
      };
      formattedResponse.push(formattedElement);
      let sql =
        `SELECT * FROM article
        WHERE reddit_gen_id=$1`
      client.query(sql, [el.id]).then(sqlResponse => {
        if (sqlResponse.rowCount > 0) {
          formattedResponse.push(sqlResponse.rows[0].toString());
        } else {
          sql =
            `INSERT INTO article(reddit_gen_id, url, title, source, thumbnailurl, created, stars) 
            VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
          client.query(sql, [
            el.data.id, el.data.url, el.data.title, el.data.subreddit_name_prefixed, el.data.thumbnail, el.data.created, 0
          ]
            //       id: el.data.id,
            // url: el.data.url,
            // title: el.data.title,
            // source: el.data.subreddit_name_prefixed,
            // thumbnailurl: el.data.thumbnail,
            // created: el.data.created,
            // stars: 0
          )
        }
      }).catch(error => {
        console.error('getNews', error);
      })
    })
    res.send(formattedResponse);
  },
  getComments: (id, res) => {
    let sql =
      `SELECT * FROM comments
    WHERE reddit_gen_id=$1`
    client.query(sql, [id])
      .then(results => {
        res.send(results.rows);
      })
      .catch(error => {
        console.error('sql.js get comments', error)
      })
  },
  postComments: (id, comment, userId, res) => {
    let sql =
      `INSERT INTO comments(user_id, comment, reddit_gen_id) 
      VALUES ($1,$2,$3) RETURNING *`
    client.query(sql, [userId, comment, id]).then(
      sqlResponse => {
        res.cookie('user', userId).send(sqlResponse.rows[0]);
      }).catch(error => { console.error('sql.js postComments', error) });
  },
  getStars: (id, res) => {
    let sql = `Select * FROM article WHERE reddit_gen_id=$1`
    client.query(sql, [id]).then(
      sqlRes => {
        if (sqlRes.rowCount > 0) {
          console.log(sqlRes.rows[0]);
          res.send(sqlRes.rows[0].stars.toString());
        } else {
          return res.send(404);
        }
      }
    ).catch(error => {
      console.error(error);
      return res.sendStatus(500);
    })
  },
  patchStar: (id, res) => {
    // let stars = parseInt(numberOfStars);
    // stars++

    let sql = `SELECT * FROM article 
    WHERE reddit_gen_id=$1`

    client.query(sql, [id]).then(article => {
      let stars = article.rows[0].stars;
      stars++
      sql =
        `UPDATE article SET stars=$1
    WHERE reddit_gen_id=$2 RETURNING *`;
      let val = [stars, id];
      client.query(sql, val).then(sqlRes => {
        res.send(sqlRes.rows[0].stars.toString());
      }).catch(error => {
        console.error('sql.js patchStars', error)
        res.sendStatus(500);
      })
    })
  }
}
