const launches = new Map();

const launch = {
  flightNumber: 100,
  launchDate: new Date("December 25, 2030"),
  mission: "Kepler Exploration X",
  rocket: "Explorer X1",
  destination: "Kepler-1652 b",
  customer: ["Kai", "Chi"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
