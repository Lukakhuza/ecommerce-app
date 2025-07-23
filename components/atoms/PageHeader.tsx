import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: any;
};

const PageHeader = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 17,
  },
  title: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    fontSize: 32,
    lineHeight: 34.5,
    letterSpacing: -0.41,
  },
});
