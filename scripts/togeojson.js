const fs = require('fs');

tolls = JSON.parse(fs.readFileSync('data/tolls-with-metadata.json', {encoding: 'utf-8'}));

const featureCollection = {
    'type': 'FeatureCollection',
    'features': []
}

tolls.forEach(element => {
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