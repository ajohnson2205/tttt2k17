INSERT INTO
  snapshots
  (
    snapshot_timestamp,
    snapshot_status,
    user_id
  )

VALUES
  (
    ${currentTimestamp},
    ${status},
    ${userID}
  );
