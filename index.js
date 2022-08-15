const path = require('path');
const c = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function loadApps() {
    const appNames = c.appsDirectory;
    appNames.forEach(appName => {
      const a = require(`${c.appDirectory}/${appName}/router.js`);
      app.use(a);
    });
}
  
loadApps()

app.listen(8000);
