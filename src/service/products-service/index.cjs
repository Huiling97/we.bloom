const { getProducts, addProduct, deleteProduct } = require('./database.cjs');

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

  app.delete('/api/v1/products/all/:id', async (req, res) => {
    const productId = req.params.id;

    await deleteProduct(productId);
    res.status(200).json('Product has been deleted successfully');
  });
};

module.exports = { productsRequestHandler };
