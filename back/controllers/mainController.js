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
    let {theTimestamp, status, eventDuration, currentTimestamp, userID} = req.body;

    dbInstance.createEvent(req.body)
      .then((response) => res.status(200).send(response))
      .catch((err) => console.log(err))
  },


  searchStatuses: (req, res, next) => {
    const dbInstance = req.app.get('db');
    let statusSearchValue = req.query.searchValue;
    console.log("SEARCHING STATUSES", statusSearchValue)

    dbInstance.searchStatuses([statusSearchValue])
      .then((response) => {
        res.status(200).send(response)
      })

      // res.status(200).send(res))
      .catch((err) => {
        res.status(500).send(err)
      })

      // res.status(500).send(err))
  },


  trackUserTimes: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("GETTING USER TIMES", res.data)

    dbInstance.trackUserTimes()
      .then(userTimes => {res.status(200).send(userTimes)})
      .catch((err) => res.status(500).send(err))
  },


  eventUserAggTimes: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("GETTING EVENT USER TIMES", res.data)

    dbInstance.eventUserAggTimes()
      .then(eventUserAggTimes => {res.status(200).send(eventUserAggTimes)})
      .catch((err) => res.status(500).send(err))
  },


  statusesAvailableForChoosing: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("GETTING STATUSES AVAILBLE FOR CHOOSING", res.data)

    dbInstance.statusesAvailableForChoosing()
      .then(statusesAvailableForChoosing => {res.status(200).send(statusesAvailableForChoosing)})
      .catch((err) => res.status(500).send(err))
  }



}
