import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import validator from 'validator';
import ButtonOAuth from '../../components/atoms/ButtonOAuth';
import ContinueButton from '../../components/atoms/ContinueButton';
import DataInput from '../../components/atoms/DataInput';
import PageHeader from '../../components/atoms/PageHeader';
import ScreenContainer from '../../components/atoms/ScreenContainer';
import SmallText from '../../components/atoms/SmallText';

const EnterEmail = ({ navigation }: any) => {
  const [email, setEmail] = useState({ value: '', isValid: true });
  // const navigation: AuthNavigationProp = useNavigation();

  const proceedHandler = () => {
    const emailIsValid = validator.isEmail(email.value);
    if (!emailIsValid) {
      setEmail(curr => ({ ...curr, isValid: false }));
      return;
    }
    navigation.navigate('EnterPassword', { email: email.value });
  };

  return (
    <ScreenContainer>
      <PageHeader>Sign In</PageHeader>
      <DataInput
        placeholder="Email Address"
        onChangeText={(enteredText: string) => {
          setEmail({ value: enteredText, isValid: true });
        }}
        value={email.value}
        isValid={email.isValid}
        invalidInputMessage="Please enter a valid email"
      />
      <ContinueButton onPress={proceedHandler} />
      <SmallText
        primaryText="Don't have an account?"
        secondaryText="Create One"
        onPress={() => {
          navigation.navigate('CreateAccount');
        }}
      />
      <View style={styles.oAuthButtonsContainer}>
        <ButtonOAuth
          onPress={() => {
            console.log('Log in with your Apple account.');
          }}
          imageSource={require('../../../assets/images/logos/OAuth/apple-logo.png')}
        >
          Continue with Apple
        </ButtonOAuth>
        <ButtonOAuth
          onPress={() => {}}
          imageSource={require('../../../assets/images/logos/OAuth/google-logo.png')}
        >
          Continue with Google
        </ButtonOAuth>
        <ButtonOAuth
          onPress={() => {
            console.log('Log in with your Facebook account.');
          }}
          imageSource={require('../../../assets/images/logos/OAuth/facebook-logo.png')}
        >
          Continue with Facebook
        </ButtonOAuth>
      </View>
    </ScreenContainer>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  oAuthButtonsContainer: {
    marginTop: 75,
  },
});
