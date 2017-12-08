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
  status_id SERIAL PRIMARY KEY,
  image_url TEXT
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
INSERT INTO statuses (status_name, image_url) VALUES ('break', 'https://render.bitstrips.com/v2/cpanel/8ce801a6-be57-4680-bf8b-d6be2e88621f-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('lunch', 'https://render.bitstrips.com/v2/cpanel/6d215830-b6a8-4acb-ae1f-e6ae64419a64-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('meeting', 'https://render.bitstrips.com/v2/cpanel/c19e07d1-f6e1-45f6-916b-991e85d0e599-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('coaching', 'https://render.bitstrips.com/v2/cpanel/31f20050-0209-4c06-86c3-7cce3a640d39-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('training', 'https://render.bitstrips.com/v2/cpanel/5479aa75-4dc9-4d4b-944c-c961e3831d6f-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('ping pong', 'https://render.bitstrips.com/v2/cpanel/e68fcf49-ccb9-4878-a8b3-21834fdcef55-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('all thumbs', 'https://render.bitstrips.com/v2/cpanel/359644fb-c5df-4412-9bc7-ae838696ef14-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('dinking around', 'https://render.bitstrips.com/v2/cpanel/73e98b2e-39b0-49dc-96ad-1fc23080e96b-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('chat', 'https://render.bitstrips.com/v2/cpanel/e36464c4-bda0-47cd-8436-a762923047e8-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');
INSERT INTO statuses (status_name, image_url) VALUES ('lessonly', 'https://render.bitstrips.com/v2/cpanel/2196307c-2ceb-46f8-8bf4-4c3e3f34f93e-39bbb77c-0bb8-438b-a37e-84344d35466a-v1.png?transparent=1&palette=1');



--DROP TABLES FOR A NICE RESET
DROP TABLE snapshots;
DROP TABLE events;
DROP TABLE statuses;
DROP TABLE users;
