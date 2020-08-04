const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const jsonFile = require('jsonfile');
const _ = require('lodash');

/*
###############################
INPUT
###############################
*/
const QUARTIERINDEX_2020 = path.join(__dirname, '../data/quartierindex_2020.csv')
const INDIKATOREN_TEXTE = path.join(__dirname, '../data/indikatoren_texte.tsv')

/*
###############################
OUTPUT
###############################
*/
const INDICATORS = path.join(__dirname, '../src/state/data/indicator.json');
const DISTRICTS = path.join(__dirname, '../src/state/data/district.json');
const OBSERVATIONS = path.join(__dirname, '../src/state/data/observation.json');
const SPIDER_RANKS = path.join(__dirname, '../data/spiderranks.json');

/*
 ###############################
 Helper functions
 ###############################
/* Returns the correct description for this indicator */
function getDescription(data) {
  indicator = _.find(indicatorDescWithoutHeader, item => item.id === data.indicatorId);
  return indicator.desc
}

function writeJsonFile(data, file) {
  fs.writeFile(file, JSON.stringify(data, null, 4), function(err) {check(err, file)});

}

function check(error, name) {
  error ? console.error(error) : console.info('Successfuly wrote ' + name);
}

/*
 ###############################
 Convert CSV to JS-Object
 ###############################
 */
// const data = fs.readFileSync(path.join(__dirname, '../data/spiderranks_2018.csv'), { encoding : 'utf8'});
const data = fs.readFileSync(QUARTIERINDEX_2020, { encoding : 'utf8'});

const options = {
  delimiter : ',',
  quote     : '"',
  
  // Rename column header, original was
  // Publikationsjahr,Indikator_Nr,jahr_num,jahr_char,Wert,Indikator_Name,Indicator_Label,Wohnviertel_id,Wohnviertel,Rang,Subjekt,Gewichtung_Text,Bewertung_Text,Einheit,wert_txt
  headers: 'publication,indicatorId,year,yearChar,value,indicatorName,indicatorLabel,districtId,district,ranking,subject,weightText,valuationText,unit,value_txt',
};

const dataObject = csvjson.toObject(data, options);
const dataWithoutHeader =  _.tail(dataObject);

/*
###############################
Convert TSV to JS-Object
###############################
*/
/* Gets the description for the indicators */
const indicator_desc = fs.readFileSync(INDIKATOREN_TEXTE, { encoding : 'utf8'});
const indicatorOptions = {
  delimiter : '\t',
  headers: "id\tname\tshortName\tdesc"
};
const indicatorDescObject = csvjson.toObject(indicator_desc, indicatorOptions);
const indicatorDescWithoutHeader =  _.tail(indicatorDescObject);

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
        yearText: data.yearChar,
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
writeJsonFile(indicatorData, INDICATORS);

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
writeJsonFile(districtData, DISTRICTS);

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
      value_unit: data.unit,
      value_txt: data.value_txt,
    }
});
writeJsonFile(valueData, OBSERVATIONS);

/*
 ###############################
 Export the whole data set in json, just for reference, debugging, checking
 ###############################
 */
writeJsonFile(valueData, SPIDER_RANKS);
