# Quartierindex
Web-application to compare different districts in basel (Switzerland), based on statistical data

## Quickstart
npm install
npm start

## Convert CSV to normalized data
npm run setup

This file uses setup/convert.js to convert the file. Currently change filename there if necessary.
Important to note is, the expected header sorting:
Publikationsjahr,Indikator_Nr,jahr_num,jahr_char,Wert,Indikator_Name,Wohnviertel_id,Wohnviertel,Rang

The header names will be replaced and normalized, compare with output in directory data/normalized/*.json