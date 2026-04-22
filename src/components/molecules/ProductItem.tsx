import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/colors';
import FavoriteIcon from '../atoms/FavoriteIcon';
import { ListRenderItemInfo } from 'react-native';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';

type Item = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type Props = {
  itemData: ListRenderItemInfo<Item>;
  onPress: () => void;
  onFavoritesPress: () => void;
  favoritesIcon: IoniconsIconName;
};

const ProductItem = ({
  itemData,
  onPress,
  onFavoritesPress,
  favoritesIcon,
}: Props) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.favIcon}>
        <FavoriteIcon
          name={favoritesIcon}
          size={30}
          color={Colors.black}
          onPress={onFavoritesPress}
        />
      </View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Image source={{ uri: itemData.item.image }} style={styles.image1} />
        <Text numberOfLines={1}>{itemData.item.title}</Text>
        <Text style={{ fontWeight: 700 }}>{`$${itemData.item.price}`}</Text>
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    backgroundColor: Colors.bgLight2,
    height: 'auto',
    width: 150,
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  favIcon: { position: 'absolute', right: 15, top: 15, zIndex: 1 },
  image1: {
    width: '100%',
    marginTop: 25,
    marginBottom: 10,
    height: 120,
    zIndex: 0,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  pressed: {
    opacity: 0.5,
  },
});
