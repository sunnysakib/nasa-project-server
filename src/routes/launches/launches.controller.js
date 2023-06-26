const {getAllLaunches,addNewLaunch} = require ('../../models/launches.model');

// GET
function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

// POST
function httpAddNewLaunch (req, res) {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate)
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

module.exports = {httpGetAllLaunches, httpAddNewLaunch};