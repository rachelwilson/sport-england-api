var cors = require('cors');
var express = require('express');
var app = express();
var path = require('path');

function isEmpty(str) {
  //if empty, null or undefined
  return (!str || 0 === str.length);
}

const all_sites = require(__dirname + '/public/json/newcastle.json');

var port = process.env.PORT || 3000;

app.use(cors());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'))
});

app.get('/sites', function(req, res) {

  if (!isEmpty(req.query.family_friendly) && !isEmpty(req.query.pool)) {
    console.log('looking for family friendly pools')
    res.json(
      all_sites.items.filter((site) => (site.data.facilities.find((facility) => facility.facilitySubType === 'Leisure Pool'
                                                                             || facility.facilitySubType === 'Learner/Teaching/Training')))
    )
  } else if (!isEmpty(req.query.accessible)) {
    console.log('looking for accessible sites')
    res.json(
      all_sites.items.filter((site) => Boolean(site.data.disability.equipped.parking) === Boolean(req.query.accessible))
    )
  } else {
    console.log('return all sites')
    res.json(all_sites)
  }
})

app.listen(port, function() {
    console.log((new Date()).toISOString() + " App is running on port " + port);
});

module.exports = app;
