import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: " < 20 ", value: " < 20 " },
  { label: "21 to 26", value: "21 to 26" },
  { label: "27 to 35", value: "27 to 35" },
  { label: "36 to 45", value: "36 to 45" },
  { label: "46 to 60", value: "46 to 60" },
  { label: " > 60 ", value: " > 60 " },
];

const DropdownComponent = ({ value, onChange, style }: any) => {
  //   const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={[style, styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      //   search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Age Range"
      //   searchPlaceholder="Search..."
      value={value}
      onChange={onChange}
      //   renderLeftIcon={() => (
      //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      //   )}
    />
  );
};

export default DropdownComponent;

const styles: any = StyleSheet.create({
  //   dropdown: {
  //     margin: 16,
  //     height: 50,
  //     borderBottomColor: "gray",
  //     borderBottomWidth: 0.5,
  //   },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
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
});
