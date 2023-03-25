const path = require('path');
const c = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(cors())

app.use(bodyParser.json({limit: '2500mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '2500mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '2500mb'}));
app.use(express.urlencoded({limit: '2500mb'}));

function loadApps() {
    const appNames = c.appsDirectory;
    appNames.forEach(appName => {
      const a = require(`${c.appDirectory}/${appName}/router.js`);
      app.use(a);
    });
}
  
loadApps()

app.listen(8000);
