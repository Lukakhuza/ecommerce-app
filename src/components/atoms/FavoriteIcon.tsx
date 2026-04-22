import { Pressable, StyleSheet, TextStyle } from 'react-native';
import Icon, { IoniconsIconName } from '@react-native-vector-icons/ionicons';

type Props = {
  name: IoniconsIconName;
  color?: string;
  onPress?: () => void;
  size?: number;
  style?: TextStyle;
};

const FavoriteIcon = ({ name, color, onPress, size, style }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Icon name={name} color={color} size={size} style={style} />
    </Pressable>
  );
};

export default FavoriteIcon;

const styles = StyleSheet.create({});
