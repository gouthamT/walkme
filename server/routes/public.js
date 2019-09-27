import { join } from 'path';

const optionsToPublicFiles = {
  root: join(__dirname, '../../public'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

function publicFiles(req, res, next) {
  let fileName = req.params[0];
  res.sendFile(fileName, optionsToPublicFiles, function (err) {
    if (err) {
      console.error(err)
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
}

export default publicFiles;