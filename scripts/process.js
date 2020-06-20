// parse raw dump of tolls into a clean JSON file.
// to be run before info.js

const fs = require('fs');
const tabletojson = require('tabletojson');

data = JSON.parse(fs.readFileSync('./data/raw.json', {'encoding': 'utf-8'}));

const allBooths = [];

const parseHtml = (thisBooth) => {
    json = tabletojson.convert(thisBooth.html);
    // car, lcv, bus, 3 axle, 4to6, hcm, 7+
    let car = json[0][0];
    let lcv = json[0][1];
    let bus = json[0][2];
    let three = json[0][3];
    let fourtosix = json[0][4];
    let hcm = json[0][5];
    let seven = json[0][6];

    thisBooth.rates.car_multi = parseFloat(car['Single Journey']);
    thisBooth.rates.car_monthly = parseFloat(car['Return Journey']);

    thisBooth.rates.lcv_multi = parseFloat(lcv['Single Journey']);
    thisBooth.rates.lcv_monthly = parseFloat(lcv['Return Journey']);

    thisBooth.rates.bus_multi = parseFloat(bus['Single Journey']);
    thisBooth.rates.bus_monthly = parseFloat(bus['Return Journey']);

    thisBooth.rates.multiaxle_single = parseFloat(three['7 or more Axle']);
    thisBooth.rates.multiaxle_multi = parseFloat(three['Single Journey']);
    thisBooth.rates.multiaxle_monthly = parseFloat(three['Return Journey']);

    thisBooth.rates.hcm_single = parseFloat(hcm['7 or more Axle']);
    thisBooth.rates.hcm_multi = parseFloat(hcm['Single Journey']);
    thisBooth.rates.hcm_monthly = parseFloat(hcm['Return Journey']);

    thisBooth.rates.four_six_axle_single = parseFloat(fourtosix['7 or more Axle']);
    thisBooth.rates.four_six_axle_multi = parseFloat(fourtosix['Single Journey']);
    thisBooth.rates.four_six_axle_monthly = parseFloat(fourtosix['Return Journey']);
    
    thisBooth.rates.seven_plus_axle_single = parseFloat(seven['7 or more Axle']);
    thisBooth.rates.seven_plus_axle_multi = parseFloat(seven['Single Journey']);
    thisBooth.rates.seven_plus_axle_monthly = parseFloat(seven['Return Journey']);

    // fee date
    thisBooth.fee_effective_date = new Date(thisBooth.html.split('Fee Effective Date')[1].split('</p>')[0].split('</b>')[1]).toDateString();
    return thisBooth;
};


const tollBooth = () => {
    return {
        name: null,
        id: null,
        lat: null,
        lon: null,
        cumulative_revenue: null,
        traffic: null,
        target_traffic: null,
        design_capacity: null,
        fee_effective_date: null,
        rates: {
            car_single: null,
            car_multi: null,
            car_monthly: null,
            lcv_single: null,
            lcv_multi: null,
            lcv_monthly: null,
            bus_multi: null,
            bus_monthly: null,
            multiaxle_single: null,
            multiaxle_multi: null,
            multiaxle_monthly: null,
            hcm_single: null,
            hcm_multi: null,
            hcm_monthly: null,
            four_six_axle_single: null,
            four_six_axle_multi: null,
            four_six_axle_monthly: null,
            seven_plus_axle_single: null,
            seven_plus_axle_multi: null,
            seven_plus_axle_monthly: null
        },
        location: null,
        capital_cost: null,
        project_type: null,
        html: null
    }
};

data.d.forEach(element => {
    let thisBooth = tollBooth();
    thisBooth.name = element.TollName;
    thisBooth.id = parseInt(element.TollPlazaID);
    thisBooth.lat = parseFloat(element.latitude);
    thisBooth.lon = parseFloat(element.longitude);
    thisBooth.cumulative_revenue = element.ComulativeRevenue;
    thisBooth.traffic = element.Traffic;
    thisBooth.target_traffic = element.TargetTrafic;
    thisBooth.design_capacity = element.DesignCapacity;
    thisBooth.location = element.Location;
    thisBooth.capital_cost = element.CapitalCost;
    thisBooth.project_type = element.ProjectType;
    thisBooth.html = element.HtmlPopup;
    thisBooth = parseHtml(thisBooth);

    allBooths.push(thisBooth);
});

console.log(JSON.stringify(allBooths));