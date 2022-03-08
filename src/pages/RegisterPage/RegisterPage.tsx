//Core
import React, { VFC } from "react";
import styled from "styled-components";
import axios from "axios";
import { URLS } from "../../consts";
import { observer } from "mobx-react-lite";

//Components
import { Layout, Typography, Input, Button, Form, Alert } from "antd";

//Router
import { useNavigate } from "react-router";

//FinalForm
import { Form as FinalForm, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

//Images
import DanceLayout from "../../assets/images/dance.png";
import { useState } from "react";

interface IRegisterValues {
  login: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  repeatPassword: string;
  password: string;
}

const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const LeftSide = styled.div`
  width: 30%;
  background-image: url(${DanceLayout});
`;

const RightSide = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 20rem;
`;

export const RegisterPage: VFC = observer(() => {
  const navigate = useNavigate();

  const { Content } = Layout;
  const { Title } = Typography;

  const [isSucessfulRegistration, setIsSuccessfulRegistration] =
    useState(false);

  const required = (value: string) => (value ? undefined : "Заполните поле");
  //const isPasswordSimilar = (value: string) => value && "Пароли не совпадают";

  const onSubmit = async (values: IRegisterValues) => {
    const { login, name, surname, phone, email, repeatPassword, password } =
      values;
    try {
      const response = await axios.post(URLS.REGISTER, {
        login,
        name,
        surname,
        phone,
        email,
        password,
      });
      console.log(response);
      // if (!response)
      //   return { [FORM_ERROR]: "Неверный пользователь или пароль!" };
      // setIsSuccessfulRegistration(true);
    } catch (e) {
      console.error("Request Error");
    }
  };

  const handleReturnToLogin = () => navigate("/");

  return (
    <Content>
      <Container>
        <LeftSide />
        <RightSide>
          <LoginContainer>
            {isSucessfulRegistration ? (
              <Form.Item>
                <Title>Успешная регистрация!</Title>
                <Button block onClick={handleReturnToLogin}>
                  Вернуться ко входу
                </Button>
              </Form.Item>
            ) : (
              <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, submitError }) => (
                  <form onSubmit={handleSubmit}>
                    <Title>Регистрация</Title>
                    <Form.Item>
                      <Field name="login" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input {...input} placeholder="Логин" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="name" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input {...input} placeholder="Имя" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="surname" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input {...input} placeholder="Фамилия" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="phone" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input {...input} placeholder="Телефон" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="email" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input {...input} placeholder="E-mail" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="password" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input.Password {...input} placeholder="Пароль" />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    <Form.Item>
                      <Field name="repeatPassword" validate={required}>
                        {({ input, meta }) => (
                          <>
                            <Input.Password
                              {...input}
                              placeholder="Повторите пароль"
                            />
                            {meta.error && meta.touched && (
                              <Alert type="error" message={meta.error} />
                            )}
                          </>
                        )}
                      </Field>
                    </Form.Item>
                    {submitError && (
                      <Form.Item>
                        <Alert type="error" message={submitError} />
                      </Form.Item>
                    )}
                    <Button htmlType="submit" block>
                      Зарегистрироваться
                    </Button>
                  </form>
                )}
              />
            )}
          </LoginContainer>
        </RightSide>
      </Container>
    </Content>
  );
});
