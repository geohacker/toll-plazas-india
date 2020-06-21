#!/bin/bash

timestamp=$(date +%d-%m-%Y)

echo '# Install packages...'
npm install
mkdir -p data/$timestamp
outputdir="data/$timestamp"

echo '# Downloading data from tis.nhai.gov.in...'
curl 'http://tis.nhai.gov.in/TollPlazaService.asmx/GetTollPlazaInfoForMapOnPC' \
  -X 'POST' \
  -H 'Connection: keep-alive' \
  -H 'Content-Length: 0' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H 'Origin: http://tis.nhai.gov.in' \
  -H 'Referer: http://tis.nhai.gov.in/map1.htm' \
  -H 'Accept-Language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'Cookie: ASP.NET_SessionId=sq2jlutmtqv1ohjyodtuzqpu' \
  --compressed \
  --insecure \
  --output $outputdir/raw.json

echo '# Preparing a JSON...'
node scripts/process.js $outputdir/raw.json > $outputdir/tolls-basic.json

echo '# Fetch additional information for each toll plaza'
node scripts/info.js $outputdir/tolls-basic.json > $outputdir/tolls-with-metadata.json

echo '# Convert to GeoJSON...'
node scripts/togeojson.js $outputdir/tolls-with-metadata.json > $outputdir/tolls-with-metadata.geojson

echo '# Convert to CSV...'
./node_modules/json2csv/bin/json2csv.js -i $outputdir/tolls-with-metadata.json -o $outputdir/tolls-with-metadata.csv

echo '# Done!'
