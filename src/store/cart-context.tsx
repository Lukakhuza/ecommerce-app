import { createContext, useContext, useEffect, useState } from 'react';
import { addToCartInDatabase, updateCartInDatabase } from '../api/cart.api';
import { Props } from '../types/general';
import { ProductData } from '../types/product';
import { UserInputContext } from './user-input-context';
import { CartItem, CartItems } from '../types/cart';

type CartContextType = {
  cartItems: CartItems;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  addProductToCart: (productData: ProductData) => void;
  isLoading: boolean;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: (item: CartItem) => {},
  clearCart: () => {},
  removeItem: () => {},
  addProductToCart: (item: Object) => {},
  isLoading: true,
});

const CartContextProvider = ({ children }: Props) => {
  const userInputCtx = useContext(UserInputContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>(
    userInputCtx.userInput?.cart?.items ?? [],
  );

  const [userId, setUserId] = useState(userInputCtx.userInput.id.value ?? '');

  useEffect(() => {
    if (userInputCtx.userInput.cart.items) {
      setCartItems(userInputCtx.userInput.cart.items);
    }
  }, [userInputCtx.userInput.cart.items]);

  useEffect(() => {
    // Whenever cartItems state changes, send the updated carts to the database.
    const data = {
      userId: userInputCtx.userInput.id.value,
      cartItems: cartItems,
    };
    updateCartInDatabase(data);
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    setCartItems((currentCartItems: CartItems) => {
      const index = currentCartItems.findIndex((selectedItem: CartItem) => {
        if (item._id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let updatedCartItems = currentCartItems.map((c: CartItem, i: number) => {
        if (i === index) {
          const updatedItem = {
            _id: c._id,
            product: c.product,
            quantity: c.quantity + 1,
          };
          return updatedItem;
        } else {
          return c;
        }
      });

      return updatedCartItems;
    });
    return cartItems;
  };

  const removeItem = (id: string) => {
    // Update context
    setCartItems((currentCartItems: CartItems) => {
      const index = currentCartItems.findIndex((selectedItem: CartItem) => {
        if (id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let deletedItemIndex = -1;
      let updatedCartItems = currentCartItems.map((c: CartItem, i: number) => {
        if (i === index) {
          if (c.quantity > 1) {
            const updatedItem = {
              _id: c._id,
              product: c.product,
              quantity: c.quantity - 1,
            };
            return updatedItem;
          } else {
            const updatedItem = {
              _id: c._id,
              product: c.product,
              quantity: 0,
            };
            deletedItemIndex = i;
            return updatedItem;
          }
        } else {
          return c;
        }
      });
      updatedCartItems = updatedCartItems.filter(
        (element: CartItem, index: Number) => index !== deletedItemIndex,
      );

      return updatedCartItems;
    });
  };

  const addProductToCart = async (data: ProductData) => {
    setIsLoading(true);
    // Update cart in the database:
    const response = await addToCartInDatabase(data);
    // Update cartItems
    setCartItems(response.userData.cart.items);
    setIsLoading(false);
  };

  const clearCart = () => {
    setIsLoading(true);
    setCartItems([]);
    setIsLoading(false);
  };

  const value = {
    cartItems: cartItems,
    isLoading: isLoading,
    clearCart: clearCart,
    addItem: addItem,
    removeItem: removeItem,
    addProductToCart: addProductToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
