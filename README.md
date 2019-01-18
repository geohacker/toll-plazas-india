# toll-plazas-india

Toll Plaza data from the National Highways Authority of India. This is scraped from the [Toll Information System](http://tis.nhai.gov.in).

[Here's a map](https://api.mapbox.com/styles/v1/geohacker/cjr0mtbwf0q8e2sqr5ilfteqd.html?fresh=true&title=true&access_token=pk.eyJ1IjoiZ2VvaGFja2VyIiwiYSI6ImFIN0hENW8ifQ.GGpH9gLyEg0PZf3NPQ7Vrg#4.58/20.76/83.45)

![screen shot 2019-01-17 at 6 46 28 pm](https://user-images.githubusercontent.com/371666/51321898-fe409d80-1a89-11e9-9ac7-1ba825960b6d.png)


## Data

* Contains 468 toll plazas with;
* Name
* Location (latitude, longitude)
* Capital cost in INR Crores
* Contractor details
* Cumulative revenue in INR Crores
* Date of commercial operation
* Date of fee notification
* Fee effective date
* Project type
* Rates (Car, Bus, 4-6 axle, HCM, LCV, Multiaxle, More than 7 axle)
* Traffic per day in [PCU](https://en.wikipedia.org/wiki/Passenger_car_equivalent)
* Target traffic per day in PCU


## Scripts

* `process.js` - cleans up the raw.json downloaded directly from http://tis.nhai.gov.in/tollplazasonmap?language=en
* `info.js` - fetches additional metadata

## License

This data came from NHAI and should ideally be under the [Government Open Data License](https://data.gov.in/government-open-data-license-india)