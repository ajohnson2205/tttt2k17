SELECT
  event_status,
  SUM(event_duration) as status_duration
FROM
  events
WHERE
  user_id = 12
    AND
  DATE(((event_timestamp AT TIME ZONE 'UTC') AT TIME ZONE 'MST')) = DATE(now() AT TIME ZONE 'MST')
GROUP BY
  event_status
