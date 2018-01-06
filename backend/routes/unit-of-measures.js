let express = require('express');
let router = express.Router();

let unitOfMeasures = {
  "unitOfMeasures": [{
    unitOfMeasureId: "46ecc167-d372-431a-aa62-df43e990c8e0",
    quantity: "length",
    name: "meter",
    symbol: "m",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c32278a6-86a6-41c1-bbef-7095a1e63f38",
    quantity: "mass",
    name: "kilogram",
    symbol: "kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "4eea084c-d7fc-11e7-9296-cec278b6b50a",
    quantity: "time",
    name: "second",
    symbol: "A",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "68eec2f0-d7fc-11e7-9296-cec278b6b50a",
    quantity: "electric current",
    name: "ampere",
    symbol: "s",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "a7fcd7e8-d7fc-11e7-9296-cec278b6b50a",
    quantity: "thermodynamic temperature",
    name: "kelvin",
    symbol: "K",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "b655f252-d7fc-11e7-9296-cec278b6b50a",
    quantity: "amount of substance",
    name: "mole",
    symbol: "mol",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "bea45f0c-d7fc-11e7-9296-cec278b6b50a",
    quantity: "luminous intensity",
    name: "candela",
    symbol: "cd",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c532fd56-d7fc-11e7-9296-cec278b6b50a",
    quantity: "area",
    name: "square meter",
    symbol: "m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "f1364362-d7fd-11e7-9296-cec278b6b50a",
    quantity: "volume",
    name: "cubic meter",
    symbol: "m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "fd54220e-d7fd-11e7-9296-cec278b6b50a",
    quantity: "volume",
    name: "cubic meter",
    symbol: "m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "ba0608cc-d7fe-11e7-9296-cec278b6b50a",
    quantity: "speed, velocity",
    name: "meter per second",
    symbol: "m/s²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "c605eeb2-d7fe-11e7-9296-cec278b6b50a",
    quantity: "wave number",
    name: "reciprocal meter",
    symbol: "m⁻¹",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "d1acfefe-d7fe-11e7-9296-cec278b6b50a",
    quantity: "mass density",
    name: "kilogram per cubic meter",
    symbol: "kg/m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "da9e69da-d7fe-11e7-9296-cec278b6b50a",
    quantity: "specific volume",
    name: "cubic meter per kilogram",
    symbol: "m³/kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "e29ca200-d7fe-11e7-9296-cec278b6b50a",
    quantity: "specific volume",
    name: "cubic meter per kilogram",
    symbol: "m³/kg",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "780d9ace-d7ff-11e7-9296-cec278b6b50a",
    quantity: "current density",
    name: "ampere per square meter",
    symbol: "A/m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "8369a05c-d7ff-11e7-9296-cec278b6b50a",
    quantity: "magnetic field strength  ",
    name: "ampere per meter",
    symbol: "A/m",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "8eeceeca-d7ff-11e7-9296-cec278b6b50a",
    quantity: "amount-of-substance concentration",
    name: "mole per cubic meter",
    symbol: "mol/m³",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "9617bf2c-d7ff-11e7-9296-cec278b6b50a",
    quantity: "luminance",
    name: "candela per square meter",
    symbol: "cd/m²",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }, {
    unitOfMeasureId: "a1b84afe-d7ff-11e7-9296-cec278b6b50a",
    quantity: "mass fraction",
    name: "kilogram per kilogram, which may be represented by the number 1",
    symbol: "kg/kg = 1",
    factor: "",
    otherSiBaseUnitsExpression: "",
    siBaseUnitsExpression: ""
  }]
};

// https://physics.nist.gov/cuu/Units/units.html
// To be added
// Table 3.  SI derived units with special names and symbols
// Table 4.  Examples of SI derived units whose names and symbols include SI derived units with special names and symbols
// Table 5.  SI prefixes
// Table 6.  Units outside the SI that are accepted for use with the SI
// Prefixes for binary multiples
router.get('/', function(req, res, next) {
  // assetTypes.assetTypes.filter(t => {
  //   t.name.search()
  // });
  res.send(JSON.stringify(unitOfMeasures));
});

module.exports = router;