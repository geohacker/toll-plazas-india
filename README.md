# toll-plazas-india

Toll Plaza data from the National Highways Authority of India. This is scraped from the [Toll Information System](http://tis.nhai.gov.in).

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