const retrieveCartItemsId = (cartItems) => {
  return cartItems.map((item) => ({ id: item.id, quantity: item.quantity }));
};

module.exports = { retrieveCartItemsId };
