import * as model from '../models/beacons.model.js';
import wlService from '../../services/wl.service.js';

const getBeaconInfo = async (req, res) => {
  const { uuid } = req.body;

  const beaconInfos = await model.getBeaconInfo(uuid);

  return res.json(beaconInfos);
};

await model.clearLines();
wlService();

export { getBeaconInfo };
