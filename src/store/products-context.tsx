import { createContext, useEffect, useState, type ReactNode } from 'react';
import { fetchProductsData } from '../api/products.api';

export const ProductsContext: any = createContext({
  products: {},
  selectedCategory: '',
  updateSelectedCategory: (category: any) => {},
});

type Props = {
  children: ReactNode;
};

const ProductsContextProvider = ({ children }: Props) => {
  const [fetchedProductsData, setFetchedProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getProductsData = async () => {
      const productsData = await fetchProductsData();
      setFetchedProductsData(productsData);
    };
    getProductsData();
  }, []);

  const updateSelectedCategory = (category: any) => {
    setSelectedCategory(category);
  };

  const value = {
    products: fetchedProductsData,
    selectedCategory: selectedCategory,
    updateSelectedCategory: updateSelectedCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsContextProvider;
