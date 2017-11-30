SELECT
    event_status,
    CONCAT(
      to_char((SUM(event_duration) / 3600), '00'),
      ':',
      to_char(((SUM(event_duration) / 60) % 60 ), '00'),
      ':',
      to_char((SUM(event_duration) % 60), '00')
    ) as status_duration
FROM
    events
WHERE
    user_id = 12
GROUP BY
    event_status






    -- ORIGINAL
    --
    -- SELECT
    --     event_status,
    --     SUM(event_duration) as status_duration
    -- FROM
    --     events
    -- WHERE
    --     user_id = 12
    -- GROUP BY
    --     event_status
