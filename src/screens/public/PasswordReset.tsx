import { Image, StyleSheet, Text, View } from 'react-native';
import PurpleButtonSmall from '../../components/atoms/PurpleButtonSmall';
import ScreenContainer from '../../components/atoms/ScreenContainer';

const PasswordReset = ({ navigation }: any) => {
  return (
    <ScreenContainer style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingBottom: '33%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Image
            style={styles.image}
            source={require('../../../assets/images/logos/password-reset.png')}
          />
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.text}>
            We sent you an email to reset your password.
          </Text>
        </View>
        <View>
          <PurpleButtonSmall
            onPress={() => {
              navigation.replace('EnterEmail');
            }}
          >
            Return to Login
          </PurpleButtonSmall>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    marginHorizontal: 10,
    marginVertical: 30,
    textAlign: 'center',
  },
});
