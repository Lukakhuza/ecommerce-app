import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import ContinueButton from '../../components/atoms/ContinueButton';
import DataInput from '../../components/atoms/DataInput';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import PageHeader from '../../components/atoms/PageHeader';
import ScreenContainer from '../../components/atoms/ScreenContainer';
import SmallText from '../../components/atoms/SmallText';
import { AuthContext } from '../../store/auth-context';
import { isValidPassword } from '../../utils/validation';

const EnterPassword = ({ navigation, route }: any) => {
  const email = route.params.email;
  const [password, setPassword] = useState({ value: '', isValid: true });
  const { isLoading, loginHandler } = useContext(AuthContext);

  const proceedHandler = () => {
    if (!isValidPassword(password.value)) {
      setPassword(curr => ({ ...curr, isValid: false }));
      return;
    }

    loginHandler(email, password.value);
  };

  if (isLoading) {
    return <LoadingOverlay message="Signing In" />;
  }
  return (
    <ScreenContainer>
      <PageHeader>Sign In</PageHeader>
      <DataInput
        placeholder="Password"
        onChangeText={(enteredText: string) => {
          setPassword({ value: enteredText, isValid: true });
        }}
        value={password.value}
        isValid={password.isValid}
        invalidInputMessage="Make sure the password is at least 8 characters long, is alphanumeric and contains special character(s)."
        secureTextEntry={true}
        onSubmitEditing={proceedHandler}
        autoFocus
      />
      <ContinueButton onPress={proceedHandler} />
      <SmallText
        primaryText="Forgot Password?"
        secondaryText="Reset"
        onPress={() => {
          navigation.navigate('EnterEmail');
        }}
      />
    </ScreenContainer>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
