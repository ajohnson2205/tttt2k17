SELECT
    snapshot_status,
    COUNT(snapshot_id) * 10 as status_duration
FROM
    snapshots
WHERE
    user_id = 12
GROUP BY
    snapshot_status
