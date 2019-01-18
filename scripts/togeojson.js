const fs = require('fs');
const moment = require('moment');

tolls = JSON.parse(fs.readFileSync('data/tolls-with-metadata.json', {encoding: 'utf-8'}));

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