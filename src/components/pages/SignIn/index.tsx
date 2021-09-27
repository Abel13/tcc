import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/Auth";
import { useToast } from "../../../hooks/Toast";
import { errorValidation, formatError } from "../../../utils/errorValidation";

import {} from "../../../components/atoms";
import { Content, AnimationContainer, Container } from "./styles";
import { SignInPage } from "../../../locale/pt/dictionary.json";
import { SignInFormData } from "./interfaces";
import { Login } from "../../organisms";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { ErrorsStrings, FormStrings, SuccessStrings } = SignInPage;

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required(ErrorsStrings.EmailRequired)
          .email(ErrorsStrings.InvalidEmail),
        password: Yup.string().required(ErrorsStrings.PasswordRequired),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      addToast({
        type: "success",
        title: SuccessStrings.ToastTitle,
        description: SuccessStrings.ToastMessage,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);

        formRef.current?.setErrors(errors);
        setLoading(false);
        return;
      }

      const errors = formatError(err);

      addToast({
        type: 'error',
        title: ErrorsStrings.ToastTitle,
        description: errors[0].message,
      });
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            initialData={{ name: "" }}
            onSubmit={handleSubmit}
          >
            <Login loading={loading} />
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
