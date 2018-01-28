const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const jsonFile = require('jsonfile');
const _ = require('lodash');

/*
 ###############################
 Convert CSV to JS-Object
 ###############################
 */
const data = fs.readFileSync(path.join(__dirname, '../data/spiderranks_2017.csv'), { encoding : 'utf8'});

const options = {
  delimiter : ',', // optional

  // Rename column header, original was
  // Publikationsjahr,Indikator_Nr,jahr_num,jahr_char,Wert,Indikator_Name,Wohnviertel_id,Wohnviertel,Rang
  headers: 'publication,indicatorId,year,yearChar,value,indicatorName,districtId,district,ranking',
};

const dataObject = csvjson.toObject(data, options);
const dataWithoutHeader =  _.tail(dataObject);

/*
 ###############################
 Export normalized indicator data
 ###############################
 */
const indicatorData = _.uniqBy(
  _.map(dataWithoutHeader, (data) => {
    return {
        id: data.indicatorId,
        name: data.indicatorName,
        publication: data.publication,
        year: data.year
    }
  }),
  'id'
);

jsonFile.writeFile(path.join(__dirname, '../src/state/data/indicator.json'), indicatorData, function(err) {
  err ?
    console.error(err) :
    console.info('Successfuly wrote indicator.json file');
});

/*
 ###############################
 Export normalized district data
 ###############################
 */
const districtData = _.uniqBy(
  _.map(dataWithoutHeader, (data) => {
    return {
      id: data.districtId,
      name: data.district,
    }
  }),
  'id'
);

jsonFile.writeFile(path.join(__dirname, '../src/state/data/district.json'), districtData, function(err) {
  err ?
    console.error(err) :
    console.info('Successfuly wrote district.json file');
});

/*
 ###############################
 Export normalized value data
 ###############################
 */
let valueId = 0;
const valueData = _.map(dataWithoutHeader, (data) => {
  valueId = valueId + 1;
    return {
      id: valueId,
      districtId: data.districtId,
      indicatorId: data.indicatorId,
      value: parseFloat(data.value),
      ranking: data.ranking,
    }
});

jsonFile.writeFile(path.join(__dirname, '../src/state/data/observation.json'), valueData, function(err) {
  err ?
    console.error(err) :
    console.info('Successfuly wrote observation.json file');
});


/*
 ###############################
 Export the whole data set in json, just for reference, debugging, checking
 ###############################
 */
const outputPath = path.join(__dirname, '../data/spiderranks.json');
jsonFile.writeFile(outputPath, dataWithoutHeader, function(err) {
  err ?
    console.error(err) :
    console.info('Successfuly exported spiderranks.json file');
});