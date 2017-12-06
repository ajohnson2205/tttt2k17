INSERT INTO
  events
  (
    event_timestamp,
    event_status,
    event_duration,
    event_end_timestamp,
    user_id
  )

VALUES
  (
    ${eventStartTimestamp}, -- eventStartTimestamp
    ${status},
    ${eventDuration},
    ${currentTimestamp},  -- eventEndTimestamp
    ${userID}
  );
