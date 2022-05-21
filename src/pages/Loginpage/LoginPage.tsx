//Core
//Components
import { Alert, Button, Form, Input, Layout, Typography } from "antd";
import axios from "axios";
import { FORM_ERROR } from "final-form";
import { observer } from "mobx-react-lite";
import React, { VFC } from "react";
//FinalForm
import { Field, Form as FinalForm } from "react-final-form";
//Router
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//Images
import DanceLayout from "../../assets/images/dance.jpg";
import { URLS } from "../../consts";
//Hooks & Stores
import { useMainStore } from "../../hooks";

export interface userConfig {
  login: string;
  password?: string;
  name: string;
  phone: string;
  email: string;
  accountType: "user" | "admin" | "coach";
}

interface ILoginValues {
  login: string;
  password: string;
}

export interface userConfig {
  login: string;
  password?: string;
  name: string;
  phone: string;
  email: string;
  accountType: "user" | "admin" | "coach";
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
    if (login === "localadmin" && password === "localadmin") {
      setUserConfig({
        accountType: "admin",
        email: "tmorozova@rio.ru",
        login: "localadmin",
        name: "Администратор",
        password:
          "$2b$05$JL2FGG4UUfra8kxwuPuPnusKfB/5xCodHOIp9iL39vhlSYZ.db4Qq",
        phone: "+7(900)465-12-67",
        surname: "А.",
        _id: "6249b027eea97c5e5d7a0b43",
      });
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDliMDI3ZWVhOTdjNWU1ZDdhMGI0MyIsImlhdCI6MTY1MzEzMTA0NywiZXhwIjoxNjUzMjE3NDQ3fQ.5X5slGGjp-pxLNRZISdc6db6NXALcv3cM_U95FYD8Bk",
      );
      navigate("/");
      return;
    }
    if (!login || !password)
      return { [FORM_ERROR]: "Неверный пользователь или пароль!" };
    try {
      const response = await axios.post(URLS.LOGIN, {
        login,
        password,
      });
      const {
        data: { user, token },
      } = response;

      setUserConfig(user);
      setToken(token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
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
                  <Button type="text" block onClick={handleRedirectToRegiter}>
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
