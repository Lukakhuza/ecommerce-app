import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { useContext, useState } from "react";
import { ProductsContext } from "../../../store/products-context";
import CartButton from "../../../components/atoms/CartButton";
import { Dropdown } from "react-native-element-dropdown";
import { FavoritesContext } from "../../../store/favorites-context";
import SearchComponent from "../../../components/atoms/SearchComponent";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import { UserInputContext } from "../../../store/user-input-context";
import { Colors } from "../../../constants/colors";
import ProductItem from "../../../components/molecules/ProductItem";
import CategoryItem from "../../../components/molecules/CategoryItem";
import ProductList from "../../../components/organisms/ProductList";
import { isJWTExpired } from "../../../util/helpers";

const data = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
];

type Props = {
  navigation: any;
};

const HomePage = ({ navigation }: Props) => {
  const { products, updateSelectedCategory }: any = useContext(ProductsContext);
  const userInputCtx: any = useContext(UserInputContext);
  const [genderSelection, setGenderSelection] = useState("");

  if (products.length === 0) {
    return <LoadingOverlay message="Loading Home Screen..." />;
  }

  const categoryPressHandler = (category: String) => {
    updateSelectedCategory(category);
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.headerContainer}>
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              const expired = isJWTExpired(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1a2E1MEB0ZXN0LmNvbSIsInVzZXJJZCI6IjY5MzE1MmNjZmM3OWQ1ZTU3ODQzMzQ0NSIsImlhdCI6MTc2NDg0MDE1OCwiZXhwIjoxNzY0ODQzNzU4fQ.fdco-FOhnOrUaeVnXQM3sKMWdAE2t832O-ve_OzB45Q"
              );
              console.log(expired);
              // navigation.navigate("ProfileTab", { screen: "Profile" });
            }}
          >
            <Image
              source={{
                uri: "https://drive.google.com/uc?export=view&id=1LBJjTPXlYb-g8vXO9nIIMr9mcqK5l0xa",
              }}
              style={styles.image}
            />
          </Pressable>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="M / W"
              value={genderSelection}
              onChange={(item) => {
                setGenderSelection(item.value);
                userInputCtx.updateInputs("shopFor", item.value);
              }}
            />
          </View>
          <View style={styles.cartButtonContainer}>
            <CartButton
              onPress={() => {
                navigation.navigate("Cart");
              }}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <SearchComponent />
          </View>
          <ScrollView overScrollMode="never">
            <View style={styles.categoriesContainer}>
              {products.length > 0 && (
                <View style={styles.categories}>
                  <View style={styles.categoriesHeader}>
                    <Text style={styles.categoriesHeaderText}>Categories</Text>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Categories");
                      }}
                    >
                      <Text style={styles.categoriesHeaderSeeAllText}>
                        See All
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.categoriesContent}>
                    <CategoryItem
                      onPress={() => {
                        categoryPressHandler("Jackets");
                      }}
                      imageUri={products[2].image}
                      categoryName="Jackets"
                    />
                    <CategoryItem
                      onPress={() => {
                        categoryPressHandler("Tops");
                      }}
                      imageUri={products[1].image}
                      categoryName="Tops"
                    />
                    <CategoryItem
                      onPress={() => {
                        categoryPressHandler("Tech");
                      }}
                      imageUri={products[8].image}
                      categoryName="Tech"
                    />
                    <CategoryItem
                      onPress={() => {
                        categoryPressHandler("Jewelry");
                      }}
                      imageUri={products[6].image}
                      categoryName="Jewelry"
                    />
                    <CategoryItem
                      onPress={() => {
                        categoryPressHandler("Other");
                      }}
                      imageUri={products[0].image}
                      categoryName="Other"
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={styles.productListsContainer}>
              <ProductList selection="Top Selling" products={products} />
              <ProductList
                selection="New In"
                products={products}
                headerTextStyle={styles.topSellingHeaderTextStyle}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.brown100,
    borderRadius: 25,
  },

  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    borderRadius: 40,
  },
  cartButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  dropdownContainer: {
    width: 150,
  },
  placeholderStyle: {
    fontSize: 16,
    alignItems: "center",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 0,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: Colors.bgLight2,
    borderRadius: 30,
  },
  categories: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  categoriesHeader: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  categoriesHeaderText: { fontSize: 17, fontWeight: 700 },
  categoriesHeaderSeeAllText: { fontSize: 17 },
  categoriesContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    flex: 3,
    marginHorizontal: 20,
  },
  topSellingHeaderTextStyle: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 10,
    color: Colors.purple100,
  },
  productListsContainer: {
    marginVertical: 10,
  },
});
