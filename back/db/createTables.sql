CREATE TABLE snapshots (
  snapshot_timestamp TIMESTAMP,
  snapshot_status VARCHAR(50),
  user_id INTEGER,
  snapshot_id SERIAL PRIMARY KEY
)






-- EXAMPLES

CREATE TABLE users (
  firstName VARCHAR(40),
  lastName VARCHAR(40),
  genderID INTEGER REFERENCES genders (id),
  hairColorID INTEGER REFERENCES haircolors (id),
  eyeColorID INTEGER REFERENCES eyeColors (id),
  hobbyID INTEGER REFERENCES hobbies (id),
  picture TEXT,
  email TEXT,
  authID TEXT,
  birthDate DATE,
  id SERIAL PRIMARY KEY
);

CREATE TABLE hairColors (
  hairColor VARCHAR(40),
  id SERIAL PRIMARY KEY
);

CREATE TABLE hobbies (
  hobby VARCHAR(40),
  id SERIAL PRIMARY KEY
);

CREATE TABLE eyeColors (
  eyeColor VARCHAR(40),
    id SERIAL PRIMARY KEY
  );

CREATE TABLE genders (
  gender VARCHAR(6),
  id SERIAL PRIMARY KEY
);

CREATE TABLE relationships (
  id SERIAL PRIMARY KEY,
  loggedInUserId INTEGER,
  friendId INTEGER
);
