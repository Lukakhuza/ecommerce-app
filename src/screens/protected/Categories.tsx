import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/atoms/ScreenContainer';
import CategoryItemLarge from '../../components/molecules/CategoryItemLarge';
import { ProductsContext } from '../../store/products-context';

type Props = {
  navigation: any;
};

const Categories = ({ navigation }: Props) => {
  const { products, updateSelectedCategory }: any = useContext(ProductsContext);

  const categoryPressHandler = (category: String) => {
    updateSelectedCategory(category);
    navigation.navigate('Welcome');
  };

  return (
    <ScreenContainer style={{ flex: 1, paddingBottom: 24 }}>
      <Text style={styles.title}>Shop by Categories</Text>
      <View style={styles.categoriesContainer}>
        <CategoryItemLarge
          category="Jackets"
          onPress={() => {
            categoryPressHandler('Jackets');
          }}
          imageUri={products[2]?.image}
        />
        <CategoryItemLarge
          category="Tops"
          onPress={() => {
            categoryPressHandler('Tops');
          }}
          imageUri={products[1]?.image}
        />
        <CategoryItemLarge
          category="Tech"
          onPress={() => {
            categoryPressHandler('Tech');
          }}
          imageUri={products[8]?.image}
        />
        <CategoryItemLarge
          category="Jewelry"
          onPress={() => {
            categoryPressHandler('Jewelry');
          }}
          imageUri={products[6]?.image}
        />
        <CategoryItemLarge
          category="Other"
          onPress={() => {
            categoryPressHandler('Other');
          }}
          imageUri={products[0]?.image}
        />
      </View>
    </ScreenContainer>
  );
};

export default Categories;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    marginLeft: 20,
    marginTop: 25,
    fontSize: 25,
    fontWeight: 500,
  },
  categoriesContainer: {
    flex: 1,
    // display: 'flex',
    flexDirection: 'column',
    // borderColor: 'blue',
    // borderWidth: 2,
    // marginHorizontal: 20,
    // paddingVertical: 10,
  },
});
