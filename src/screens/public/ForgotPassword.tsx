import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ContinueButton from '../../components/atoms/ContinueButton';
import DataInput from '../../components/atoms/DataInput';
import PageHeader from '../../components/atoms/PageHeader';
import ScreenContainer from '../../components/atoms/ScreenContainer';
import { AuthStackParamList } from '../../types/navigation';
import { isValidEmail } from '../../utils/validation';

const ForgotPassword = ({ navigation }: any) => {
  const [enteredEmail, setEnteredEmail] = useState({
    value: '',
    isValid: true,
  });
  const proceedHandler = () => {
    if (!isValidEmail(enteredEmail.value)) {
      setEnteredEmail({
        value: enteredEmail.value,
        isValid: false,
      });
      return;
    }
    // A password reset email generation function needs to be added here.
    navigation.replace('PasswordReset');
  };

  return (
    <ScreenContainer>
      <PageHeader>Forgot Password?</PageHeader>
      <DataInput
        placeholder="Enter Email Address"
        onChangeText={(enteredText: string) => {
          setEnteredEmail({
            value: enteredText,
            isValid: true,
          });
        }}
        // value={enteredEmail}
        isValid={enteredEmail.isValid}
      />
      <ContinueButton onPress={proceedHandler} />
    </ScreenContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
