const {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require('./database.cjs');

const API_PATH = '/api/v1/products';

const productsRequestHandler = (app) => {
  app.get(`${API_PATH}/all`, async (req, res) => {
    const products = await getProducts();
    res.status(200).send(products);
  });

  app.get(`${API_PATH}/:id`, async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send({ error: `Invalid product id: ${id}` });
    }

    const selectedProduct = await getProduct(id);
    if (selectedProduct) {
      res.status(200).send(selectedProduct);
    } else {
      res.status(404).send({ error: `Product ${id} not found` });
    }
  });

  app.post(`${API_PATH}/all`, async (req, res) => {
    const { brand, category, name, price, size, details, usage, ingredients } =
      req.body;

    const addedProduct = await addProduct(
      brand,
      category,
      name,
      price,
      size,
      details,
      usage,
      ingredients
    );
    res.status(201).send(addedProduct);
  });

  app.put(`${API_PATH}/all`, async (req, res) => {
    const {
      brand,
      category,
      name,
      price,
      size,
      details,
      usage,
      ingredients,
      id,
    } = req.body;

    const updatedProductList = await editProduct(
      brand,
      category,
      name,
      price,
      size,
      details,
      usage,
      ingredients,
      id
    );
    res.status(200).json(updatedProductList);
  });

  app.delete(`${API_PATH}/:id`, async (req, res) => {
    const productId = req.params.id;

    await deleteProduct(productId);
    res.status(200).json('Product has been deleted successfully');
  });
};

module.exports = { productsRequestHandler };
