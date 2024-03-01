const {
  getCartProducts,
  addCartProduct,
  updateCartProducts,
} = require('./database.cjs');

const API_PATH = '/api/v1/carts-products';

const cartsProductsRequestHandler = (app) => {
  app.get(`${API_PATH}/all`, async (req, res) => {
    const cartProducts = await getCartProducts();
    res.status(200).send(cartProducts);
  });

  app.post(`${API_PATH}/all`, async (req, res) => {
    const { productId, price } = req.body;

    try {
      const updatedCart = await addCartProduct(productId, price);
      res.status(201).send(updatedCart);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error adding product ${productId}` });
    }
  });

  app.put(`${API_PATH}/all`, async (req, res) => {
    const { productId, updatedQuantity, updatedTotalPrice } = req.body;

    const updatedCart = await updateCartProducts(
      productId,
      updatedQuantity,
      updatedTotalPrice
    );
    res.status(200).send(updatedCart);
  });
};

module.exports = { cartsProductsRequestHandler };
