import { promises } from 'fs';
import { join } from 'path';
import { WalkMeFileMatchCase, TargetFolder } from '../common/constants';
import walkMe from '../../walk-me/walk-me';

const targetDirectoryPath = join(__dirname, TargetFolder);

async function getFilesInfo(targetDirectory) {
  const files = await promises.readdir(targetDirectory, { withFileTypes: true });
  let result = [];
  files.forEach(function (file) {
    if (file.isFile() && WalkMeFileMatchCase.test(file.name))
      result.push({ name: file.name, directory: targetDirectory, fullPath: `${targetDirectory}\\${file.name}` });
  });
  return result;
}

async function getAllMatchingWalkMeFilesInfo() {
  let result = await getFilesInfo(targetDirectoryPath);
  return result;
}

async function getAllMatchingWalkMeInResponse(req, res) {
  let result = await getFilesInfo(targetDirectoryPath);
  res.send(result);
}

async function readWalkMeFile(req, res) {
  const { name } = req.body,
    targetJs = await import(`${TargetFolder}\\${name}`);
  walkMe.reset();
  targetJs && targetJs.default && typeof targetJs.default === "function" && targetJs.default();
  const mappedData = walkMe.get().flatMap(x => { return { index: x[0], ...x[1] }; }),
    result = mappedData.reduce((agg, cur) => {
      if (cur.target && cur.target === "launch") {
        agg.targetUrl = cur.arguments[0];
      } else {
        agg.commands.push(cur);
      }
      return agg;
    }, {
      targetUrl: '',
      commands: []
    });
  res.send(result);
}

export { getAllMatchingWalkMeFilesInfo, getAllMatchingWalkMeInResponse, readWalkMeFile };