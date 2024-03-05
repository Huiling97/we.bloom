const formatPrice = (price: number) => {
  if (Number.isInteger(price)) {
    return price.toFixed(2);
  }
  return price;
};

export { formatPrice };
