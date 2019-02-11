# Quartierindex
Web-application to compare different districts in basel (Switzerland), based on statistical data.

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

This file uses *setup/convert.js* to convert the input data located in *./data* directory into JSON files which are located in the *./src/state/data* direcotry. If the header order change, then the script must be updated.

The header names will be replaced and normalized, compare with output in directory. It is also important that the source file are in UTF-8 and not latin1 or any other encoding.

## Publish site
To publish the site run the deploy command
```
npm run deploy
```
With this command the current changes are published to the Github pages which can be accessed under [https://statabs-test.github.io/quartierindex](https://statabs-test.github.io/quartierindex/#/).

If the changes are not visible, delete your cache or visit the site in the private/incognito mode.

## Authors
- Denis Augsburger
- Fabrizio Parillo
- Nicolas Mauchle
