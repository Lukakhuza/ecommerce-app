import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import { FavoritesContext } from '../../store/favorites-context';
import { ProductsContext } from '../../store/products-context';
import ProductItem from '../molecules/ProductItem';
import { HomeTabNavigationProp } from '../../types/navigation';
import { Product } from '../../types/product';

type Props = {
  selection: string;
  headerTextStyle?: TextStyle;
  products: Product[];
};

const ProductList = ({ selection, headerTextStyle }: Props) => {
  const navigation: HomeTabNavigationProp = useNavigation();
  const { products, updateSelectedCategory } = useContext(ProductsContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const favoritesPressHandler = (id: number) => {
    if (!favorites.includes(id)) {
      addFavorite(id);
    } else {
      removeFavorite(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextStyle]}>{selection}</Text>
        <Pressable
          onPress={() => {
            updateSelectedCategory('All');
            navigation.navigate('Welcome');
          }}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal={true}
        data={products}
        renderItem={itemData => {
          const item = itemData.item;
          return (
            <ProductItem
              itemData={itemData}
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  product: item,
                });
              }}
              onFavoritesPress={() => {
                favoritesPressHandler(item.id);
              }}
              favoritesIcon={
                favorites.includes(item.id) ? 'heart' : 'heart-outline'
              }
            />
          );
        }}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerText: { fontSize: 21, fontWeight: 700 },
  seeAllText: { fontSize: 17 },
});
