import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Button, Input, Loading } from '../../atoms';
import { SignInPage } from '../../../locale/pt/dictionary.json';
import { LoginProps } from './interfaces';

const Login: React.FC<LoginProps> = ({ loading }) => {
  const { FormStrings } = SignInPage;

  return (
    <>
      <h1>{FormStrings.Title}</h1>
      <Input
        name="email"
        leftIcon={FiMail}
        placeholder={FormStrings.EmailPlaceholder}
      />
      <Input
        name="password"
        leftIcon={FiLock}
        type="password"
        placeholder={FormStrings.PasswordPlaceholder}
      />

      <Button type="submit" loading={loading}>
        {FormStrings.ButtonSignIn}
      </Button>
    </>
  );
};

export default Login;
