const fs = require('fs');
const moment = require('moment');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const filename = argv._[0]
tolls = JSON.parse(fs.readFileSync(path.join(__dirname, '..', filename), {'encoding': 'utf-8'}));

const featureCollection = {
    'type': 'FeatureCollection',
    'features': []
}

tolls.forEach(element => {
    element.capital_cost = parseFloat(element.capital_cost);
    element.start_year = moment(element.date_commercial_operation, 'DD-MM-YYYY').year();
    let feature = {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [element.lon, element.lat]
        },
        'properties': element
    }

    featureCollection.features.push(feature);
});

console.log(JSON.stringify(featureCollection));