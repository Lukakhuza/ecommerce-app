import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserInputContext } from "./user-input-context";
import { addToCartInDatabase, updateCartInDatabase } from "../api/cart.api";
import { clearCartInDatabase } from "../api/users.api";

export const CartContext: any = createContext({
  cartItems: [],
  addItem: () => {},
  clearCart: () => {},
  removeItem: () => {},
  addProductToCart: (item: Object) => {},
});

type Props = {
  children: ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(
    userInputCtx.userInput.cart.items ?? []
  );
  const [userId, setUserId] = useState(userInputCtx.userInput.id.value ?? "");

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
    // console.log("Test 14", data.cartItems);
    updateCartInDatabase(data);
  }, [cartItems]);

  const addItem = (item: any) => {
    setCartItems((currentCartItems: any) => {
      const index = currentCartItems.findIndex((selectedItem: any) => {
        if (item._id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let updatedCartItems = currentCartItems.map((c: any, i: number) => {
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

  const removeItem = (id: any) => {
    // Update context
    setCartItems((currentCartItems: any) => {
      const index = currentCartItems.findIndex((selectedItem: any) => {
        if (id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let deletedItemIndex = -1;
      let updatedCartItems = currentCartItems.map((c: any, i: number) => {
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
        (element: any, index: Number) => index !== deletedItemIndex
      );

      return updatedCartItems;
    });
  };
  const addProductToCart = async (data: any) => {
    setIsLoading(true);
    // Update cart in the database:
    const response = await addToCartInDatabase(data);
    // Update cartItems
    setCartItems(response.user.cart.items);
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
