
    SELECT
        event_status,
        SUM(event_duration) as status_duration
    FROM
        events
    WHERE
        user_id = 12
    GROUP BY
        event_status
    ORDER BY
      event_status
