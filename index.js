const process = require('process');
const express = require('express');
const app = express();
const router = require('router');
let appPort, staticFilePath, appRoot;
try {
  const config = require('config.json');
  appPort = config.service.port || 3000;
  staticFilePath = config.service.staticFilePath || 'public';
  appRoot = config.service.root || '/' ;
}
catch(e) {
  console.error('Can\'t load config.json');
  console.error(e);
  process.exit(1);
}

app.set('view engine', 'pug');

app.use(appRoot + 'static', express.static(staticFilePath));

app.use(appRoot, router);

app.listen(appPort, function () {
  console.log(`Service listening on port ${appPort}`);
});
