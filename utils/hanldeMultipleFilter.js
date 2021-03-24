//DEFINE TYPE OF OPTION
// let OPTION = {
//   key: {
//     field: "price"
//     selectType: 'RANGE',
//     value: [0, 1],
//   },
//   key: {
//     field: "mainColor"
//     selectType: 'SIGLE_OF_ARRAY',
//     value: ['black', 'red'],
//   },
//   key: {
//     field: "mainColor"
//     selectType: 'SIGLE_OF_ARRAY',
//     value: null,
// },

function hanldeMultipleFilter(option, queryObj, callback) {
  for (key in option) {
    if (!option[key].value) {
      continue;
    }
    let fieldName;
    switch (option[key].selectType) {
      case 'RANGE':
        fieldName = option[key].field;
        let filter = {
          [fieldName]: {
            $gte: option[key].value[0],
            $lte: option[key].value[1],
          },
        };
        queryObj.find(filter);
        continue;
      case 'SIGLE_OF_ARRAY':
        fieldName = option[key].field;
        queryObj.find({ [fieldName]: option[key].value });
        continue;
      default:
        continue;
    }
  }
  return queryObj
    .exec()
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
}
module.exports = hanldeMultipleFilter;
