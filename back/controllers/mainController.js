module.exports = {
  createSnapshot: (req, res, next) => {
    const dbIntance = req.app.get('db');
    console.log("CREATING A SNAPSHOT", req.body)
    let {snapshotTimestamp, snapshotStatus, userID} = req.body;

    dbIntance.createSnapshot(req.body)
      .then((res) => res.status(200).send(res))
      .catch((err) => res.status(500).send(err))
  }
}
