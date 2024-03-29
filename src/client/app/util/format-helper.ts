const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString(undefined, options);
};

const formatPrice = (price: number) => {
  if (Number.isInteger(price)) {
    return price.toFixed(2);
  }
  return price;
};

export { formatDateTime, formatPrice };
