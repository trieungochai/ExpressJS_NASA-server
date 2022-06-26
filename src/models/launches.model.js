const launchesDatabase = require("./launches.mongo");
const planets = require("./launches.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

const launch = {
  flightNumber: 100,
  launchDate: new Date("December 25, 2030"),
  mission: "Kepler Exploration X",
  rocket: "Explorer X1",
  target: "Kepler-1652 b",
  customer: ["Kai", "Chi"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, _v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found!");
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;

  return aborted;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
