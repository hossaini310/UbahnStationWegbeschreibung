import axios from 'axios';
import * as model from '../api/models/beacons.model.js';

const wlService = async () => {
  // https://www.wienerlinien.at/ogd_realtime/monitor?stopId=44&stopId=20&stopId=79&stopId=2160&stopId=2214&stopId=2940&stopId=3440&stopId=4201&stopId=4214&stopId=4408&stopId=4429&stopId=5545&stopId=5569&activateTrafficInfo=stoerunglang&acti

  const { data } = await axios.get(
    'https://www.wienerlinien.at/ogd_realtime/monitor?stopId=4201&stopId=4214&stopId=4428&stopId=4408&activateTrafficInfo=stoerunglang&acti',
  );
  const lines = data.data.monitors
    .map((monitor) => {
      if (monitor.lines[0].towards === monitor.lines[0].towards.toUpperCase()) {
        const name = monitor.lines[0].name.trim();
        const towards = monitor.lines[0].towards.trim();
        const departureTime = monitor.lines[0].departures.departure[0].departureTime.countdown;
        return { name, departureTime, towards };
      }
    })
    .filter(Boolean);

  // Gruppieren der Objekte nach dem Namen
  const groupedLines = lines.reduce((acc, line) => {
    const existingLine = acc.find((groupedLine) => groupedLine[0].name === line.name);
    if (existingLine) {
      existingLine.push(line);
    } else {
      acc.push([line]);
    }
    return acc;
  }, []);

  const beacon1 = {
    uuid: 'F9DF84FC-1145-4D0B-9AC7-F2FAD5EFF690',
    station: data.data.monitors[0].locationStop.properties.title,
    description: `At this station, you will find the following lines: ${groupedLines
      .map(
        (group) =>
          `Line ${group[0].name} heading towards ${group[0].towards} and ${group[1].towards} `,
      )
      .join('. ')}.
  If you need the elevator, you will find it on the left side. The escalators are on the right side.`,
  };

  await model.clearMonitors();
  await model.saveMonitor(beacon1.uuid, beacon1.station, beacon1.description);

  const beacon2 = {
    uuid: '4750BAAB-FAAC-4ADF-9FE4-85652FA6C580',
    station: data.data.monitors[1].locationStop.properties.title,
    description: `The escalators are located 10 meters ahead. Follow the tactile guiding strip to reach the platforms.`,
  };

  await model.saveMonitor(beacon2.uuid, beacon2.station, beacon2.description);

  const beacon3 = {
    uuid: 'EA33B1EC-4A91-4577-9983-0978DDD237BA',
    station: data.data.monitors[2].locationStop.properties.title,
    description: `If you want to go towards Schottentor, turn left. If you want to go towards Seestadt, turn right.`,
  };

  await model.saveMonitor(beacon3.uuid, beacon3.station, beacon3.description);
};

export default wlService;
