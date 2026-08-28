// for each toll in tolls.json, fetch additional metadata and create a clean json

const fs = require('fs');
const d3 = require('d3-queue');
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
moment.suppressDeprecationWarnings = true;
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');

const filename = argv._[0]
const tolls = JSON.parse(fs.readFileSync(path.join(__dirname, '..', filename), {'encoding': 'utf-8'}));

let tollUrl = 'https://tis.nhai.gov.in/TollInformation?TollPlazaID=';

const info = {};
const tollLookup = {};

const fetchInfo = (id, callback) => {
    let url = tollUrl + id;
    request(url, (err, response, body) => {
        console.error(url);
        if (!err) {
            info[id] = body;
        }
        callback(null);
    });
}

const q = d3.queue(10);

tolls.forEach(toll => {
    q.defer(fetchInfo, toll.id);
    tollLookup[toll.id] = toll;
});

q.awaitAll((err) => {
    Object.keys(info).forEach((k) => {
        parseTable(info[k], k);
    });
    console.log(JSON.stringify(tolls));
});

const dates = ['Date of fee notification', 'Commercial Operation Date'];

const tags = {
    'Date of fee notification': 'date_fee_notification',
    'Commercial Operation Date': 'date_commercial_operation',
    'Fee Rule': 'fee_rule',
    'Capital Cost of Project (in Rs. Cr.)': 'capital_cost',
    'Cumulative Toll Revenue (in Rs. Cr.)': 'cumulative_revenue',
    'Concessions Period': 'concessions_period',
    'Design Capacity (PCU)': 'design_capacity',
    'Traffic (PCU/day)': 'traffic_per_day',
    'Target Traffic (PCU/day)': 'target_traffic_per_day',
    'Name of Concessionaire / OMT Contractor': 'contractor_name',
    'Name / Contact Details of Incharge': 'contact_details'
};

const parseTable = (html, id) => {
    const $ = cheerio.load(html);
    const infoTable = $('.MT10').find('tr');
    let thisInfo = {} 
    infoTable.each(element => {
        let row = $(infoTable[element]).children('td');
        let cell1 = row.first().text().trim();
        let cell2 = row.last().text().trim();
        thisInfo[cell1] = cell2;
    });
    let thisToll = tollLookup[id];
    Object.keys(thisInfo).forEach(key => {
        try {
            if (key === 'Date of fee notification') {
                thisToll[tags[key]] = moment(thisInfo[key].split()[0]).format("DD-MM-YYYY");
            } else if (key === 'Commercial Operation Date') {
                thisToll[tags[key]] = moment(thisInfo[key]).format("DD-MM-YYYY");
            } else if (key === 'Traffic (PCU/day)' || key === 'Target Traffic (PCU/day)' || key === 'Cumulative Toll Revenue (in Rs. Cr.)') {
                thisToll[tags[key]] = parseFloat(thisInfo[key].split()[0]);
            }
            else {
                thisToll[tags[key]] = thisInfo[key];
            }
        } catch (error) {
            console.error('Failed parsing', key, thisInfo[key])
        }
    })
    delete thisToll.traffic;
    delete thisToll.target_traffic;
    delete thisToll.html;
    thisToll.fee_effective_date = moment(thisToll.fee_effective_date).format('DD-MM-YYYY');
}
