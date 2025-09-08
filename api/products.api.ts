export const fetchProductsData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const resData = await response.json();
  return resData;
};
