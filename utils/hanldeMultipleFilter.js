//DEFINE TYPE OF OPTION
// let OPTION = {
//   key: {
//     dbField: "price"
//     selecType: 'RANGE',
//     value: [0, 1],
//   },
//   key: {
//     dbField: "mainColor"
//     selecType: 'SIGLE_OF_ARRAY',
//     value: ['black', 'red'],
//   },
//   key: null,
// };

function hanldeMultipleFilter(option, queryObj, callback) {
  let query = queryObj;
  for (key in option) {
    if (!option[key]) {
      continue;
    }
    switch (option.key.selecType) {
      case 'RANGE':
        return query.find({
          key: { $gte: option.key[0], $lte: option.key[1] },
        });
      case 'SIGLE_OF_ARRAY':
        return query.find({ key: option.key });
      default:
        return query;
    }
  }
  return query
    .exec()
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
}
module.exports = hanldeMultipleFilter;
