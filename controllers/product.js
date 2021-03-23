const Product = require('../models/ProductModel');
const hanldeMultipleFilter = require('../utils/hanldeMultipleFilter');

exports.getAllProduct = (_, res) => {
  Product.find()
    .exec()
    .then((listProducst) => {
      res.json({ list: listProducst });
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postFilterProduct = (req, res) => {
  const option = req.body;
  const query = Product.find();

  hanldeMultipleFilter(option, query, (err, data) => {
    if (err) {
      return res.status(404).send({ error: 'some error occured' });
    }
    res.json(data);
  });
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .exec()
    .then((product) => {
      res.json({ product });
    })
    .catch((err) => {
      console.error(err);
    });
};
