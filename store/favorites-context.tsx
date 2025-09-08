import { createContext, useState, type ReactNode } from "react";

export const FavoritesContext: any = createContext({
  favorites: [],
  addFavorite: (id: any) => {},
  removeFavorite: (id: any) => {},
});

type Props = {
  children: ReactNode;
};

const FavoritesContextProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState([{}]);

  const addFavorite = (id: any) => {
    setFavorites((currentFavorites: any) => {
      return [...currentFavorites, id];
    });
  };
  const removeFavorite = (id: any) => {
    setFavorites((currentFavorites) => {
      return currentFavorites.filter((favoriteItem) => {
        return favoriteItem !== id;
      });
    });
  };

  const value = {
    favorites: favorites,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
