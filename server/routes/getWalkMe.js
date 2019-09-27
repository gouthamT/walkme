import { getAllMatchingWalkMeInResponse, readWalkMeFile } from '../helpers/fileHelper';

async function getWalkMes(req, res, next) {
  getAllMatchingWalkMeInResponse(req, res, next);
};

async function getWalkMeByFileName(req, res, next) {
  readWalkMeFile(req, res, next);
};

export { getWalkMes, getWalkMeByFileName };