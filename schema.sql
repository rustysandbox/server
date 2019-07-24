CREATE TABLE article (
  id SERIAL PRIMARY KEY,
  reddit_gen_id VARCHAR(255),
  url VARCHAR(255),
  title VARCHAR(255),
  source VARCHAR(255),
  thumbnailurl VARCHAR (255),
  created INT,
  stars INT
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR (255),
  comment VARCHAR (255),
  reddit_gen_id VARCHAR(255)
);

