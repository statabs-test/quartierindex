# Quartierindex
Web-application to compare different districts in basel (Switzerland), based on statistical data

## Quickstart
Clone the project
```
git clone git@github.com:statabs-test/quartierindex.git
cd quartierindex
````

Install all dependencies and start the server
```
npm install
npm start
```

## Update source data
The data is precalculated from the given CSV and TSV files. If new data is published the data must be precalculated.
```
npm run setup
```

This file uses setup/convert.js to convert the input data located in ./data in JSON files which are located in the ./src/state/data direcotry. If the header order change, then the script must be updated.

The header names will be replaced and normalized, compare with output in directory.

## Publish site
To publish the site run the deploy command
```
npm run deploy
```
With this command the current changes are published to the Github pages which can be accessed under [https://statabs-test.github.io/quartierindex](https://statabs-test.github.io/quartierindex/#/)

## Authors
- Denis Augsburger
- Fabrizio Parillo
- Nicolas Mauchle
