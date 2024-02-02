const { getProducts, addProduct } = require('./database.cjs');

const productsRequestHandler = (app) => {
  app.get('/api/v1/products/all', async (req, res) => {
    const products = await getProducts();
    res.status(200).send(products);
  });

  app.post('/api/v1/products/all', async (req, res) => {
    const {
      brand,
      category,
      name,
      price,
      size,
      details,
      how_to_use,
      ingredients,
    } = req.body;

    const addedProduct = await addProduct(
      brand,
      category,
      name,
      price,
      size,
      details,
      how_to_use,
      ingredients
    );
    res.status(201).send(addedProduct);
  });
};

module.exports = { productsRequestHandler };
