DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS article;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  UserID VARCHAR (255),
  comment VARCHAR (255),
  FOREIGN KEY (article_id) REFERENCES article (id)
  );

CREATE TABLE article (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255),
  title VARCHAR(255),
  source VARCHAR(255),
  thumbnailurl VARCHAR (255),
  created INT,
  stars INT
);