import query from '../../db/index.js';

const getBeaconInfo = (uuid) => {
  const sql = `
    SELECT *
    FROM beacons
    WHERE beacons.uuid = ?
  `;

  return query(sql, [uuid]);
};

const saveLines = (name, type, platform, towards, time) => {
  query(
    'INSERT INTO lines (name, type, platform, towards, departureTime) VALUES ($1, $2, $3, $4, $5)',
    [name, type, platform, towards, time],
  );
};

const clearMonitors = () => query('DELETE FROM beacons');

const saveMonitor = (uuid, station, description) => {
  query('INSERT INTO beacons (uuid, station, description) VALUES ($1, $2, $3)', [
    uuid,
    station,
    description,
  ]);
};

const clearLines = () => query('DELETE FROM lines');

export { getBeaconInfo, saveLines, clearLines, saveMonitor, clearMonitors };
