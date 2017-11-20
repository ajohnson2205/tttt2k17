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
  }
}
