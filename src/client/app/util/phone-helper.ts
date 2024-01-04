const isValidPhone = (phone: string) => {
  const regex = /^[0-9]{8}$/;
  return regex.test(phone);
};

export { isValidPhone };
