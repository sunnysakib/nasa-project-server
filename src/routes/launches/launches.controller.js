const {getAllLaunches, existsLaunchWithId, abortLaunchById, scheduleNewLaunch} = require ('../../models/launches.model');
const getPagination = require('../../utils/query');


// GET
async function httpGetAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

// POST
async function httpAddNewLaunch (req, res) {
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
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    
    const exisitsLaunch = await existsLaunchWithId(launchId);
    if(!exisitsLaunch){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    
    const aborted = await abortLaunchById(launchId);

    if(!aborted){
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }

    return res.status(200).json({
        acknowledged: true,
    })
}

module.exports = {httpGetAllLaunches, httpAddNewLaunch,httpAbortLaunch};