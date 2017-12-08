module.exports = {

  createSnapshot: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("CREATING A SNAPSHOT", req.body)
    let {snapshotTimestamp, snapshotStatus, userID} = req.body;

    dbInstance.createSnapshot(req.body)
      .then((response) => res.status(200).send(response))
      .catch((err) => res.status(500).send(err))
  },


  createEvent: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log("CREATING AN EVENT", req.body)
    let {eventStartTimestamp, status, eventDuration, currentTimestamp, userID} = req.body;

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



  eventUserAggTimes: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.eventUserAggTimes()
      .then(eventUserAggTimes => {res.status(200).send(eventUserAggTimes)})
      .catch((err) => res.status(500).send(err))
  },


  statusesAvailableForChoosing: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.statusesAvailableForChoosing()
      .then(statusesAvailableForChoosing => {res.status(200).send(statusesAvailableForChoosing)})
      .catch((err) => res.status(500).send(err))
  },

  eventUserAggTimesSameDay: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.eventUserAggTimesSameDay()
      .then(eventUserAggTimesSameDay => {res.status(200).send(eventUserAggTimesSameDay)})
      .catch((err) => res.status(500).send(err))
  },


  eventUserAggTimesLastSevenDays: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.eventUserAggTimesLastSevenDays()
      .then(eventUserAggTimesLastSevenDays => {res.status(200).send(eventUserAggTimesLastSevenDays)})
      .catch((err) => res.status(500).send(err))
  },


  eventUserAggTimesLastTwentyEightDays: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance.eventUserAggTimesLastTwentyEightDays()
      .then(eventUserAggTimesLastTwentyEightDays => {res.status(200).send(eventUserAggTimesLastTwentyEightDays)})
      .catch((err) => res.status(500).send(err))
  },


}
