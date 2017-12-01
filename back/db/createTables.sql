CREATE TABLE snapshots (
  snapshot_timestamp TIMESTAMP,
  snapshot_status VARCHAR(50),
  user_id INTEGER,
  snapshot_id SERIAL PRIMARY KEY
);


CREATE TABLE events (
  event_timestamp TIMESTAMP,
  event_status VARCHAR(50),
  event_duration INTEGER,
  event_end_timestamp TIMESTAMP,
  user_id INTEGER,
  event_id SERIAL PRIMARY KEY
);


CREATE TABLE statuses (
  status_added_timestamp TIMESTAMP,
  status_name VARCHAR(50),
  status_id SERIAL PRIMARY KEY
)


CREATE TABLE users (
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email TEXT,
  picture TEXT,
  auth_id TEXT,
  user_id SERIAL PRIMARY KEY
)







--POPULATE STATUS DATA
INSERT INTO statuses (status_name, status_id) VALUES ('none', 0);
INSERT INTO statuses (status_name) VALUES ('break');
INSERT INTO statuses (status_name) VALUES ('lunch');
INSERT INTO statuses (status_name) VALUES ('meeting');
INSERT INTO statuses (status_name) VALUES ('coaching');
INSERT INTO statuses (status_name) VALUES ('training');
INSERT INTO statuses (status_name) VALUES ('ping pong');
INSERT INTO statuses (status_name) VALUES ('all thumbs');


--DROP TABLES FOR A NICE RESET
DROP TABLE snapshots;
DROP TABLE events;
DROP TABLE statuses;
DROP TABLE users;
