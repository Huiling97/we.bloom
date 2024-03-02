const {
  getCartProducts,
  addCartProduct,
  updateCartProducts,
  deleteCartProduct,
} = require('./database.cjs');

const API_PATH = '/api/v1/carts-products';

const cartsProductsRequestHandler = (app) => {
  app.get(`${API_PATH}/all`, async (req, res) => {
    try {
      const cartProducts = await getCartProducts();
      res.status(200).send(cartProducts);
    } catch (e) {
      res.status(400).send({ error: 'Error fetching cart items' });
    }
  });

  app.post(`${API_PATH}/all`, async (req, res) => {
    const { productId, price } = req.body;

    try {
      const updatedCart = await addCartProduct(productId, price);
      res.status(201).json({
        message: 'Cart item added successfully',
        updatedCart: updatedCart,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error adding product ${productId} into cart` });
    }
  });

  app.put(`${API_PATH}/all`, async (req, res) => {
    const { productId, updatedQuantity, updatedTotalPrice } = req.body;

    try {
      const updatedCart = await updateCartProducts(
        productId,
        updatedQuantity,
        updatedTotalPrice
      );
      res.status(200).json({
        message: 'Updated cart item successfully',
        updatedCart: updatedCart,
      });
    } catch (e) {
      res
        .status(400)
        .send({ error: `Error updating product ${productId} in cart` });
    }
  });

  app.delete(`${API_PATH}/:id`, async (req, res) => {
    const productId = req.params.id;

    try {
      const updatedCart = await deleteCartProduct(productId);
      res.status(200).json({
        message: 'Product has been removed from cart successfully',
        updatedCart: updatedCart,
      });
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error removing product ${productId} from cart` });
    }
  });
};

module.exports = { cartsProductsRequestHandler };
