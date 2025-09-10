import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { UserInputContext } from "./user-input-context";

export const CartContext: any = createContext({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
});

type Props = {
  children: ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [cartItems, setCartItems] = useState(
    userInputCtx.input.cart.items ?? []
  );

  useEffect(() => {
    if (userInputCtx.input.cart.items) {
      setCartItems(userInputCtx.input.cart.items);
    }
  }, [userInputCtx.input.cart.items]);

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
    setCartItems((currentCartItems: any) => {
      const index = currentCartItems.findIndex((selectedItem: any) => {
        if (id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
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
            return c;
          }
        } else {
          return c;
        }
      });
      return updatedCartItems;
    });
  };

  const value = {
    cartItems: cartItems,
    addItem: addItem,
    removeItem: removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
