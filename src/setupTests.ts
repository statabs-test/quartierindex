const Enzyme = require('enzyme');

// Adapter to used react version
const EnzymeAdapter = require('enzyme-adapter-react-16');

// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
