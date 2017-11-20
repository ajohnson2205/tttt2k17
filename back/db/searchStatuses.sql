SELECT
  *
FROM
  statuses
WHERE
  status_name LIKE
  ('%' || $1 || '%')
