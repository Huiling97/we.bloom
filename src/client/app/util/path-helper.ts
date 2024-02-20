const isManageStorePage = () => {
  const path = /^\/manage\/products/;
  return path.test(window.location.pathname);
};

export { isManageStorePage };
