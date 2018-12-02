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
const data = fs.readFileSync(path.join(__dirname, '../data/spiderranks_2018.csv'), { encoding : 'utf8'});

const options = {
  delimiter : ',', // optional
  
  // Rename column header, original was
  // Publikationsjahr,Indikator_Nr,jahr_num,jahr_char,Wert,Indikator_Name,Indicator_Label,Wohnviertel_id,Wohnviertel,Rang,Subjekt,Gewichtung_Text,Bewertung_Text
  headers: 'publication,indicatorId,year,yearChar,value,indicatorName,indicatorLabel,districtId,district,ranking,subject,weightText,valuationText',
};

const dataObject = csvjson.toObject(data, options);
const dataWithoutHeader =  _.tail(dataObject);

/* Gets the description for the indicators */
const indicator_desc = fs.readFileSync(path.join(__dirname, '../data/indikatoren_texte.tsv'), { encoding : 'utf8'});
const indicatorOptions = {
  delimiter : '\t',
  headers: "id\tname\tshortName\tdesc"
};
const indicatorDescObject = csvjson.toObject(indicator_desc, indicatorOptions);
const indicatorDescWithoutHeader =  _.tail(indicatorDescObject);

/* Returns the correct description for this indicator */
function getDescription(data) {
  indicator = _.find(indicatorDescWithoutHeader, item => item.id === data.indicatorId);
  return indicator.desc
}

/*
 ###############################
 Export normalized indicator data
 ###############################
 */
const indicatorData = _.uniqBy(
  _.map(dataWithoutHeader, (data) => {
    return {
        id: data.indicatorId,
        name: data.indicatorLabel,
        subject: data.subject,
        publication: data.publication,
        year: data.year,
        // Compare with indicator types
        valuation: 1,
        valuationText: data.valuationText,
        weight: 1,
        weightText: data.weightText,
        description: getDescription(data)
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
      viewOptions: {
        highlight: false,
        hover: false
      }
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
// Observations between 0 and 1, use per indicator
const normalizeValue = (val, max, min) =>  {
  return (val - min) / (max - min);
};

const groupObservationsByIndicator = (data) => {
  return _.groupBy(data, 'indicatorId');
};

let valueId = 0;
const indicatorGroupedData = groupObservationsByIndicator(dataWithoutHeader);
const valueData = _.map(dataWithoutHeader, (data) => {
  const min = _.minBy(indicatorGroupedData[data.indicatorId], function(indicator) {
      return parseFloat(indicator.value);
  });
  const max = _.maxBy(indicatorGroupedData[data.indicatorId], function(indicator) {
      return parseFloat(indicator.value);
  });
  valueId = valueId + 1;
    return {
      id: valueId,
      districtId: data.districtId,
      indicatorId: data.indicatorId,
      value: parseFloat(data.value),
      normValue: normalizeValue(parseFloat(data.value), max.value, min.value),
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
