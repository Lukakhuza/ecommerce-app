import { View, TextInput, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  style?: TextStyle;
  onChangeText?: (text: string) => void;
  value?: string;
};

const SearchComponent = ({ style, onChangeText, value }: Props) => {
  return (
    <View style={[styles.searchBarContainer, style]}>
      <Icon name="search-outline" size={25} style={styles.searchIcon} />
      <TextInput
        autoCorrect={false}
        placeholder="Search"
        placeholderTextColor={Colors.gray100}
        style={styles.searchBar}
        clearButtonMode="while-editing"
        onChangeText={onChangeText}
        value={value}
      ></TextInput>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: Colors.bgLight2,
    flex: 1,
    height: 50,
    paddingLeft: 40,
    borderRadius: 30,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
