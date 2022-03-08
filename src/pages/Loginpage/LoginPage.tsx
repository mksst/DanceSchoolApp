//Core
import React, { VFC } from "react";
import { URLS } from "../../consts";
import styled from "styled-components";
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

//Hooks & Stores
import { useMainStore } from "../../hooks/useMainStore";
import { userConfig } from "../../users";
import axios from "axios";

interface ILoginValues {
  login: string;
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

export const LoginPage: VFC = observer(() => {
  const { setUserConfig, setToken } = useMainStore();
  const navigate = useNavigate();

  const { Content } = Layout;
  const { Title } = Typography;

  const required = (value: string) => (value ? undefined : "Заполните поле");

  const handleRedirectToRegiter = () => {
    navigate("/register");
  };

  const onSubmit = async (values: ILoginValues) => {
    const { login, password } = values;
    if (!login || !password)
      return { [FORM_ERROR]: "Неверный пользователь или пароль!" };
    try {
      const response = await axios.post(URLS.LOGIN, {
        login,
        password,
      });
      console.log(response);
      //setUserConfig(response);
      //setToken(response.token);
    } catch (e) {
      console.error(e);
    }
    //navigate("/main")
  };

  return (
    <Content>
      <Container>
        <LeftSide />
        <RightSide>
          <LoginContainer>
            <FinalForm
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, submitError }) => (
                <form onSubmit={handleSubmit}>
                  <Title>Вход</Title>
                  <Form.Item>
                    <Field name="login" validate={required}>
                      {({ input, meta }) => (
                        <>
                          <Input {...input} />
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
                          <Input.Password {...input} />
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
                  <Button htmlType="submit" block loading={submitting}>
                    Войти
                  </Button>
                  <Button
                    type="text"
                    block
                    loading={submitting}
                    onClick={handleRedirectToRegiter}
                  >
                    Регистрация
                  </Button>
                </form>
              )}
            />
          </LoginContainer>
        </RightSide>
      </Container>
    </Content>
  );
});
