import { createContext, useEffect, useState, type ReactNode } from 'react';
import { fetchProductsData } from '../api/products.api';
import { Product } from '../types/product';

type ProductsContextType = {
  products: Product[];
  selectedCategory: string;
  updateSelectedCategory: (category: string) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  selectedCategory: '',
  updateSelectedCategory: (category: string) => {},
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

  const updateSelectedCategory = (category: string) => {
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
