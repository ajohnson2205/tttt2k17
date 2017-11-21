module.exports = {
  createSnapshot: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("CREATING A SNAPSHOT", req.body)
    let {snapshotTimestamp, snapshotStatus, userID} = req.body;

    dbInstance.createSnapshot(req.body)
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(500).send(err))
  },

  createEvent: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("CREATING AN EVENT", req.body)
    let {theTimestamp, status, userID} = req.body;

    dbInstance.createEvent(req.body)
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(500).send(err))
  },

  searchStatuses: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("SEARCHING STATUSES", req.body, req.query)
    let {statusSearchValue} = req.body;

    dbInstance.searchStatuses(req.query)
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(500).send(err))
  },

  trackUserTimes: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("GETTING USER TIMES", res.data)

    dbInstance.trackUserTimes()
    .then(userTimes => {
      // console.log('properties', properties)
      res.status(200).send(userTimes)
    })
      .catch((err) => res.status(500).send(err))
  }
}
