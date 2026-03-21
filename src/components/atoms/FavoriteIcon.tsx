import { Pressable, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  name?: any;
  color?: any;
  onPress?: any;
  size?: any;
  style?: any;
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
