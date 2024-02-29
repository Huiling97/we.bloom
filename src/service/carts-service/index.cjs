const { getCartProducts } = require('./database.cjs');

const API_PATH = '/api/v1/carts-products';

const cartsProductsRequestHandler = (app) => {
  app.get(`${API_PATH}/all`, async (req, res) => {
    const cartProducts = await getCartProducts();
    res.status(200).send(cartProducts);
  });
};

module.exports = { cartsProductsRequestHandler };
