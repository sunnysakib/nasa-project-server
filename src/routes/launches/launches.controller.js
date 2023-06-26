const {getAllLaunches,addNewLaunch} = require ('../../models/launches.model');

// GET
function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

// POST
function httpAddNewLaunch (req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.target 
    || !launch.launchDate){
        return res.status(400).json({
            error: 'Missing required launch data',
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if(launch.launchDate.toString() === "Invalid Date"){
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch)
}

module.exports = {httpGetAllLaunches, httpAddNewLaunch};