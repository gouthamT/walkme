const fs = require('fs'),
  targetJsonPath = './package.json',
  folderName = './walkme',
  fileName = `${folderName}\\sample.walkme.js`,
  quarrySample = `function start() {
    walkMe.launch('http://localhost:3000/')
    .addScenario('fill form')
    .addStep('fill search string with raichu')
    .fillInputByTagName('input', 0, 'raichu', 100)
    .wait(1)
  }`;

function updatePackageJson() {
  let rawdata = fs.readFileSync(targetJsonPath), packageJson = JSON.parse(rawdata);
  if (packageJson) {
    const { startToppings } = packageJson.scripts;

    if (!startToppings) {
      packageJson.scripts.startWalkme = 'node node_modules/walkme/startWalkme';
    }

    fs.writeFileSync(targetJsonPath, JSON.stringify(packageJson, null, 2));
  }
}


// async
function updateTargetDirectory() {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      if (!fs.existsSync(fileName)) {
        fs.writeFile(fileName, quarrySample, function (err) {
          if (err) throw err;
          console.log('Done');
        });
      }
    }
  } catch (err) {
    console.error(err)
  }

  console.log('Done');
}

updatePackageJson();
updateTargetDirectory();